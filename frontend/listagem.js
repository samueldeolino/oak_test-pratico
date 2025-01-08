document.addEventListener('DOMContentLoaded', function () {
    // Buscar produtos do backend
    fetch('http://localhost:3000/produtos')
      .then(response => response.json())
      .then(data => {
        const tbody = document.querySelector('tbody');
        data.forEach(produto => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${produto.nome}</td>
            <td>${'R$ '+produto.valor}</td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  });


const redirectRegister = document.querySelector('.button-container');
console.log(redirectRegister);

redirectRegister.addEventListener('click', () => {
  window.location.href = 'cadastro.html';
});

