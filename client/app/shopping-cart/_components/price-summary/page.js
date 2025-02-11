export default function PriceSummary() {
    return (
      <div className="j-payStep col-md-4 mb-5 d-flex flex-column align-items-center">
        <div className="j-pCount border-bottom mb-3 d-flex flex-column gap-2">
          <div className="j-pTitle j-publicFont">摘要</div>
          <div className="j-ifCouponUse j-publicFont">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={25}
                viewBox="0 0 24 25"
                fill="none"
              >
                <circle cx={12} cy="12.5" r={11} stroke="#003150" strokeWidth={2} />
                <circle cx={12} cy="12.5" r="7.5" fill="#003150" />
              </svg>
              是否使用優惠券
            </label>
          </div>
          <div className="couponName d-flex flex-column j-publicFont">
            <span>課程95折優惠券</span>
            <span>相機1500折價券</span>
          </div>
          <div className="subTotalBox d-flex justify-content-between j-publicFont">
            <div className="subTotal">小計</div>
            <div className="subPrice">NT$8000</div>
          </div>
          <div className="freightBox d-flex justify-content-between j-publicFont">
            <div className="freight">運費</div>
            <div className="freightPrice">NT$8000</div>
          </div>
          <div className="totalPriceBox d-flex justify-content-between j-publicFont">
            <div className="total">總額</div>
            <div className="totalPrice">NT$8000</div>
          </div>
        </div>
        <div className="j-Checkout d-flex justify-content-center align-items-center align-self-stretch">
          <button className="btn text-alig-center">結帳</button>
        </div>
      </div>
    );
  }