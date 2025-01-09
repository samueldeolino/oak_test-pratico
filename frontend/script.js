document.querySelector('.register-button').addEventListener('click', async (event) => {

  const validarCampos = () => {
    const nome = document.getElementById('name-product').value;
    const descricao = document.getElementById('description-product').value;
    const valor = parseFloat(document.getElementById('value-product').value);
    const disponibilidade = document.getElementById('product-disponibility').value;
    if (nome && descricao && valor && disponibilidade)
      return true;
    return false;
  }

  const camposValidados = validarCampos();

  if (camposValidados === false) {
    return;
  };

  window.location.href = 'listagem.html'; 

    event.preventDefault(); 

    const nome = document.getElementById('name-product').value;
    const descricao = document.getElementById('description-product').value;
    const valor = parseFloat(document.getElementById('value-product').value);
    const disponibilidade = document.getElementById('product-disponibility').value;
    
    const produto = {
        nome,
        descricao,
        valor,
        disponibilidade: disponibilidade === "sim" ? 1 : 0,
    };

    try {
        const response = await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        });

        if (response.ok) {            
            document.getElementById('name-product').value = '';
            document.getElementById('description-product').value = '';
            document.getElementById('value-product').value = '';
            document.getElementById('product-disponibility').value = 'sim';
        } else {
            alert('Erro ao cadastrar o produto. Verifique os dados e tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        alert('Erro ao conectar com o servidor.');
    }
});
