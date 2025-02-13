import { FaRegHeart, FaHeart } from 'react-icons/fa6'


export default function FavoriteButton({ isFavorite, toggleFavorite }) {
  return (
    <button onClick={toggleFavorite} className='e-favorite-icon'>
      {isFavorite ? (
        <FaHeart size={18} color="white" /> // ✅ 實心愛心
      ) : (
        <FaRegHeart size={18} color="white" /> // ✅ 空心愛心
      )}
    </button>
  )
}
