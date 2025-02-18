document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generateButton');
    const resultElement = document.getElementById('result');
    const lengthInput = document.getElementById('length');
    const togglePasswordButton = document.getElementById('togglePassword');
    const copyPasswordButton = document.getElementById('copyPassword');

    let hiddenPassword = ''; 
    let isPasswordVisible = false;

    function generatePassword() {
        const length = parseInt(lengthInput.value, 10);
        if (isNaN(length) || length < 12) {
            resultElement.textContent = "Długość musi być większa niż 11!";
            return;
        }

        fetch(`http://127.0.0.1:5000/generate?dlugosc=${length}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Serwer odpowiedział:", data);
                if (data.haslo) {
                    hiddenPassword = data.haslo;
                    resultElement.textContent = '********';
                    togglePasswordButton.style.display = 'inline-block';
                    copyPasswordButton.style.display = 'inline-block';
                } else {
                    resultElement.textContent = `Błąd: ${data.error}`;
                }
            })
            .catch(error => {
                console.error('Błąd przy generowaniu hasła:', error);
                resultElement.textContent = 'Błąd przy generowaniu hasła.';
            });
            resultElement.style.display = 'block';
             resultElement.style.visibility = 'visible';

    }

    function togglePassword() {
        if (!hiddenPassword) return;  // Zapobiega błędom jeśli hasło nie istnieje

        if (isPasswordVisible) {
            resultElement.textContent = '********';
            togglePasswordButton.textContent = 'Odkryj hasło';
        } else {
            resultElement.textContent = hiddenPassword;
            togglePasswordButton.textContent = 'Ukryj hasło';
        }
        isPasswordVisible = !isPasswordVisible;
    }

    function copyPassword() {
        if (!hiddenPassword) return;

        navigator.clipboard.writeText(hiddenPassword).then(() => {
            alert("Hasło zostało skopiowane!");
        }).catch(err => {
            console.error('Błąd przy kopiowaniu:', err);
        });
    }

    // Ukrywamy przyciski na starcie
    togglePasswordButton.style.display = 'none';
    copyPasswordButton.style.display = 'none';

    generateButton.addEventListener('click', generatePassword);
    togglePasswordButton.addEventListener('click', togglePassword);
    copyPasswordButton.addEventListener('click', copyPassword);
});
