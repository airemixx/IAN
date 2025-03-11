'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// 滑動選單元件
export default function MenuToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const pathname = usePathname()

  // 點擊外部關閉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // 選單項目
  const menuItems = [
    { text: '首頁', path: '/' },
    { text: '產品系列', path: '/product' },
    { text: '租借服務', path: '/rental' },
    { text: '影像學院', path: '/courses' },
    { text: '影像誌', path: '/article' },
    { text: '聯絡我們', path: '#' },
  ]

  // 選單動畫變量
  const sidebarVariants = {
    open: {
      clipPath: `circle(1500px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    },
    closed: {
      clipPath: "circle(30px at 40px 40px)",
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  }

  const navVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  }

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  }

  return (
    <div ref={containerRef} className="menu-icon">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          outline: "none",
          border: "none",
          cursor: "pointer",
          background: "transparent",
          padding: 0,
        }}
      >
        <svg width="23" height="23" viewBox="0 0 23 23">
          <motion.path
            fill="transparent"
            strokeWidth="3"
            stroke="white"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
            animate={isOpen ? "open" : "closed"}
          />
          <motion.path
            fill="transparent"
            strokeWidth="3"
            stroke="white"
            strokeLinecap="round"
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.1 }}
          />
          <motion.path
            fill="transparent"
            strokeWidth="3"
            stroke="white"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
            animate={isOpen ? "open" : "closed"}
          />
        </svg>
      </button>

      {/* 側邊滑出選單 */}
      <motion.div 
        className="sidebar-menu"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '300px',
          zIndex: 999,
          display: isOpen ? 'block' : 'none'
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '100%',
            backgroundColor: '#f5f5f5',
          }}
          variants={sidebarVariants}
        />

        <motion.ul
          variants={navVariants}
          style={{
            position: 'absolute',
            top: 0,
            padding: '80px 25px 25px',
            width: '100%',
            listStyle: 'none',
          }}
        >
          {menuItems.map((item, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              whileTap={{ scale: 0.95 }}
              style={{
                cursor: 'pointer',
                margin: '15px 0',
                padding: '10px 0',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
              }}
              onClick={() => setIsOpen(false)}
            >
              <Link 
                href={item.path}
                style={{
                  color: pathname === item.path ? '#ff1493' : '#333',
                  fontWeight: pathname === item.path ? 'bold' : 'normal',
                  textDecoration: 'none',
                  fontSize: '18px',
                  display: 'block',
                }}
              >
                {item.text}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  )
}