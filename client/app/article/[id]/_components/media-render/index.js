'use client';

import React, { useState } from 'react';
import GifImage from '../gif-image';
import ImageModal from '../image-modal';
import styles from './index.module.scss';

export default function MediaRenderer({ media_type, media_url }) {
  const [showModal, setShowModal] = useState(false);

  if (media_type === 'image') {
    return (
      <>
        <div className={styles['y-reply-img']}>
          <img
            src={`/images/article_com_media/${media_url}`}
            alt="Reply attachment"
            style={{
              width: '40%',
              height: 'auto',
              aspectRatio: '16 / 9',
              objectFit: 'cover',
              cursor: 'pointer'
            }}
            onClick={() => setShowModal(true)}
          />
        </div>
        {showModal && (
          <ImageModal
            imageUrl={`/images/article_com_media/${media_url}`}
            onClose={() => setShowModal(false)}
          />
        )}
      </>
    );
  }

  if (media_type === 'video') {
    return (
      <div className={styles['y-reply-img']}>
        <video
          src={`/images/article_com_media/${media_url}`}
          controls
          style={{
            width: '40%',
            height: 'auto',
            aspectRatio: '16/9',
            objectFit: 'cover'
          }}
        />
      </div>
    );
  }

  if (media_type === 'gif') {
    return (
      <div
        className={styles['y-reply-img']}
        style={{
          width: '200px',
          height: '200px',
          overflow: 'hidden',
        }}
      >
        <GifImage
          src={media_url.startsWith('http') ? media_url : `/images/article_com_media/${media_url}`}
          alt="GIF attachment"
          containerSize="200px"
        />
      </div>
    );
  }

  return null;
}