import RentalCard from "./rental-card";

export default function RentalList() {
  // Mock Data，確保 `fetch()` 之後再啟用
  const rentals = [
    {
      id: 1,
      name: "EOS-R3",
      fee: 2500,
      image: ["EOS-R3-0"]
    },
    {
      id: 2,
      name: "EOS-R5",
      fee: 1600,
      image: ["EOS-R5-0"]
    },
    {
      id: 3,
      name: "EOS-R6II",
      fee: 1200,
      image: ["EOS-R6II-0"]
    }
  ];

  return (
    <div className="rental-list">
      {rentals.map((rental) => (
        <RentalCard key={rental.id} rental={rental} />
      ))}
    </div>
  );
}
