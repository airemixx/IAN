document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "rent-images/leica-Q3-0.png",
        "rent-images/leica-Q3-1.png",
        "rent-images/leica-Q3-2.png",
        "rent-images/leica-Q3-3.png",
        "rent-images/leica-Q3-4.png",
        "rent-images/leica-Q3-5.png"
    ];

    let startIndex = 0;
    let visibleCount = window.innerWidth < 768 ? 2 : 3; // 手機顯示 2 張，桌機 3 張
    const thumbnailWrapper = document.getElementById("thumbnailWrapper");
    const mainImage = document.getElementById("mainImage");

    // 預加載圖片
    function preloadImages() {
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // 更新縮圖函數
    function updateThumbnails() {
        const existingThumbnails = Array.from(thumbnailWrapper.querySelectorAll(".thumbnail"));
        
        // 移除多餘的縮圖（適用於從 3 張變成 2 張）
        if (existingThumbnails.length > visibleCount) {
            for (let i = visibleCount; i < existingThumbnails.length; i++) {
                thumbnailWrapper.removeChild(existingThumbnails[i]);
            }
        }

        // 更新或新增縮圖
        for (let i = 0; i < visibleCount; i++) {
            let imgIndex = (startIndex + i) % images.length;
            let existingThumbnail = existingThumbnails[i];
            
            if (existingThumbnail) {
                // 更新現有縮圖的 src 和 data-id
                const img = existingThumbnail.querySelector("img");
                img.src = images[imgIndex];
                img.setAttribute("data-id", images[imgIndex]);

                // 更新 active 樣式
                img.classList.toggle("active", img.src === mainImage.src);
            } else {
                // 如果縮圖數量不足，新增縮圖
                const div = document.createElement("div");
                div.classList.add("thumbnail", "p-card", "mx-2");

                const img = document.createElement("img");
                img.src = images[imgIndex];
                img.alt = `Thumbnail ${imgIndex}`;
                img.classList.add("img-fluid");
                img.setAttribute("data-id", images[imgIndex]);

                // 點擊事件
                img.addEventListener("click", function () {
                    mainImage.src = img.getAttribute("data-id");

                    document.querySelectorAll(".thumbnail img").forEach(item => {
                        item.classList.remove("active");
                    });
                    img.classList.add("active");
                });

                div.appendChild(img);
                thumbnailWrapper.appendChild(div);
            }
        }
    }

    // 左右按鈕功能（無限循環）
    document.getElementById("prevBtn").addEventListener("click", function () {
        startIndex = (startIndex - 1 + images.length) % images.length;
        updateThumbnails();
    });

    document.getElementById("nextBtn").addEventListener("click", function () {
        startIndex = (startIndex + 1) % images.length;
        updateThumbnails();
    });

// 新增滑動功能
let startX = 0; // 滑動起始點
let endX = 0;   // 滑動結束點
let isSliding = false; // 防止一次滑動切換多張

thumbnailWrapper.addEventListener("touchstart", function (event) {
    startX = event.touches[0].clientX; // 記錄觸控起始點
    isSliding = false; // 重置滑動狀態
});

thumbnailWrapper.addEventListener("touchmove", function (event) {
    endX = event.touches[0].clientX; // 記錄當前的滑動位置
});

thumbnailWrapper.addEventListener("touchend", function () {
    const distance = startX - endX; // 計算滑動距離
    if (Math.abs(distance) > 50 && !isSliding) { // 確保滑動距離超過閾值且未觸發過
        if (distance > 0) { // 向左滑動
            startIndex = (startIndex + 1) % images.length;
        } else { // 向右滑動
            startIndex = (startIndex - 1 + images.length) % images.length;
        }
        updateThumbnails(); // 更新縮圖
        isSliding = true; // 標記此次滑動已完成
    }
});

    // 監聽視窗大小變化，切換圖片顯示數量
    window.addEventListener("resize", function () {
        const newVisibleCount = window.innerWidth < 768 ? 2 : 3;

        // 如果顯示數量有變化，更新縮圖
        if (newVisibleCount !== visibleCount) {
            visibleCount = newVisibleCount;
            updateThumbnails();
        }
    });

    // 初始化顯示
    preloadImages(); // 預加載圖片
    updateThumbnails();
});

// Tab

document.addEventListener("DOMContentLoaded", function () {
    const rentalButton = document.getElementById("rentalButton");
    const specButton = document.getElementById("specButton");
    const tabContent = document.getElementById("tabContent");
  
    // 點擊 "租借內容" 按鈕
    rentalButton.addEventListener("click", function () {
      rentalButton.classList.add("active");
      specButton.classList.remove("active");
      tabContent.innerHTML = `
        <div class="card card-radius">
          <div class="card-body">
            <h5 class="card-title brand-text">商品配件</h5>
            <ul>
              <li>64G SD 記憶卡</li>
              <li>電池 x2</li>
              <li>充電器</li>
              <li>鏡頭蓋</li>		
            </ul>
            <div class="mt-4">
              <h5 class="card-title brand-text">租借時段</h5>
              <label class="fee-text" for="startDate">開始日期</label>
              <input type="date" id="startDate" class="form-control mb-2">
              <label class="fee-text" for="endDate">結束日期</label>
              <input type="date" id="endDate" class="form-control">
              <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-primary">立即租借</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  
    // 點擊 "產品規格" 按鈕
    specButton.addEventListener("click", function () {
      specButton.classList.add("active");
      rentalButton.classList.remove("active");
      tabContent.innerHTML = `
      <div class="card card-radius p-3">
        <table class="table">
          <tbody>
            <tr>
              <th class="ps-3">尺寸</th>
              <td>130 x 80 x 92 mm</td>
            </tr>
            <tr>
              <th class="ps-3">重量</th>
              <td>743 g</td>
            </tr>
            <tr>
              <th class="ps-3">相機類型</th>
              <td>背照式 CMOS 全幅相機</td>
            </tr>
            <tr>
              <th class="ps-3">適配鏡頭</th>
              <td>Summilux 28mm f/1.7 ASPH. (固定鏡頭)</td>
            </tr>
            <tr>
              <th class="ps-3">鏡頭類型</th>
              <td>廣角定焦鏡頭</td>
            </tr>
            <tr>
              <th class="ps-3">產品特點</th>
              <td>
                <ul class="list-unstyled mb-0">
                  <li>6000萬像素</li>
                  <li>內建 28mm f/1.7 大光圈鏡頭</li>
                  <li>低光表現優秀</li>
                  <li>8K 30p 影片錄製</li>
                  <li>可傾斜觸控螢幕</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      `;
    });
  });
  