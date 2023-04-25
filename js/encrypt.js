const btn_encrypt = document.getElementById("btn-encrypt");
const btn_decrypt = document.getElementById("btn-decrypt");
const result_panel = document.querySelector(".right-result");

const vowels = Object.freeze({
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
});

const keys = Object.freeze({
    "enter": "e",
    "imes": "i",
    "ai": "a",
    "ober": "o",
    "ufat": "u"
});

showMessage();
btn_encrypt.addEventListener("click", encrypt);
btn_decrypt.addEventListener("click", decrypt);

function encrypt() {
    const raw_text = document.getElementById("input-text").value;

    if (raw_text.includes(" ")) {
        // Creating an array of the words we want to encrypt
        const words = raw_text.split(" ");

        // Always it's (element, index) for the forEach loop
        words.forEach((word, index) => {
            Object.keys(vowels).forEach(vowel => {
                if (word.includes(vowel)) {
                    // After we checked that the word includes a vowel
                    // We replace that vowel and assign it to the word variable as the new word
                    word = word.replaceAll(vowel, vowels[vowel]);
                    // Then we just need to replace the word in the array using the method splice()
                    words.splice(index, 1, word);
                }
            });
        });
        showMessage(words.join(" "), true);
    } else {
        // In case we have just one word to encrypt
        let text_to_encrypt = raw_text;

        Object.keys(vowels).forEach(vowel => {
            if (text_to_encrypt.includes(vowel)) {
                text_to_encrypt = text_to_encrypt.replace(vowel, vowels[vowel]);
            }
        });
        showMessage(text_to_encrypt, true);
    }
}

function decrypt() {
    const raw_text = document.getElementById("input-text").value;

    if (raw_text.includes(" ")) {
        let words = raw_text.split(" ");

        words.forEach((word, index) => {
            Object.keys(keys).forEach(key => {
                if (word.includes(key)) {
                    word = word.replaceAll(key, keys[key])
                    words.splice(index, 1, word);
                }
            });
        });
        showMessage(words.join(" "));
    } else {
        // In case we have just one word to decrypt
        let text_to_decrypt = raw_text;

        Object.keys(keys).forEach(key => {
            if (text_to_decrypt.includes(key)) {
                text_to_decrypt = text_to_decrypt.replace(key, keys[key]);
            }
        });
        showMessage(text_to_decrypt);
    }
}

function showMessage(message = "", enc = false) {
    let html_result_panel;
    let title = enc === true ? "Mensaje Encriptado" : "Mensaje Desencriptado"
    if (message) {
        html_result_panel = `
            <section>
                <p class="res-mess-title">${title}</p>
                <p class="res-mess-details">${message}</p>
            </section>
            <button id="btn-copy-res" onclick="copyMessage();">Copiar</button>
        `;
    }
    if (!message) {
        html_result_panel = `
            <section>
                <img src="img/imagefortext.svg" alt="result image" class="img-result">
                <p class="res-mess-title">Ningún mensaje fue encontrado</p>
                <p class="res-mess-details">Ingresa el texto que desees encriptar o desencriptar.</p>
            </section>
        `;
    }
    result_panel.innerHTML = html_result_panel;
}

function copyMessage() {
    const text = document.querySelector(".res-mess-details").innerHTML;

    navigator.clipboard.writeText(text);
}