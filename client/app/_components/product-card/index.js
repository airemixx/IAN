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

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:8000/api/product')
        if (!res.ok) throw new Error("API 請求失敗")

        const data = await res.json()
        const sortedProducts = data
          .filter(product => product.category_id === 1 && ![18, 15, 16].includes(product.id))
          .sort((a, b) => b.price - a.price)
        setProducts(sortedProducts.slice(0, 6))
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
      { threshold: 0.3 } // 降低閾值以更早觸發動畫
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

  return (
    <div className={styles.productContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>新登場</h2>
      </div>

      <div className={styles.productScrollContainer}>
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
  )
}
