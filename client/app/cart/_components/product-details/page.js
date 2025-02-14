import style from "./product-details.module.scss";

export default function ProductDetails({ id, specs }) {
    return (
        <div className="collapse" id={`collapseExample${id}`}>
            <div className="accordion" id="accordionExample">
                {specs.map((spec, index) => (
                    <div key={index} className={`accordion-item ${style['j-accitem']}`}>
                        <h2 className="accordion-header">
                            <button
                                className={`accordion-button ${style['j-accBtn']} collapsed focus-ring focus-ring-light`}
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
                            <div className={`accordion-body ${style['j-accBody']}`}>
                                <div className={`${style['j-detialTypeContent']} d-flex flex-column ${style['j-publicFont']}`}>
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