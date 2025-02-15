import RentBreadcrumb from "./_components/rent-breadcrumb/page";
import RentPicture from "./_components/rent-picture/page";
import RentDetail from "./_components/rent-detail/page";
import RentHashtag from "./_components/rent-hashtag/page";
import RentReviews from "./_components/rent-reviews/page";
import RentRecommend from "./_components/rent-recommend/page";

import "./rent-detail.scss";

export default function RentalPage() {
  return (
    <div className="container" style={{ paddingTop: '120px' }}>

      {/* Breadcrumb */}
      <RentBreadcrumb />
      <div className="container pt-4" >
        <main>
          <div className="row">
            {/* Pictur Section */}
            <div className="col-lg-7">
              <RentPicture />
            </div>

            {/* Rental Details */}
            <div className="col-lg-5">
              <RentDetail />
              <RentHashtag />
              <RentReviews />
            </div>
          </div>
        </main>
      </div>

      {/* Pagination & Recommend */}
      <div className="col-lg-12 col-xl-10 mx-auto my-4">
        <RentRecommend />
      </div>
    </div>
  );
}
