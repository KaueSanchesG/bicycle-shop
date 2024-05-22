function createTableBody() {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const productsHTML = document.getElementById("products");

  productsHTML.innerHTML = "";

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
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produto " + produto.descricao + " adicionado ao carrinho!");
  } else {
    console.error("Índice inválido:", index);
  }
}
