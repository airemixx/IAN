'use client';

import Link from 'next/link';
import styles from './order.module.scss';
import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/use-auth';
import Sidenav from '../_components/Sidenav/page';
import axios from 'axios';

export default function UserPage() {
    const { token, user, loading } = useAuth();
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        if (token) {
            axios.get('http://localhost:8000/api/myorders/order', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => setOrders(response.data.orders))
            .catch(error => console.error('Error fetching orders:', error));
        }
    }, [token]);
    
    if (loading) {
        return <div className="text-center mt-5">載入中...</div>;
    }

    return (
        <div className={`container py-4 ${styles.body}`}>
            <div className={`row ${styles.marginTop}`}>
                <Sidenav />
                <div className="col-md-8 col-lg-9 py-4">
                    <h1 className={`mb-4 ${styles.h1}`}>我的訂單 ({orders.length})</h1>
                    {orders.length === 0 ? (
                        <div className="text-center">目前沒有訂單</div>
                    ) : (
                        orders.map(order => (
                            <div key={order.order_code} className={styles.orderCard}>
                                <div className="d-flex justify-content-between mb-3">
                                    <h5>訂單號碼: {order.order_code}</h5>
                                    <h6 className={styles.orderStatus}>{order.status || '處理中'}</h6>
                                </div>
                                {/* 顯示產品項目 */}
                                {order.products && order.products.length > 0 && (
                                    <div>
                                        <h5>商品</h5>
                                        {order.products.map(product => (
                                            <div key={product.id} className={styles.productBorder}>
                                                <div className={`d-flex ${styles.productDetails} gap-4`}>
                                                    <img src={`/images/product/${product.image_url || '/images/product/default.png'}`} alt={product.name} className={styles.productImage} />
                                                    <div className="flex-grow-1">
                                                        
                                                        <h6 className={`mt-3 ${styles.productBrand}`}>{product.brand_id || '無'}</h6>
                                                        <h5>{product.name}</h5>
                                                        <span>價格 : {new Intl.NumberFormat('zh-TW').format(product.price)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {/* 顯示租賃項目 */}
                                {order.rentals && order.rentals.length > 0 && (
                                    <div>
                                        <h5>租賃商品</h5>
                                        {order.rentals.map(rental => (
                                            <div key={rental.id} className={styles.productBorder}>
                                                <div className={`d-flex ${styles.productDetails} gap-4`}>
                                                    <img src={`/images/rental/${rental.image_url || '/images/product/default.png'}.png`} alt={rental.name} className={styles.productImage} />
                                                    <div className="flex-grow-1">
                                                        <h6 className={`mt-3 ${styles.productBrand}`}>{rental.brand || '無'}</h6>
                                                        <h5>{rental.name}</h5>
                                                        <span>價格 : {new Intl.NumberFormat('zh-TW').format(rental.fee)}/天</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {/* 顯示課程項目 */}
                                {order.courses && order.courses.length > 0 && (
                                    <div>
                                        <h5>課程</h5>
                                        {order.courses.map(course => (
                                            <div key={course.id} className={styles.productBorder}>
                                                <div className={`d-flex ${styles.productDetails} gap-4`}>
                                                    <img src={course.image_url || '/images/product/default.png'} alt={course.title} className={styles.productImage} />
                                                    <div className="flex-grow-1">
                                                        <h6 className={`mt-3 ${styles.productBrand}`}>{course.teacher_id || '無'}</h6>
                                                        <h5>{course.title}</h5>
                                                        <span>價格 : {new Intl.NumberFormat('zh-TW').format(course.sale_price)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <h5 className={styles.orderTotal}>訂單金額: NT${order.total || 0}</h5>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
