import styles from "./lession-item.module.scss";

export default function LessonItem({ lessionitem, page, length, id }) {
    const { image, name, price } = lessionitem;
    id = id - length
    function handleDeleteItem() {
        const confirmDelete = window.confirm("是否要從購物車刪除該商品？");
        if (confirmDelete) {
          // 取得 localStorage 中的購物車數據
          let cart = JSON.parse(localStorage.getItem("shoppingCart")) || {};
    
          delete cart[id]
          let updatedCart = Object.entries(cart).filter(v => v != null);// 過濾掉該商品
          updatedCart = updatedCart.map(v => v[1])
    
          console.log(updatedCart);
          localStorage.removeItem('shoppingCart')
          // // 轉回物件形式並更新 localStorage
          localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
    
          // 刷新頁面或通知父層更新購物車
          window.location.reload();
    
        }
    }
    return (
        <div className="d-flex flex-grow-1">
            <div className={`${styles['j-cartItemBox']} d-flex flex-grow-1 justify-content-center position-relative`}>
                <div className={"d-flex flex-column align-items-center"}>
                    <div className={`${styles['j-lessonImg']} mt-2 d-flex justify-content-center`}>
                        <img src={image} alt={name} className={`{${styles['j-lsImg']} object-fit-contain`} />
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <div>
                            <p className={`${styles['j-lsText']}`}>{name}</p>
                        </div>
                        <div>
                            <p className={`mt-2 ${styles['j-lsText']}`}>價格:{price}元</p>
                        </div>
                    </div>
                </div>
                {page ? <div className={`${styles['j-delBtn']} position-absolute`}>
                    <button className="btn" onClick={handleDeleteItem}>
                        ✕
                    </button>
                </div> : ''}
            </div>
        </div>

    );
}