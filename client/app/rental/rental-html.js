import React, { useEffect, useState } from 'react'

const RentalList = () => {
  const [rentals, setRentals] = useState([])

  useEffect(() => {
    // 模擬 JSON 資料
    const rentalData = [
      {
        id: 1,
        name: 'EOS R3',
        brand: 'Canon',
        type: '相機',
        fee: 2500,
        image: ['EOS-R3-0'],
      },
      {
        id: 2,
        name: 'EOS R5',
        brand: 'Canon',
        type: '相機',
        fee: 1600,
        image: ['EOS-R5-0'],
      },
    ]
    setRentals(rentalData)
  }, [])

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 mt-1">
        {rentals.map((rental) => (
          <div key={rental.id} className="col">
            <div className="p-card border rounded-1 overflow-hidden">
              <img
                src={`/rent-images/${rental.image[0]}.png`}
                className="d-block mx-auto"
                style={{ width: '50%' }}
                alt={rental.name}
              />
              <h3 className="fs-5 fw-bold text-dark">{rental.name}</h3>
              <span className="fs-6 fw-semibold text-dark">
                NT$ {rental.fee} / 天
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RentalList
