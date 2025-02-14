import RentBreadcrumb from './_components/rent-breadcrumb/page'
import RentSearch from './_components/rent-search/page'
import RentHashtag from './_components/rent-hashtag/page'
import RentFilter from './_components/rent-filter/page'
import RentList from './_components/rent-list/page'

import './rent-list.scss'

export default function RentalPage() {
  return (
    <div className="container" style={{ paddingTop: '120px' }}>
        <RentBreadcrumb />
      <div className="mb-4" >
        <RentList />
      </div>
    </div>
  )
}
