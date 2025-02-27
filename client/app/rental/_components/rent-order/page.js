// rent-order

'use client';

export default function RentOrder({ setSorting }) {
  return (
    <div className="d-flex justify-content-end mb-3">
      <select
        className="form-select w-auto"
        onChange={(e) => setSorting(e.target.value)}
      >
        <option value="">排序方式</option>
        <option value="asc">依價錢低到高</option>
        <option value="desc">依價錢高到低</option>
        <option value="reviews_desc">依評論數量 (多到少)</option>
        <option value="rating_desc">依平均評分 (高到低)</option>
      </select>
    </div>
  );
}
