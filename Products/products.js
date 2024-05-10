function createTableBody() {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const productsHTML = document.getElementById("products");

  productsHTML.innerHTML = ""; // Limpar o conteúdo antes de adicionar os produtos

  produtos.forEach(function (produto, index) {
    productsHTML.innerHTML += `
        <div class="product-item">
            <div class="img-container">
                <img class="item-image" src="${produto.imagem}" alt="Imagem do produto"/>
            </div>
            <div class="text-container">
                <div class="add-cart">
                    <p>Valor: ${produto.precoVenda}</p>
                    <button onclick="addToCart(${index})" type="button">+ Carrinho</button>
                </div>
                <div class="description-container">${produto.descricao}</div>
            </div>
        </div>
      `;
  });
}

createTableBody();

function addToCart(index) {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (index >= 0 && index < produtos.length) {
    const produto = produtos[index];
    cart.push(produto);
    produtos.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  } else {
    console.error("Índice inválido:", index);
  }
}
