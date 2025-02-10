import Link from "next/link"

export default function Breadcrumb() {
  return (
    <nav aria-label="breadcrumb" className="mt-3">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">首頁</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          最新消息
        </li>
      </ol>
    </nav>
  )
}