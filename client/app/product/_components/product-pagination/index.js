'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './product-pagination.module.scss';

export default function Pagination({ className }) {
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination" >
          <li className="page-item">
            <a className={`page-link ${styles['page-link']}`} href="#" aria-label="Previous">
              <span aria-hidden="true">«</span>
            </a>
          </li>
          <li className="page-item">
            <a className={`page-link ${styles['page-link']}`} href="#">1</a>
          </li>
          <li className="page-item">
            <a className={`page-link ${styles['page-link']}`} href="#">2</a>
          </li>
          <li className="page-item">
            <a className={`page-link ${styles['page-link']}`} href="#">3</a>
          </li>
          <li className="page-item">
            <a className={`page-link ${styles['page-link']}`} href="#" aria-label="Next">
              <span aria-hidden="true">»</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}