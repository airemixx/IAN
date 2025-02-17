import styles from "./lession-item.module.scss";

export default function LessonItem({lessionitem}) {
    const { image, title, instructor, rating, price } = lessionitem;
    return (
        <div className="d-flex flex-grow-1">
            <div className={`${styles['j-cartItemBox']} d-flex flex-grow-1 justify-content-center`}>
                <div className={`${styles['shoppingLesson']} d-flex flex-column`}>
                    <div className={`${styles['j-lessonImg']} m-2`}>
                        <img src={image} alt={title} className={`{${styles['j-lsImg']} object-fit-contain`} />
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <div>
                            <p className={`${styles['j-lsText']}`}>{title}</p>
                        </div>
                        <div>
                            <p className={`${styles['j-lsText']}`}>{instructor}</p>
                        </div>
                        <div className="d-flex">
                            <div>
                                <p className={`${styles['j-lsText']}`}>{rating}</p>
                            </div>
                            <div className="me-3">
                                {/* Rating stars SVG */}
                            </div>
                            <div>
                                {/* Students count SVG */}
                            </div>
                        </div>
                        <div>
                            <p className={`${styles['j-lsText']}`}>{price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}