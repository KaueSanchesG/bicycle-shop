function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (index >= 0 && index < cart.length) {
    alert("Produto " + cart[index].descricao + " removido do carrinho!");
    console.log(cart);
    cart.splice(index, 1)[0];

    localStorage.setItem("cart", JSON.stringify(cart));
    createCartTable();
  } else {
    console.error("Índice inválido:", index);
  }
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

function createCartTable() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const tableBody = document.getElementById("cartTableBody");

  tableBody.innerHTML = "";

  cartItems.forEach(function (item, index) {
    tableBody.innerHTML += `
      <tr class="table-row">
        <td class="table-data">
          <div class="center-row">
            <img class="img-item" src="${
              item.imagem
            }" alt="Imagem do produto" />
          </div>
        </td>
        <td class="table-data">${item.descricao}</td>
        <td class="table-data">${item.precoVenda}</td>
        <td class="table-data">
          <div class="center-row">
            <button class="remove-btn" onclick="removeFromCart(${index})" type="button" ${
      item.categoria === "servico" ? "disabled" : ""
    }>- Remover</button>
          </div>
        </td>
      </tr>
    `;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  function openPopup() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItems.length === 0) {
      alert("Não há itens no carrinho. Adicione itens antes de comprar.");
      return;
    }
    const popup = document.getElementById("popup");
    popup.style.display = "block";
  }

  function finalizarCompra() {
    event.preventDefault();

    const vendedor = document.getElementById("vendedor").value.trim();
    const formaPagamento = document
      .getElementById("forma-pagamento")
      .value.trim();

    if (!vendedor || !formaPagamento) {
      alert("Por favor, preencha os campos antes de finalizar a compra.");
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItems.length === 0) {
      alert("Não há itens no carrinho. Adicione itens antes de comprar.");
      return;
    }

    const controleEstoque = {
      dataVenda: new Date().toLocaleDateString(),
      itensVendidos: cartItems,
      descricao: document.getElementById("descricao").value.trim(),
      vendedor: vendedor,
      formaPagamento: formaPagamento,
    };

    const estoque = JSON.parse(localStorage.getItem("estoque")) || [];
    estoque.push(controleEstoque);
    localStorage.setItem("estoque", JSON.stringify(estoque));

    localStorage.removeItem("cart");

    closePopup();

    alert("Compra finalizada com sucesso!");

    document.getElementById("vendedor").value = "";
    document.getElementById("forma-pagamento").value = "";
    document.getElementById("descricao").value = "";

    createCartTable();
  }

  const comprarBtn = document.querySelector(".pay-btn");
  comprarBtn.addEventListener("click", openPopup);

  const finalizarBtn = document.getElementById("finalizar-btn");
  finalizarBtn.addEventListener("click", finalizarCompra);

  const finalizarForm = document.getElementById("finalizar-form");
  finalizarForm.addEventListener("submit", finalizarCompra);

  createCartTable();
});
