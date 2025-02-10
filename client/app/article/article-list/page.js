import Breadcrumb from '@/components/Breadcrumb'
import Hero from '@/components/Hero'
import ArticleList from '@/components/ArticleList'
import Pagination from '@/components/Pagination'

export default function ArticleListPage() {
  return (
    <main className="container mx-auto px-4">
      <Breadcrumb />
      <h1 className="text-4xl font-bold my-8">最新消息 News</h1>
      <Hero />
      <ArticleList />
      <Pagination />
    </main>
  )
}