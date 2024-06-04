// Adiciona um ouvinte de eventos ao botão principal
document.getElementById("botaoPrincipal").addEventListener("click", function () {
  // Obtém a referência à lista de botões
  var lista = document.getElementById("listaBotoes");

  // Verifica o estado de exibição da lista de botões
  if (lista.style.display === "none") {
    // Se a lista estiver oculta, mostra-a
    lista.style.display = "block";
  } else {
    // Se a lista estiver visível, oculta-a
    lista.style.display = "none";
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const scrollToTopBtn = document.querySelector('.scroll-to-top');

  window.addEventListener('scroll', function() {
      if (pageYOffset > 300) {
          scrollToTopBtn.style.display = 'block';
      } else {
          scrollToTopBtn.style.display = 'none';
      }
  });

  scrollToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});

document.addEventListener("DOMContentLoaded", function(){
  const textElement = document.getElementById("Academia-text");
  const textContent = textElement.textContent;

   textElement.style.width = textElement.scrollWidth + "px";
   textElement.style.opacity = 1;
})