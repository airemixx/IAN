// rent-hashtag

'use client';

export default function RentHashtag({ onHashtagClick }) {
  const hashtags = ["防抖", "4K", "輕便", "快速對焦", "大光圈"];

  return (
    <div className="mt-1 mb-2">
      {hashtags.map((tag, index) => (
        <span 
          key={index} 
          className="badge tag-bg me-1" 
          style={{ cursor: 'pointer' }}
          onClick={() => onHashtagClick(tag)}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
