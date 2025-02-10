import Image from "next/image"
import Link from "next/link"

interface ArticleProps {
  article: {
    id: number
    category: string
    title: string
    author: string
    date: string
    image: string
  }
}

export default function ArticleCard({ article }: ArticleProps) {
  return (
    <div className="card h-100">
      <Image
        src={article.image || "/placeholder.svg"}
        alt={article.title}
        width={300}
        height={200}
        className="card-img-top"
        style={{ objectFit: "cover", height: "200px" }}
      />
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <small className="text-muted">{article.category}</small>
        </div>
        <Link href={`/article/${article.id}`} className="text-decoration-none">
          <h5 className="card-title">{article.title}</h5>
        </Link>
        <div className="d-flex align-items-center mt-2">
          <Image
            src="/LENSTUDIO/images/HomePage-images/user (1).jpg"
            alt={article.author}
            width={35}
            height={35}
            className="rounded-circle me-2"
          />
          <small className="text-muted">{article.author}</small>
        </div>
        <small className="text-muted d-block mt-1">{article.date}</small>
      </div>
    </div>
  )
}