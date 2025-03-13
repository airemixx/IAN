import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import styles from './ProductCard.module.scss'

export default function ProductCardIndex() {
  const [products, setProducts] = useState([])
  const productRefs = useRef([]) // 用來儲存所有 productCard 的 ref
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredCard, setHoveredCard] = useState(null)
  const [focusStage, setFocusStage] = useState(0) // 0: 無焦點, 1: 聚焦中, 2: 聚焦完成
  const [isMouseInImageArea, setIsMouseInImageArea] = useState(false) // 新增：追蹤滑鼠是否在圖片區域
  const [isTooCloseToEdge, setIsTooCloseToEdge] = useState(false) // 新增：追蹤滑鼠是否太靠近邊緣
  const scrollContainerRef = useRef(null); // 添加對滾動容器的引用

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:8000/api/product')
        if (!res.ok) throw new Error("API 請求失敗")

        const data = await res.json()
        const sortedProducts = data
          .filter(product => product.category_id === 1 && ![18, 15, 16].includes(product.id))
          .sort((a, b) => b.price - a.price)
        setProducts(sortedProducts.slice(0, 10))
      } catch (error) {
        console.error("獲取商品失敗:", error)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 獲取卡片的索引
            const cardIndex = productRefs.current.findIndex(ref => ref === entry.target);
            if (cardIndex !== -1) {
              // 添加淡入動畫和對應的延遲類別
              entry.target.classList.add(styles.fadeInUp);
              entry.target.classList.add(styles[`delay-${cardIndex}`]); // 依序延遲
            }
          } else {
            entry.target.classList.remove(styles.fadeInUp);
            // 移除所有延遲類別
            for (let i = 0; i <= 10; i++) {
              entry.target.classList.remove(styles[`delay-${i}`]);
            }
          }
        });
      },
      {
        threshold: 0.05, // 降低閾值從0.1到0.05，讓動畫更早觸發
        rootMargin: '50px' // 增加提前觸發距離
      }
    );

    productRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [products]);

  // 當鼠標進入卡片時
  const handleMouseEnter = (index) => {
    setHoveredCard(index);
    setFocusStage(1); // 開始聚焦

    // 0.8秒後切換到聚焦完成狀態
    setTimeout(() => {
      setFocusStage(2);
    }, 800);
  };

  // 當鼠標離開卡片時
  const handleMouseLeave = () => {
    setHoveredCard(null);
    setFocusStage(0);
  };

  // 追蹤滑鼠位置
  const handleMouseMove = (e, index) => {
    if (hoveredCard === index) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  // 當鼠標進入圖片區域
  const handleImageAreaMouseEnter = (index) => {
    setHoveredCard(index);
    setFocusStage(1); // 開始聚焦
    setIsMouseInImageArea(true);

    // 0.8秒後切換到聚焦完成狀態
    setTimeout(() => {
      setFocusStage(2);
    }, 800);
  };

  // 當鼠標離開圖片區域
  const handleImageAreaMouseLeave = () => {
    setIsMouseInImageArea(false);
    setFocusStage(0);
  };

  // 追蹤圖片區域內的滑鼠位置，並處理邊界檢測
  const handleImageAreaMouseMove = (e, index) => {
    if (hoveredCard === index && isMouseInImageArea) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 計算對焦框的一半尺寸 (框的寬和高各自的一半)
      const frameHalfWidth = 20; // 40px 寬度的一半
      const frameHalfHeight = 25; // 50px 高度的一半

      // 計算邊界緩衝區 - 當靠近邊緣這個距離時隱藏對焦框
      const buffer = 5; // 5px 的額外緩衝

      // 檢查滑鼠是否太靠近邊緣
      const tooCloseToEdge =
        x - frameHalfWidth - buffer <= 0 || // 左邊緣
        x + frameHalfWidth + buffer >= rect.width || // 右邊緣
        y - frameHalfHeight - buffer <= 0 || // 上邊緣
        y + frameHalfHeight + buffer >= rect.height; // 下邊緣

      // 設置滑鼠位置
      setMousePosition({ x, y });

      // 如果太靠近邊緣，就暫時隱藏對焦框，否則顯示
      if (tooCloseToEdge) {
        // 隱藏對焦框但不更改聚焦狀態
        setIsTooCloseToEdge(true);
      } else {
        setIsTooCloseToEdge(false);
      }
    }
  };

  // 添加滑動控制函數
  const scrollToPosition = (position) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: position,
        behavior: 'smooth'
      });
    }
  };

  // 滑動到最後一張卡片
  const scrollToEnd = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollWidth,
        behavior: 'smooth'
      });
    }
  };

  // 滋動到第一張卡片
  const scrollToStart = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  // 向左滾動一張卡片，同樣處理
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardTotalWidth = 330 + 20 + 20;

      scrollContainerRef.current.scrollBy({
        left: -cardTotalWidth,
        behavior: 'smooth'
      });

      // 相似的邏輯處理左側進入視野的卡片
      setTimeout(() => {
        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        const leftEdge = containerRect.left;

        let prevCardIndex = -1;
        productRefs.current.forEach((ref, index) => {
          if (ref) {
            const cardRect = ref.getBoundingClientRect();
            if (cardRect.right > leftEdge - 50 && cardRect.right < leftEdge + 50) {
              prevCardIndex = index;
            }
          }
        });

        if (prevCardIndex >= 0 && productRefs.current[prevCardIndex]) {
          // 同上，設置立即顯示
          productRefs.current[prevCardIndex].classList.remove(styles.fadeInUp);
          for (let i = 0; i <= 10; i++) {
            productRefs.current[prevCardIndex].classList.remove(styles[`delay-${i}`]);
          }

          void productRefs.current[prevCardIndex].offsetWidth;
          productRefs.current[prevCardIndex].classList.add(styles.instantShow);
        }
      }, 50);
    }
  };

  // 向右滾動一張卡片，並立即顯示新卡片
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // 計算單張卡片的總寬度
      const cardTotalWidth = 330 + 20 + 20;

      // 滾動一張卡片的寬度
      scrollContainerRef.current.scrollBy({
        left: cardTotalWidth,
        behavior: 'smooth'
      });

      // 找出將要進入視野的卡片
      setTimeout(() => {
        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        const rightEdge = containerRect.right;

        // 找出最靠近右邊緣的卡片
        let nextCardIndex = -1;
        productRefs.current.forEach((ref, index) => {
          if (ref) {
            const cardRect = ref.getBoundingClientRect();
            // 檢查卡片的左邊緣是否剛好在容器右邊緣附近
            if (cardRect.left > rightEdge - 50 && cardRect.left < rightEdge + 50) {
              nextCardIndex = index;
            }
          }
        });

        // 立即顯示該卡片
        if (nextCardIndex >= 0 && productRefs.current[nextCardIndex]) {
          productRefs.current[nextCardIndex].classList.remove(styles.fadeInUp);
          // 移除所有延遲類
          for (let i = 0; i <= 10; i++) {
            productRefs.current[nextCardIndex].classList.remove(styles[`delay-${i}`]);
          }

          // 添加立即顯示類
          void productRefs.current[nextCardIndex].offsetWidth; // 強制重排，重新觸發動畫
          productRefs.current[nextCardIndex].classList.add(styles.instantShow);
        }
      }, 50); // 給滾動一點時間開始
    }
  };

  return (
    <div className={styles.productContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>新登場</h2>
      </div>

      {/* 產品卡片區域 - 包含左右兩側的導航按鈕 */}
      <div className={styles.productCarouselContainer}>
        {/* 左側導航按鈕 - 使用 SVG chevron */}
        <button
          onClick={scrollLeft}
          className={`${styles.navButton} ${styles.navButtonLeft}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16">
            <path d="M9.3 1.3L7.9 0 0 8l7.9 8 1.4-1.3L2.7 8z"></path>
          </svg>
        </button>

        {/* 右側導航按鈕 - 使用 SVG chevron */}
        <button
          onClick={scrollRight}
          className={`${styles.navButton} ${styles.navButtonRight}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16">
            <path d="M2.1 0L0.7 1.3 7.3 8 0.7 14.7 2.1 16 10 8z"></path>
          </svg>
        </button>

        {/* 卡片滾動容器 */}
        <div ref={scrollContainerRef} className={styles.productScrollContainer}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <Link href={`/product/${product.id}`} key={product.id} className={styles.cardLink}>
                <div
                  ref={(el) => (productRefs.current[index] = el)}
                  className={styles.productCard}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={styles.productInfo}>
                    <p className={styles.productCategory}>{product.brand_name}</p>
                    <h2 className={styles.productName}>{product.name}</h2>
                    <p className={styles.productPrice}>NT$ {product.price.toLocaleString()}</p>
                  </div>

                  {/* 圖片容器，事件處理移到這裡 */}
                  <div
                    className={`${styles.productImageContainer} ${hoveredCard === index && isMouseInImageArea ?
                      (focusStage === 1 ? styles.focusing : styles.focused)
                      : ''
                      }`}
                    onMouseEnter={() => handleImageAreaMouseEnter(index)}
                    onMouseLeave={handleImageAreaMouseLeave}
                    onMouseMove={(e) => handleImageAreaMouseMove(e, index)}
                  >
                    {/* 對焦框只在圖片區域內顯示 */}
                    {hoveredCard === index && isMouseInImageArea && !isTooCloseToEdge && (
                      <div
                        className={`${styles.focusFrame} ${focusStage === 2 ? styles.focusFrameActive : ''}`}
                        style={{
                          left: `${mousePosition.x}px`,
                          top: `${mousePosition.y}px`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      ></div>
                    )}

                    <img
                      src={product.image_url}
                      alt={product.name}
                      className={styles.productImage}
                    />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className={styles.loadingText}>載入中...</p>
          )}
        </div>
      </div>
    </div>
  )
}
