// 從 JSON 檔案中載入商品資料
fetch("./json/rantal-list.json")
  .then((response) => response.json())
  .then((rentals) => {
    let currentPage = 1;
    let itemsPerPage = getItemsPerPage();
    const rentalProduct = document.getElementById("rental-product");
    const paginationContainer = document.createElement("div");
    paginationContainer.id = "pagination";
    paginationContainer.classList.add(
      "d-flex",
      "justify-content-center",
      "mt-3"
    );
    rentalProduct.insertAdjacentElement("afterend", paginationContainer);

    function getItemsPerPage() {
      if (window.innerWidth >= 992) return 12;
      if (window.innerWidth >= 768) return 8;
      return 6;
    }

    function renderProducts() {
      rentalProduct.innerHTML = "";
      itemsPerPage = getItemsPerPage();
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedItems = rentals.slice(start, end);

      paginatedItems.forEach((rental) => {
        const rentalHTML = `
          <a href="/rental-detail.html" class="card-ring">
            <div class="p-card position-relative w-100 border rounded-1 overflow-hidden">
              <!-- 類別標籤 -->
              <div class="position-absolute top-0 start-0 type-bg text-white text-uppercase fw-bold py-1 px-4">
                ${rental.type}
              </div>
              <!-- 狀態標籤 -->
              <div class="position-absolute top-0 end-0 state-text text-uppercase fw-bold pt-2 pe-3 rounded-start">
                ${rental.state}
              </div>
              <!-- 產品圖片輪播 -->
              <div id="carousel-${
                rental.id
              }" class="carousel slide mt-4" data-bs-ride="carousel">
                <div class="carousel-inner">
                  ${rental.image
                    .map(
                      (img, index) => `
                    <div class="carousel-item ${index === 0 ? "active" : ""}">
                      <img src="rent-images/${img}.png" class="d-block mx-auto" style="width:50%;" alt="${
                        rental.name
                      }">
                    </div>
                  `
                    )
                    .join("")}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${
                  rental.id
                }" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" style="filter: invert(1);" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carousel-${
                  rental.id
                }" data-bs-slide="next">
                  <span class="carousel-control-next-icon" style="filter: invert(1);" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              <div class="pt-0 pe-3 pb-2 ps-4">
                <div class="d-flex justify-content-between align-items-center">
                  <h3 class="fs-5 fw-bold text-dark">${
                    rental.name
                  }</h3>                  
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-6 fw-semibold text-dark">NT$ ${
                    rental.fee
                  } / 天</span>
                  <button class="btn-heart"><i class="fa-regular fa-heart text-muted fs-5"></i></button>
                </div>
              </div>
            </div>
          </a>
        `;

        // 插入商品到列表容器
        rentalProduct.innerHTML += rentalHTML;
      });
    }
    function renderPagination() {
      paginationContainer.innerHTML = "";
      const totalPages = Math.ceil(rentals.length / itemsPerPage);
      for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement("button");
        pageItem.innerText = i;
        pageItem.classList.add(
          "btn",
          "btn-sm-radius",
          "btn-sm",
          "mx-1",
          i === currentPage ? "btn-primary" : "btn-outline-primary"
        );
        pageItem.addEventListener("click", () => {
          currentPage = i;
          renderProducts();
          renderPagination();
        });
        paginationContainer.appendChild(pageItem);
      }
    }

    renderProducts();
    renderPagination();

    window.addEventListener("resize", () => {
      const newItemsPerPage = getItemsPerPage();
      if (newItemsPerPage !== itemsPerPage) {
        itemsPerPage = newItemsPerPage;
        currentPage = 1;
        renderProducts();
        renderPagination();
      }
    });
  })
  .catch((error) => console.error("無法載入商品資料:", error));
