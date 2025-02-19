'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import BreadcrumbDetail from './_components/breadcrumb-detail'
import TitleShareFontSize from './_components/title-share-fontSize'
import Content from './_components/content'
import Aside from './_components/aside'
import TagLikeShareBtn from './_components/tag-like-share-btn'
import ReplyInput from './_components/reply-input'
import Recommends from './_components/recommends'
import CommentsArea from './_components/comments-area'
import Link from 'next/link'

function getFontSize(size) {
  switch (size) {
    case 'small':
      return '14px'
    case 'medium':
      return '16px'
    case 'large':
      return '18px'
    default:
      return '16px'
  }
}

export default function ArticleDetail() {
  // ...其他 state 與 useEffect 程式碼保持不變
  const { id } = useParams()
  const [fontSize, setFontSize] = useState('medium')
  const [categoryName, setCategoryName] = useState('')
  const [articleTitle, setArticleTitle] = useState('')
  const [articleSubTitle, setArticleSubTitle] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [imagePath, setImagePath] = useState('')
  const [articleContent, setArticleContent] = useState('<p>載入中...</p>')
  const [article, setArticle] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [tags, setTags] = useState([])

  const changeFontSize = (size) => {
    setFontSize(size)
  }

  useEffect(() => {
    changeFontSize('medium')
    fetch(`http://localhost:8000/api/articles/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`)
        }
        return res.json()
      })
      .then((response) => {
        console.log('Article response:', response)
        if (response.data && response.data.title) {
          setArticle(response.data)
          setArticleTitle(response.data.title)
          setArticleSubTitle(response.data.subtitle || '')
          setCreatedAt(response.data.created_at)
          setImagePath(response.data.image_path)
          setArticleContent(response.data.content)
          setCategoryId(response.data.category_id)
          setTags(response.data.tags)

          return fetch(`http://localhost:8000/api/articles/categories`)
            .then((res) => {
              if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.status}`)
              }
              return res.json()
            })
            .then((categoriesResponse) => {
              console.log('Categories response:', categoriesResponse)
              const category = categoriesResponse.data.find(
                (cat) => cat.id === response.data.category_id
              )
              if (category) {
                setCategoryName(category.name)
              }
            })
        } else {
          console.error('Article data structure is incorrect:', response)
          throw new Error('Article data structure is incorrect')
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err)
      })
  }, [id])

  return (
    <div className="bg-light headerPadding">
      <div className="d-flex flex-column min-vh-100 text-dark bg-light y-container">
        <section className="y-container title-main-img">
          {article && (
            <BreadcrumbDetail
              categoryName={categoryName}
              articleTitle={article.title}
              category_id={categoryId}
            />
          )}
          <TitleShareFontSize
            categoryName={categoryName}
            articleTitle={articleTitle}
            articleSubTitle={articleSubTitle}
            createdAt={createdAt}
            imagePath={imagePath}
          />
        </section>

        <div className="d-flex justify-content-between">
          <article className="y-article-content">
            <Content
              content={articleContent}
              fontSize={getFontSize(fontSize)}
            />
            <TagLikeShareBtn articleId={id} />
            <ReplyInput articleId={id} parentId={null} />
            <CommentsArea articleId={id} />
          </article>
          <Aside
            categoryId={categoryId}
            tags={tags}
            title={articleTitle}
            content={articleContent}
          />
        </div>
      </div>
      <Recommends />
    </div>
  )
}