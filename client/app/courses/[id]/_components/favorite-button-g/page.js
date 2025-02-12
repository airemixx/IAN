import { FaRegHeart, FaHeart } from 'react-icons/fa6'
import styles from '../course-info/course-info.module.scss'

export default function FavoriteButtonG({ isFavorite, toggleFavorite }) {
  return (
    <button
      onClick={toggleFavorite}
      className={`${styles['favorite-btn']} hvr-icon-pulse`}
    >
      {isFavorite ? (
        <FaHeart size={18} className={styles['favorite-icon']} /> // ✅ 實心愛心
      ) : (
        <FaRegHeart size={18} className={styles['favorite-icon']} /> // ✅ 空心愛心
      )}
      <p>收藏課程</p>
    </button>
  )
}
