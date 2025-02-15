import styles from "./lession-item.module.scss";

export default function LessonItem({lessionitem}) {
    const { image, title, instructor, rating, price } = lessionitem;
    return (
        <div className="d-flex flex-grow-1">
            <div className={`${styles['j-cartItemBox']}  mb-2 d-flex flex-grow-1 justify-content-center`}>
                <div className={`${styles['shoppingLesson']} d-flex flex-column`}>
                    <div className={`${styles['j-lessonImg']} m-2`}>
                        <img src={image} alt={title} className="object-fit-contain" />
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <div>
                            <p>{title}</p>
                        </div>
                        <div>
                            <p>{instructor}</p>
                        </div>
                        <div className="d-flex">
                            <div>
                                <p>{rating}</p>
                            </div>
                            <div className="me-3">
                                {/* Rating stars SVG */}
                            </div>
                            <div>
                                {/* Students count SVG */}
                            </div>
                        </div>
                        <div>
                            <p>{price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}