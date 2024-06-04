document.getElementById("botaoPrincipal").addEventListener("click", function() {
  let lista = document.getElementById("listaBotoes");

  if (window.getComputedStyle(lista).display === "none") {
    lista.style.display = "block";
  } else {
    lista.style.display = "none";
  }
});
