document.addEventListener("DOMContentLoaded", function () {
  function carregarEstoque() {
    const estoque = JSON.parse(localStorage.getItem("estoque")) || [];
    const tableBody = document.getElementById("estoqueTableBody");

    tableBody.innerHTML = "";

    estoque.forEach(function (venda) {
      const { dataVenda, itensVendidos, descricao, vendedor, formaPagamento } =
        venda;

      const row = document.createElement("tr");
      row.classList.add("table-row");

      row.innerHTML = `
          <td class="table-data">${dataVenda}</td>
          <td class="table-data">
            <div class="item-image">
              ${itensVendidos
                .map(
                  (item) =>
                    `<img src="${item.imagem}" alt="${item.descricao}" title="${item.descricao}">`
                )
                .join("")}
            </div>
          </td>
          <td class="table-data">${descricao}</td>
          <td class="table-data">${vendedor}</td>
          <td class="table-data">${formaPagamento}</td>
        `;

      tableBody.appendChild(row);
    });
  }

  carregarEstoque();
});
