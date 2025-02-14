// rent-card

export default function RentCard({ rental }) {
  return (
    <div className="col">
      <div className="p-card position-relative w-100 border rounded-1 overflow-hidden">
        <div className="position-absolute top-0 start-0 type-bg text-white text-uppercase fw-bold py-1 px-4">
          {rental.type}
        </div>
        <div className="position-absolute top-0 end-0 state-text text-uppercase fw-bold pt-2 pe-3 rounded-start">
          {rental.state}
        </div>
        <div className='mt-4'>
          <img
            src={`/images/rental/test/${rental.image[0]}.png`}
            className="d-block mx-auto"
            style={{ width: '50%' }}
            alt={rental.name}
          />
        </div>
        <div className="pt-0 pe-3 pb-2 ps-4">
          <h3 className="fs-5 fw-bold text-dark">{rental.name}</h3>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fs-6 fw-semibold text-dark">
              NT$ {rental.fee} / 天
            </span>
            <button className="btn-heart">
              <i className="fa-regular fa-heart text-muted fs-5"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}