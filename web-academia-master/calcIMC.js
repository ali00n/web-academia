function calculateIMC() {
  let weight = parseFloat(document.getElementById('weight').value);
  let height = parseFloat(document.getElementById('height').value);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    document.getElementById('result').innerHTML = "Por favor, insira valores válidos.";
    return;
  }

  let imc = weight / (height * height);

  let message;

  if (imc < 18.5) {
    message = "Abaixo do peso";
  } else if (imc <+ 25) {
    message = "Peso normal";
  } else if (imc <+ 30) {
    message = "Sobrepeso";
  } else if (imc <= 34.9) {
    message = "Obesidade grau 1";
  } else if (imc <= 39.9) {
    message = "Obesidade grau 2";
  } else {
    message = "Obesidade grau 3";
  }




  document.getElementById('result').innerHTML = "Seu IMC é " + imc.toFixed(2) + " - " + message;
}
