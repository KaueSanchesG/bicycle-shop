function createTableBody() {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const productsHTML = document.getElementById("products");

  //   productsHTML.innerHTML = "";

  produtos.forEach(function (produto) {
    productsHTML.innerHTML += `
        <div class="product-item">
            <div class="img-container">
                <img class="item-image" src="${produto.imagem}" alt="Imagem do produto"/>
            </div>
            <div class="text-container">
                <div class="add-cart">
                    <p>Valor: ${produto.precoVenda}</p>
                    <button type="button">+ Carrinho</button>
                </div>
                <div class="description-container">${produto.descricao}</div>
            </div>
        </div>
      `;
  });
}

createTableBody();

function addToCart(descr) {
  console.log("Produto adicionado ao carrinho:", desc);
}
