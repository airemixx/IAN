// rent-total

export default function RentTotal({ totalItems, itemsPerPage }) {
  return (
    <div className="text-end">
      <span>顯示 {totalItems} 項中的 {itemsPerPage} 項</span>
    </div>
  );
}

