'use client';

export default function RentHashtags() {
  const tags = ["輕巧", "8K錄影", "內建鏡頭", "觸控螢幕", "大光圈", "高解析度"];

  return (
    <div className="mt-1 mb-2">
      {tags.map((tag, index) => (
        <span key={index} className="badge tag-bg me-1">{tag}</span>
      ))}
    </div>
  );
}
