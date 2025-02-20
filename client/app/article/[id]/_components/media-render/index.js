import React from 'react';
import GifImage from '../gif-image';
import styles from './index.module.scss';  // 添加這行引入 styles

export default function MediaRenderer({ media_type, media_url, index }) {
  if (media_type === 'image') {
    return (
      <div className={styles['y-reply-img']} key={index}>
        <img
          src={`/images/article_com_media/${media_url}`}
          alt="Reply attachment"
          style={{
            width: '40%',
            height: 'auto',
            aspectRatio: '16 / 9',
            objectFit: 'contain',
          }}
        />
      </div>
    );
  } else if (media_type === 'video') {
    return (
      <div className={styles['y-reply-img']} key={index}>
        <video
          src={`/images/article_com_media/${media_url}`}
          controls
          style={{
            width: '40%',
            height: 'auto',
            aspectRatio: '16/9',
            objectFit: 'cover',
          }}
        />
      </div>
    );
  } else if (media_type === 'gif') {
    return (
      <div
        className={styles['y-reply-img']}
        key={index}
        style={{
          width: '200px',
          height: '200px',
          overflow: 'hidden',
          borderRadius: '10px',
        }}
      >
        <GifImage
          src={media_url}
          alt="Reply attachment"
          containerSize="200px"
        />
      </div>
    );
  }
  return null;
}