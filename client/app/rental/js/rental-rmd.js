document.addEventListener("DOMContentLoaded", function () {
  const rentalProduct = document.getElementById("rental-rmd");
  let rentalData = [];
  let currentIndex = 0;
  let itemsPerPage = getItemsPerPage();
  
  fetch("./json/rantal-list.json")
      .then(response => response.json())
      .then(rentals => {
          rentalData = rentals;
          renderItems();
          updateButtons();
      })
      .catch(error => console.error("無法載入商品資料:", error));

  function getItemsPerPage() {
      if (window.innerWidth >= 992) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
  }

  function renderItems() {
      rentalProduct.innerHTML = "";
      if (itemsPerPage === 1) {
          // 瀑布流模式 (lazy load)
          rentalData.forEach(rental => {
              rentalProduct.innerHTML += createRentalHTML(rental);
          });
      } else {
          const visibleItems = rentalData.slice(currentIndex, currentIndex + itemsPerPage);
          visibleItems.forEach(rental => {
              rentalProduct.innerHTML += createRentalHTML(rental);
          });
      }
  }

  function createRentalHTML(rental) {
      return `
          <a href="/rental-detail.html" class="card-ring">
            <div class="p-card position-relative w-100 border rounded-1 overflow-hidden">
              <!-- 類別標籤 -->
              <div class="position-absolute top-0 start-0 tpye-bg text-white text-uppercase fw-bold py-1 px-4">
                ${rental.type}
              </div>
              <!-- 狀態標籤 -->
              <div class="position-absolute top-0 end-0 state-text text-uppercase fw-bold pt-2 pe-3 rounded-start">
                ${rental.state}
              </div>
              <!-- 產品圖片輪播 -->
              <div id="carousel-${rental.id}" class="carousel slide mt-4" data-bs-ride="carousel">
                <div class="carousel-inner">
                  ${rental.image.map((img, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                      <img src="rent-images/${img}.png" class="d-block mx-auto" style="width:50%;" alt="${rental.name}">
                    </div>
                  `).join('')}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${rental.id}" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" style="filter: invert(1);" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carousel-${rental.id}" data-bs-slide="next">
                  <span class="carousel-control-next-icon" style="filter: invert(1);" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              <div class="pt-0 pe-3 pb-2 ps-4">
                <div class="d-flex justify-content-between align-items-center">
                  <h3 class="fs-5 fw-bold text-dark">${rental.name}</h3>                  
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-6 fw-semibold text-dark">NT$ ${rental.fee} / 天</span>
                  <button class="btn-heart"><i class="fa-regular fa-heart text-muted fs-5"></i></button>
                </div>
              </div>
            </div>
          </a>`;
  }


  document.getElementById("prev-btn").addEventListener("click", function () {
    if (currentIndex > 0) {
        currentIndex--;
        renderItems();
        updateButtons();
    }
});

document.getElementById("next-btn").addEventListener("click", function () {
    if (currentIndex + itemsPerPage < rentalData.length) {
        currentIndex++;
        renderItems();
        updateButtons();
    }
});

function updateButtons() {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    if (itemsPerPage === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    } else {
        prevBtn.style.display = (currentIndex === 0) ? "none" : "flex";
        nextBtn.style.display = (currentIndex + itemsPerPage >= rentalData.length) ? "none" : "flex";
    }
}

window.addEventListener("resize", function () {
    itemsPerPage = getItemsPerPage();
    renderItems();
    updateButtons();
});

  // 重新設計按鈕，使其類似 thumbnails-container
  // const buttonContainer = document.createElement("div");
  // buttonContainer.classList.add("d-flex", "align-items-center", "justify-content-between", "mt-3", "position-relative");
  
  // const rentalContainer = rentalProduct.parentNode;
  // rentalContainer.insertBefore(buttonContainer, rentalProduct);
  
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  // buttonContainer.appendChild(prevBtn);
  // buttonContainer.appendChild(nextBtn);

  // prevBtn.style.position = "absolute";
  // prevBtn.style.left = "-50px";
  // nextBtn.style.position = "absolute";
  // nextBtn.style.right = "-50px";
});
