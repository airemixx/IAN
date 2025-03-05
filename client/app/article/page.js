'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.min.css'
import Breadcrumb from './_components/breadcrumb'
import LoopAd from './_components/loop-ad'
import SelectList from './_components/select-list'
import ListCard from './_components/list-card'
import Pagination from './_components/Pagination'
import '../../styles/article.css'
import useArticles from '../../hooks/use-article'
import Modal from './_components/add-article/Modal'
import MasonryLayouts from './_components/masonry-layouts'
import StickyCard from './_components/sticky-card'

export default function NewsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // 1. 先從 URL 參數中直接初始化 filters
  const initialFilters = {
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    tag: searchParams.get('tag') || '',
    user_id: searchParams.get('user_id') || '',
  }

  // 2. 使用這些初始值設置 filters 狀態
  const [filters, setFilters] = useState(initialFilters)

  // 3. 使用已初始化的 filters 獲取文章
  const { articles, error, loading } = useArticles(filters)
  const [searchTerm, setSearchTerm] = useState('')
  const [hasSearch, setHasSearch] = useState(false)

  // 分頁相關狀態
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // 每次 filters 改變時，重置 currentPage 為 1
    setCurrentPage(1)
  }, [filters])

  const itemsPerPage = 12
  const totalPages = articles ? Math.ceil(articles.length / itemsPerPage) : 1
  const paginatedArticles = articles
    ? articles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : []

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // 找到「所有文章」標題元素並滾動到該位置
    const titleElement = document.querySelector('.y-list-title h2')
    if (titleElement) {
      titleElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 當 URL 的 search 參數改變時，更新 filters
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    const categoryQuery = searchParams.get('category');
    const tagQuery = searchParams.get('tag');
    const userIdQuery = searchParams.get('user_id');
    const authorNameQuery = searchParams.get('author_name');
    const newFilters = {};

    const hasAnySearch = !!(searchQuery || categoryQuery || tagQuery || userIdQuery);
    setHasSearch(hasAnySearch);

    if (searchQuery) {
      newFilters.search = searchQuery;
    }
    if (categoryQuery) {
      newFilters.category = categoryQuery;
    }
    if (tagQuery) {
      newFilters.search = tagQuery;
      setSearchTerm(tagQuery);
    }
    if (userIdQuery) {
      newFilters.user_id = userIdQuery;
      newFilters.author_name = authorNameQuery || '作者';
    }
    setFilters(newFilters);
    setCurrentPage(1);
  }, [searchParams]); // 確保 searchParams 是依賴項

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1) // 重置分頁到第一頁
    // 更新 URL 參數
    const params = new URLSearchParams(searchParams)
    for (const key in newFilters) {
      if (newFilters[key]) {
        params.set(key, newFilters[key])
      } else {
        params.delete(key)
      }
    }
    router.push(`/article?${params.toString()}`)
  }

  const handleTagClick = (tag) => {
    handleFilterChange({ ...filters, search: tag })
    setSearchTerm(tag)
  }

  // 搜尋功能：處理搜尋框的輸入與提交
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    handleFilterChange({ ...filters, search: searchTerm })
  }

  const handleAuthorClick = (userId, authorName) => {
    const params = new URLSearchParams();
    params.set('user_id', userId);
    params.set('author_name', authorName);
    // 清除其他搜尋條件
    router.push(`/article?${params.toString()}`);
    setFilters({ user_id: userId, author_name: authorName });
    setSearchTerm('');
  };

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')

    const filterCollapse = document.querySelector('#filter-collapse')
    const toggleButtonIcon = document.querySelector('[data-bs-target="#filter-collapse"] i')
    const clearOptionsBtn = document.querySelector('#y-clear-options-btn')

    if (filterCollapse && toggleButtonIcon) {
      const handleShow = () =>
        toggleButtonIcon.classList.replace('fa-angle-down', 'fa-angle-up')
      const handleHide = () =>
        toggleButtonIcon.classList.replace('fa-angle-up', 'fa-angle-down')

      filterCollapse.addEventListener('show.bs.collapse', handleShow)
      filterCollapse.addEventListener('hide.bs.collapse', handleHide)

      return () => {
        filterCollapse.removeEventListener('show.bs.collapse', handleShow)
        filterCollapse.removeEventListener('hide.bs.collapse', handleHide)
      }
    }

    if (clearOptionsBtn) {
      const handleClear = () => {
        document.querySelectorAll('select').forEach((select) => {
          select.selectedIndex = 0
        })
      }
      clearOptionsBtn.addEventListener('click', handleClear)
      return () => clearOptionsBtn.removeEventListener('click', handleClear)
    }
  }, [])

  return (
    <div className='bg-list'>
      <Breadcrumb />
      {/* 只在沒有搜尋條件時顯示 */}
      {!hasSearch && (
        <>
          <div className="my-sm-5 y-list-title y-container d-flex justify-content-between">
            <h1>最新消息 News</h1>
          </div>
          <div className="bg-use">
            <div className="page-container d-flex justify-content-between">
              <StickyCard className="Sticky-Card" />
              <MasonryLayouts />
            </div>
          </div>
        </>
      )}

      <section className="y-container">
        {/* 搜尋表單 */}
        <SelectList onFilterChange={(newFilters) => setFilters(newFilters)} />

        {/* 卡片區 */}
        <div className="row">
          {paginatedArticles.map((article) => (
            <div key={article.id} className="col-12 col-md-6 col-lg-3">
              <ListCard
                article={article}
                onTagClick={handleTagClick}
                onAuthorClick={handleAuthorClick}  // 新增此 prop
                searchTerm={searchTerm}
              />
            </div>
          ))}
        </div>

        {/* 分頁區 */}
        <div className="d-flex justify-content-center mb-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </section>
    </div>
  )
}