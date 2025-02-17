import { useState } from 'react'
import { FaRegHeart, FaHeart } from 'react-icons/fa6'
import styles from '../course-info/course-info.module.scss'

export default function FavoriteButtonG({ className }) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev)
  }

  return (
    <button
      onClick={toggleFavorite}
      className={`${styles['favorite-btn']} hvr-icon-pulse ${className || ''}`}
    >
      {isFavorite ? (
        <FaHeart size={18} className={styles['favorite-icon']} />
      ) : (
        <FaRegHeart size={18} className={styles['favorite-icon']} />
      )}
      <p>收藏課程</p>
    </button>
  )
}
