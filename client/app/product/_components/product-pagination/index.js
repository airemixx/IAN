"use client";

import styles from "./product-pagination.module.scss"; // ✅ 正確引入 SCSS Module

export default function Pagination() {
  return (
    <div className={`container mt-4 ${styles.paginationContainer}`}>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
              &laquo;
            </a>
          </li>
          <li className="page-item">
            <a className={`page-link ${styles.activePage}`} href="#">1</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">2</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">3</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">4</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">5</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">&raquo;</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
