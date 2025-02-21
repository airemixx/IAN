'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import style from './index.module.scss';


export default function AdCard({ productId }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${productId}`);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  if (error) return <div className={style.error}>Error: {error}</div>;
  if (!product) return <div className={style.noProducts}>載入中...</div>;

  return (
    <div className={`mb-3 ${style['y-ad-card']}`}>
      <img src={product.image_url} alt={product.name} />
      <div className={style['product-info']}>
        <h3 className={style['product-title']}>{product.name}</h3>
        <p className={style['product-price']}>NT${product.price}</p>
      </div>
      <button className={style['buy-button']}
      onClick={() => router.push(`/product/${product.id}`)}
      >
      BUY</button>
    </div>
  );
}