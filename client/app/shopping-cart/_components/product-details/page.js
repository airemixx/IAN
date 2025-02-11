
import "./product-details.scss"
export default function ProductDetails({ id, specs }) {
    return (
      <div className="collapse" id={`collapseExample${id}`}>
        <div className="accordion" id="accordionExample">
          {specs.map((spec, index) => (
            <div key={index} className="accordion-item j-accitem">
              <h2 className="accordion-header">
                <button
                  className="accordion-button j-accBtn collapsed focus-ring focus-ring-light"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#panelsStayOpen-collapse${index}`}
                >
                  {spec.title}
                </button>
              </h2>
              <div
                id={`panelsStayOpen-collapse${index}`}
                className="accordion-collapse collapse"
              >
                <div className="accordion-body j-accBody">
                  <div className="j-detialTypeContent d-flex flex-column j-publicFont">
                    {spec.details.map((detail, i) => (
                      <div key={i} className="d-flex justify-content-between">
                        <p className="mb-1">{detail.label}</p>
                        <p className="mb-1">{detail.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }