document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generateButton');
    const resultElement = document.getElementById('result');
    const lengthInput = document.getElementById('length');
    const togglePasswordButton = document.getElementById('togglePassword');
    const copyPasswordButton = document.getElementById('copyPassword');

    let hiddenPassword = ''; 
    let isPasswordVisible = false;

    function generatePassword() {
        const length = lengthInput.value;
        if (length < 1) {
            resultElement.textContent = "Długość musi być > 0";
            return;
        }

        fetch(`http://127.0.0.1:5000/generate?dlugosc=${length}`)
            .then(response => response.json())
            .then(data => {
                if (data.haslo) {
                    hiddenPassword = data.haslo;
                    resultElement.textContent = '********'; 
                    resultElement.style.display = 'block';
                    togglePasswordButton.style.display = 'inline-block';
                    copyPasswordButton.style.display = 'inline-block';
                } else {
                    resultElement.textContent = `Błąd: ${data.error}`;
                }
            })
            .catch(error => {
                resultElement.textContent = 'Błąd przy generowaniu hasła.';
                console.error('Error:', error);
            });
    }

    function togglePassword() {
        
        if (isPasswordVisible) {
            resultElement.textContent = '********';
            togglePasswordButton.textContent = 'Odkryj  0.0';
        } else {
            resultElement.textContent = hiddenPassword;
            togglePasswordButton.textContent = 'Ukryj  ^.^';
        }
        isPasswordVisible = !isPasswordVisible;
    }

    function copyPassword() {
        navigator.clipboard.writeText(hiddenPassword).then(() => {
            alert("Hasło skopiowane <3");
        }).catch(err => {
            console.error('Błąd przy kopiowaniu:', err);
        });
    }

    togglePasswordButton.style.display = 'none';
    copyPasswordButton.style.display = 'none';

    generateButton.addEventListener('click', generatePassword);
    togglePasswordButton.addEventListener('click', togglePassword);
    copyPasswordButton.addEventListener('click', copyPassword);
});
