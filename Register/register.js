function handleFormSubmit(event) {
  event.preventDefault();

  const descricao = document.getElementById("descricao").value;
  const imagemInput = document.getElementById("imagem");
  const precoVenda = parseFloat(document.getElementById("preco_venda").value);
  const precoCusto = parseFloat(document.getElementById("preco_custo").value);
  const fabricante = document.getElementById("fabricante").value;
  const categoria = document.getElementById("categoria").value;

  const reader = new FileReader();
  reader.onload = function (event) {
    const imagemBase64 = event.target.result;

    const produto = {
      descricao: descricao,
      imagem: imagemBase64,
      precoVenda: precoVenda,
      precoCusto: precoCusto,
      fabricante: fabricante,
      categoria: categoria,
    };

    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    produtos.push(produto);

    localStorage.setItem("produtos", JSON.stringify(produtos));

    alert("Produto cadastrado com sucesso!");

    document.getElementById("cadastroForm").reset();
  };

  reader.readAsDataURL(imagemInput.files[0]);
}

document
  .getElementById("cadastroForm")
  .addEventListener("submit", handleFormSubmit);
