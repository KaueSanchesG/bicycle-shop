function createCartTable() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const tableBody = document.getElementById("cartTableBody");

  tableBody.innerHTML = "";

  cartItems.forEach(function (item, index) {
    tableBody.innerHTML += `
        <tr class="table-row">
            <td class="table-data">
                <div class="center-row">
                    <img class="img-item"
                    src="${item.imagem}"
                    alt="Imagem do produto"
                    />
                </div>
            </td>
            <td class="table-data">${item.descricao}</td>
            <td class="table-data">${item.precoVenda}</td>
            <td class="table-data">
                <div class="center-row">
                    <button class="remove-btn" onclick="removeFromCart(${index})" type="button">- Remover</button>
                </div>
            </td>
        </tr>
      `;
  });
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  if (index >= 0 && index < cart.length) {
    const removedItem = cart.splice(index, 1)[0];
    produtos.push(removedItem);

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("produtos", JSON.stringify(produtos));

    createCartTable();
  } else {
    console.error("Índice inválido:", index);
  }
}

createCartTable();
