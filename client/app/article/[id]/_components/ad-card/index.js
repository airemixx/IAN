'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ContentLoader from 'react-content-loader';
import style from './index.module.scss';

const AdCardLoader = () => {
  return (
    <div className={`mb-3 ${style['y-ad-card']}`}>
      <ContentLoader
        speed={2}
        width={300}
        height={350}
        viewBox="0 0 300 350"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="10" y="0" rx="5" ry="5" width="280" height="200" />
        <rect x="10" y="215" rx="4" ry="4" width="180" height="20" />
        <rect x="10" y="245" rx="3" ry="3" width="130" height="15" />
        <rect x="5" y="305" rx="5" ry="5" width="290" height="40" />
      </ContentLoader>
    </div>
  );
};

export default function AdCard({ articleId }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isDelayDone, setIsDelayDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 設定至少 1500 毫秒的渲染延遲
    const timer = setTimeout(() => {
      setIsDelayDone(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!articleId) {
        setIsLoading(false);
        return;
      }

      try {
        // 使用相對路徑而不是完整 URL
        const productIdResponse = await fetch('/api/product/update-product-id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ articleId }),
        });

        if (!productIdResponse.ok) {
          throw new Error(`HTTP Error: ${productIdResponse.status}`);
        }

        const data = await productIdResponse.json();
        const productId = data.productId;

        // 如果沒有關聯產品，就不顯示任何內容
        if (!productId) {
          setIsLoading(false);
          return;
        }

        // 同樣使用相對路徑
        const productResponse = await fetch(`/api/product/${productId}`);

        if (!productResponse.ok) {
          throw new Error(`HTTP Error: ${productResponse.status}`);
        }

        const productData = await productResponse.json();
        setProduct(productData);
      } catch (err) {
        console.error('獲取產品資料錯誤:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [articleId]);

  // 如果正在加載或延遲未完成，顯示載入器
  if ((isLoading || !isDelayDone) && !error) return <AdCardLoader />;

  // 如果發生錯誤，顯示錯誤訊息
  if (error) return <div className={style.error}>Error: {error}</div>;

  // 如果沒有產品資料，不顯示任何內容
  if (!product) return null;

  return (
    <div className={`mb-3 ${style['y-ad-card']}`}>
      <img src={product.image_url} alt={product.name} />
      <div className={style['product-info']}>
        <h3 className={style['product-title']}>{product.name}</h3>
        <p className={style['product-price']}>NT${product.price}</p>
      </div>
      <button
        className={style['buy-button']}
        onClick={() => router.push(`/product/${product.id}`)}
      >
        BUY
      </button>
    </div>
  );
}