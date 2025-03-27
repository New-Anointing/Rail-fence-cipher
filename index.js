//UI Components and actions

//get the encrypt and decrypt button
let encryptButton = document.getElementById("encryptButton");
let decryptButton = document.getElementById("decryptButton");

encryptButton.addEventListener("click", (e)=>{
    e.preventDefault();

    //get the text and the key value from the user

    let text = document.getElementById("Text").value;
    let key = document.getElementById("ShiftCode").value;
    let result = encryptRailFence(text, parseInt(key));
     //get the result p tag
    let resultText = document.getElementById("secreteResult");
    resultText.innerHTML = `${result}.`;
});

decryptButton.addEventListener("click", (e)=>{
    e.preventDefault();

    //get the text and the shift value from the user

    let text = document.getElementById("secretText").value;
    let key = document.getElementById("secretShiftCode").value;
    let result = decryptRailFence(text, parseInt(key));
    console.log(result);
    //get the result p tag
    let resultText = document.getElementById("result");
    resultText.innerHTML = result;

});
























// function to encrypt a message
function encryptRailFence(text, key) {
    // create the matrix to cipher plain text
    // key = rows , text.length = columns
    let rail = new Array(key).fill().map(() => new Array(text.length).fill('\n'));
    
    // filling the rail matrix to distinguish filled
    // spaces from blank ones
    let dir_down = false;
    let row = 0, col = 0;
    
    for (let i = 0; i < text.length; i++) {
        // check the direction of flow
        // reverse the direction if we've just
        // filled the top or bottom rail
        if (row == 0 || row == key - 1) dir_down = !dir_down;
    
        // fill the corresponding alphabet
        rail[row][col++] = text[i];
    
        // find the next row using direction flag
        dir_down ? row++ : row--;
    }
    
    // now we can construct the cipher using the rail matrix
    let result = '';
    for (let i = 0; i < key; i++)
        for (let j = 0; j < text.length; j++)
        if (rail[i][j] != '\n') result += rail[i][j];
    
    return result;
    }
    
    // function to decrypt a message
    function decryptRailFence(cipher, key) {
    // create the matrix to cipher plain text
    // key = rows , text.length = columns
    let rail = new Array(key).fill().map(() => new Array(cipher.length).fill('\n'));
    
    // filling the rail matrix to mark the places with '*'
    let dir_down = false;
    let row = 0, col = 0;
    
    for (let i = 0; i < cipher.length; i++) {
        // check the direction of flow
        if (row == 0) dir_down = true;
        if (row == key - 1) dir_down = false;
    
        // place the marker
        rail[row][col++] = '*';
    
        // find the next row using direction flag
        dir_down ? row++ : row--;
    }
    
    // now we can construct the rail matrix by filling the marked places with cipher text
    let index = 0;
    for (let i = 0; i < key; i++)
        for (let j = 0; j < cipher.length; j++)
        if (rail[i][j] == '*' && index < cipher.length) rail[i][j] = cipher[index++];
    
    // now read the matrix in zig-zag manner to construct the resultant text
    let result = '';
    row = 0, col = 0;
    for (let i = 0; i < cipher.length; i++) {
        // check the direction of flow
        if (row == 0) dir_down = true;
        if (row == key - 1) dir_down = false;
    
        // place the marker
        if (rail[row][col] != '*') result += rail[row][col++];
    
        // find the next row using direction flag
        dir_down ? row++ : row--;
    }
    
    return result;
    }
    
    // // driver program to check the above functions
    
    // // Encryption
    console.log(encryptRailFence('i am a boy', 3)); 
    // console.log(encryptRailFence('GeeksforGeeks', 3)); 
    // console.log(encryptRailFence('defend the east wall', 3));
    // // Now decryption of the same cipher-text
    console.log(decryptRailFence('i o mabya ', 3));
    // console.log(decryptRailFence('atc toctaka ne', 2));
    // console.log(decryptRailFence('dnhaweedtees alf  tl', 3));
    