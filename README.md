--- 筆記
LENSTUDIO/
├─ client/ # ✅ 前端程式碼
│ ├── app/
│ │ ├── article/ # ✅ 文章系統
│ │ ├── course/ # ✅ 課程系統
│ │ ├── product/ # ✅ 商品系統
│ │ ├── rental/ # ✅ 租借系統
│ │ │ ├── page.js
│ │ │ ├── rental-list.module.scss
│ │ │ ├── \_components
│ │ │ │ ├── index.js # 商品列表(server)
│ │ │ │ ├── rental-list.js # 商品列表(server)
│ │ │ │ ├── rental-card.js # 單個商品(server)
│ │ │ │ ├── rental-pagination.js # 分頁(client)
│ │ │ │ └── rental-search.js # 搜尋(client)
│ │ │ └── [id]/
│ │ │ ├── page.js
│ │ │ ├── rental-detail.module.scss
│ │ │ └── \_components
│ │ │ ├── index.js
│ │ │ ├── rental-detail.js # 租借詳情(server)
│ │ │ ├── rental-carousel.js # 輪播(client)
│ │ │ ├── rental-tabs.js # 切換(client)
│ │ │ ├── rental-reviews.js # 評論(client)
│ │ │ └── rental-recommendation.js # 推薦商品(server)
│ │ │
│ │ ├── cart/ # ✅ 購物車系統
│ │ ├── user/ # ✅ 會員系統
│ │ ├── layout.js
│ │ ├── page.js
│ │ └── page.module
│ │
│ ├── public/
│ │ ├── fonts/
│ │ ├── images/
│ │ │ ├── article/ # ✅ 文章系統的圖片
│ │ │ ├── course/ # ✅ 課程系統的圖片
│ │ │ ├── icon/ # ✅ 共用 svg 的圖片
│ │ │ ├── product/ # ✅ 商品系統的圖片
│ │ │ ├── rental/ # ✅ 租借系統的圖片
│ │ │ ├── cart/ # ✅ 購物車系統的圖片
│ │ │ ├── teacher/ # ✅ 教師系統的圖片
│ │ │ └── user/ # ✅ 會員系統的圖片
│ │ └── favicon.ico
│ │  
│ │
│ │
│ └── styles/
│ └── globals.css
│
└── server/ # ✅ 後端程式碼
