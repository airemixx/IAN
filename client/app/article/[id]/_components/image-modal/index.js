'use client';

import React from 'react';
import styles from './index.module.scss';

export default function ImageModal({ imageUrl, onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <img src={imageUrl} alt="Enlarged view" className={styles.modalImage} />
      </div>
    </div>
  );
}