import styles from "../rental-list.module.scss";

export default function RentalCard({ rental }) {
  return (
    <div className={`${styles.pCard} border rounded-1 overflow-hidden`}>
      <a href={`/rental/${rental.id}`} className="card-ring">
        <div className="p-3">
          <img src={`/images/rental/${rental.image[0]}.png`} alt={rental.name} className="w-100" />
        </div>
        <div className="p-3">
          <h3 className="fs-5 fw-bold">{rental.name}</h3>
          <p className="text-muted">NT$ {rental.fee} / 天</p>
        </div>
      </a>
    </div>
  );
}
