function handleFormSubmit(event) {
  event.preventDefault();

  const descricao = document.getElementById("descricao").value;
  const imagemInput = document.getElementById("imagem");
  const precoVenda = parseFloat(document.getElementById("preco_venda").value);
  const precoCusto = parseFloat(document.getElementById("preco_custo").value);
  const fabricante = document.getElementById("fabricante").value;
  const categoria = document.getElementById("categoria").value;

  // Converte a imagem para base64
  const reader = new FileReader();
  reader.onload = function (event) {
    const imagemBase64 = event.target.result;

    // Cria o objeto do produto com a imagem em base64
    const produto = {
      descricao: descricao,
      imagem: imagemBase64,
      precoVenda: precoVenda,
      precoCusto: precoCusto,
      fabricante: fabricante,
      categoria: categoria,
    };

    // Recupera os produtos já existentes do localStorage
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    // Adiciona o novo produto ao array de produtos
    produtos.push(produto);

    // Atualiza o localStorage com os novos produtos
    localStorage.setItem("produtos", JSON.stringify(produtos));

    // Exibe uma mensagem de confirmação ao usuário
    alert("Produto cadastrado com sucesso!");

    // Limpa o formulário
    document.getElementById("cadastroForm").reset();
  };

  // Lê a imagem como base64
  reader.readAsDataURL(imagemInput.files[0]);
}

// Adiciona um listener para o evento 'submit' do formulário
document
  .getElementById("cadastroForm")
  .addEventListener("submit", handleFormSubmit);
