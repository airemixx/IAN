import RentBreadcrumb from './_components/rent-breadcrumb/page'
import RentDetail from './_components/rent-detail/page'

import './rent-detail.scss'

export default function RentalPage() {
  return (
    <div className="container-fluid k-body">
      <div className="container" style={{ paddingTop: '120px' }}>
        {/* Breadcrumb */}
        <RentBreadcrumb />
        <div className="py-5">
          <RentDetail />
        </div>
      </div>
    </div>
  )
}
