document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('calculate-btn');

    if (btn) {
        btn.addEventListener('click', calculateIMC);
    }
});

function calculateIMC() {
    const weightInput = document.getElementById("weight");
    const heightInput = document.getElementById("height");
    const resultDiv = document.getElementById("result");

    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        resultDiv.innerHTML = "Por favor, insira valores válidos.";
        resultDiv.style.color = "red";
        return;
    }

    const imc = weight / (height * height);
    let classification = "";

    if (imc < 18.5) {
        classification = "Abaixo do peso";
    } else if (imc <= 24.9) {
        classification = "Peso normal";
    } else if (imc <= 29.9) {
        classification = "Sobrepeso";
    } else if (imc <= 34.9) {
        classification = "Obesidade grau 1";
    } else if (imc <= 39.9) {
        classification = "Obesidade grau 2";
    } else {
        classification = "Obesidade grau 3";
    }

    resultDiv.innerHTML = `Seu IMC é ${imc.toFixed(2)} - ${classification}`;
    resultDiv.style.color = "var(--text-color)";
}
