import { RentalList, RentalSearch, RentalPagination } from "./_components";

console.log("✅ RentalList:", RentalList);
console.log("✅ RentalSearch:", RentalSearch);
console.log("✅ RentalPagination:", RentalPagination);

export default function RentalPage() {
  return (
    <div className="container mt-4">
      <h1>租借列表</h1>

      {/* 搜尋功能 */}
      <RentalSearch />

      {/* 商品列表 */}
      <RentalList />

      {/* 分頁功能 */}
      <RentalPagination />
    </div>
  );
}
