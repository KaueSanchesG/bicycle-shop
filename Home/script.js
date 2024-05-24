document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popup");
  const newService = document.getElementById("new-service");
  const closeBtn = document.querySelector(".close-btn");
  const saveServiceBtn = document.getElementById("save-service-btn");
  const productList = document.getElementById("products");
  const feedbackMessage = document.createElement("div");
  feedbackMessage.id = "feedback-message";
  document.body.appendChild(feedbackMessage);

  newService.addEventListener("click", function () {
    popup.style.display = "block";
    fillProductList();
  });

  closeBtn.addEventListener("click", function () {
    popup.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });

  saveServiceBtn.addEventListener("click", function () {
    saveService();
  });

  // Carregar as ordens de serviço quando a página é carregada
  loadOrders();

  function loadOrders() {
    const serviceOrders = JSON.parse(localStorage.getItem("services")) || [];
    const loadDiv = document.getElementById("generate-orders");

    loadDiv.innerHTML = "";

    serviceOrders.forEach(function (order, index) {
      loadDiv.innerHTML += `
      <div class="service-order">
        <div class="top-container">
          <h3 class="service-order-number">#${index}</h3>
          <p class="service-client"><strong>Cliente:</strong> ${order.cliente}</p>
          <p class="service-description"><strong>Descrição do serviço:</strong> ${order.descricao}</p>
        </div>
        <div class="bottom-container">
          <p class="service-products"><strong>Total de produtos para o serviço:</strong>${order.produtos.length}</p>
          <p class="service-total"><strong>Valor do serviço:</strong> ${order.total}</p>
          <p class="service-date"><strong>Data Estimada:</strong>${order.dataEstimada}</p>
        </div>
        <button class="service-done">Finalizar o serviço</button>
      </div>
      `;
    });
  }

  function fillProductList() {
    const products = JSON.parse(localStorage.getItem("produtos")) || [];
    productList.innerHTML = "";

    if (products.length === 0) {
      console.warn("Nenhum produto encontrado no localStorage.");
    }

    products.forEach(function (product) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "product";
      checkbox.value = product.descricao;

      const label = document.createElement("label");
      label.textContent = product.descricao;
      label.appendChild(checkbox);

      productList.appendChild(label);
    });
  }

  function saveService() {
    const client = document.getElementById("client").value;
    const description = document.getElementById("description").value;
    const estimatedDate = document.getElementById("estimated-date").value;
    const totalValue = document.getElementById("total-value").value;

    if (!client || !description || !estimatedDate || !totalValue) {
      showFeedback("Todos os campos são obrigatórios.", "error");
      return;
    }

    const allProducts = JSON.parse(localStorage.getItem("produtos")) || [];
    const selectedProducts = Array.from(
      document.querySelectorAll('input[name="product"]:checked')
    ).map((checkbox) => {
      return allProducts.find(
        (product) => product.descricao === checkbox.value
      );
    });

    if (selectedProducts.length === 0) {
      showFeedback("Selecione pelo menos um produto.", "error");
      return;
    }

    const newService = {
      cliente: client,
      descricao: description,
      produtos: selectedProducts,
      dataEstimada: estimatedDate,
      total: totalValue,
    };

    let services = JSON.parse(localStorage.getItem("services")) || [];
    services.push(newService);
    localStorage.setItem("services", JSON.stringify(services));

    document.getElementById("client").value = "";
    document.getElementById("description").value = "";
    document.getElementById("estimated-date").value = "";
    document.getElementById("total-value").value = "";

    popup.style.display = "none";
    showFeedback("Serviço salvo com sucesso!", "success");

    // Após salvar o serviço, recarregar as ordens de serviço
    loadOrders();
  }

  function showFeedback(message, type) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = type;
    feedbackMessage.style.display = "block";
    setTimeout(() => {
      feedbackMessage.style.display = "none";
    }, 3000);
  }
});
