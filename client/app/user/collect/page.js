'use client';
import { useEffect, useState, useCallback } from "react";
import useAuth from "@/hooks/use-auth";
import Sidenav from "../_components/Sidenav/page";
import FavoriteButton from "../_components/favorite-button-p/page";
import Link from "next/link";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./collect.module.scss";

export default function CollectPage() {
  const { token, loading } = useAuth();
  const [collections, setCollections] = useState({
    products: [],
    rents: [],
    courses: [],
    articles: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [slidePercentage, setSlidePercentage] = useState(33.33);

  useEffect(() => {
    const updateSlidePercentage = () => {
      setSlidePercentage(window.innerWidth < 768 ? 100 : 33.33);
    };
    updateSlidePercentage();
    window.addEventListener("resize", updateSlidePercentage);
    return () => window.removeEventListener("resize", updateSlidePercentage);
  }, []);

  const fetchFavorites = useCallback(() => {
    if (!token) return;
    setIsLoading(true);

    fetch(`http://localhost:8000/api/users/favorites/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object") {
          setCollections(data);
        } else {
          setCollections({ products: [], rents: [], courses: [], articles: [] });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("獲取收藏失敗:", err);
        setIsLoading(false);
      });
  }, [token]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleRefresh = () => {
    fetchFavorites();
  };

  if (loading || isLoading) {
    return <div className="text-center mt-5">載入中...</div>;
  }

  return (
    <div className="container py-4">
      <div className={`row ${styles.marginTop}`}>
        <Sidenav />
        <div className="col-md-8 col-lg-9 py-4">
          <h1 className={`mb-4 ${styles.h1}`}>我的收藏</h1>
          {Object.entries(collections).map(([key, items]) => (
            <section key={key} className="mb-5">
              <h5 className="mb-3">{key === 'products' ? '相機' : key === 'rents' ? '租賃' : key === 'courses' ? '課程' : '文章'}</h5>
              {items.length === 0 ? (
                <p>目前沒有收藏的{key === 'products' ? '商品' : key === 'rents' ? '租賃' : key === 'courses' ? '課程' : '文章'}</p>
              ) : (
                <Carousel 
                  autoPlay={true} 
                  infiniteLoop={true} 
                  showThumbs={false} 
                  showStatus={false} 
                  showArrows={false} 
                  swipeable={true} 
                  emulateTouch={true} 
                  centerMode={true} 
                  centerSlidePercentage={slidePercentage}>
                  {items.map((item) => (
                    <div key={item.collect_id || item.product_id || item.rent_id || item.course_id || item.article_id} className="col-12 col-md-6 col-lg-4">
                      <div className={`p-4 ${styles.collectionCard}`}>
                        <div className='text-end'>
                          <FavoriteButton 
                            productId={item.product_id} 
                            rentId={item.rent_id} 
                            courseId={item.course_id} 
                            articleId={item.article_id} 
                            onFavoriteToggle={handleRefresh} 
                          />
                        </div>
                        <Link href={`/${key === 'products' ? 'product' : key === 'rents' ? 'rental' : key === 'courses' ? 'courses' : 'article'}/${item.product_id || item.rent_id || item.course_id || item.article_id}`}
                          className={`${styles.noUnderline} ${styles.cardLink}`}
                        >
                          <img src={item.image_url} alt={item.name || item.rent_name || item.course_title || item.title} className="mb-3" />
                          <div className={styles.cardDivider} />
                          <h6 className={styles.textGray}>{item.brand_name || item.brand || `講師: ${item.instructor_name}`}</h6>
                          <h5>{item.name || item.rent_name || item.course_title || item.title}</h5>
                          <h5 className={`mb-3 ${styles.price}`}>價格: ${item.price} {key === 'rents' ? '/天' : ''}</h5>
                          <h6 className={styles.textGray}>{item.short_introduce || item.subtitle}</h6>
                        </Link>
                      </div>
                    </div>
                  ))}
                </Carousel>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
