import RentBreadcrumb from "./_components/rent-breadcrumb/page";
import RentPhoto from "./_components/rent-photo/page";
import RentDetail from "./_components/rent-detail/page";
import RentHashtags from "./_components/rent-hashtag/page";
import RentReviews from "./_components/rent-reviews/page";
import RentRecommendation from "./_components/rent-recommendation/page";

import "./rent-detail.scss";

export default function RentalPage() {
  return (
    <div className="container" style={{ paddingTop: '120px' }}>

      {/* Breadcrumb */}
      <RentBreadcrumb />
      <div className="container pt-4" >
        <main>
          <div className="row">
            {/* Photo Section */}
            <div className="col-lg-7">
              <RentPhoto />
            </div>

            {/* Rental Details */}
            <div className="col-lg-5">
              <RentDetail />
              <RentHashtags />
              <RentReviews />
            </div>
          </div>
        </main>
      </div>

      {/* Pagination & Recommendation */}
      <div className="col-lg-12 col-xl-10 mx-auto my-4">
        <RentRecommendation />
      </div>
    </div>
  );
}
