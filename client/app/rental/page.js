import RentBreadcrumb from './_components/rent-breadcrumb/page'
import RentSearch from './_components/rent-search/page'
import RentHashtag from './_components/rent-hashtag/page'
import RentFilter from './_components/rent-filter/page'
import RentTotal from './_components/rent-total/page'
import RentOrder from './_components/rent-order/page'
import RentList from './_components/rent-list/page'
import RentPagination from './_components/rent-pagination/page'

import './rent-list.scss'

export default function RentalPage() {
  return (
    <div className="container" style={{ paddingTop: '120px' }}>
      <div className="row mb-4" >
        <RentBreadcrumb />
        <aside className="col-0 col-md-4 col-lg-3 p-3">
          <hr className="d-none d-md-block" />
          <RentSearch />
          <RentHashtag />
          <RentFilter />
        </aside>
        <main className="col-12 col-md-8 col-lg-9">
          <RentTotal />
          <RentOrder />
          <RentList />
          <RentPagination />
        </main>
      </div>
    </div>
  )
}
