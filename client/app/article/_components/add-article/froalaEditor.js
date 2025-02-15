'use client'

import React, { useEffect, useRef } from 'react'
import FroalaEditor from 'froala-editor'
import 'froala-editor/js/languages/zh_tw.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/js/plugins.pkgd.min.js'
import styles from './AddArticleModal.module.scss'

export default function FroalaEditorWrapper() {
  const editorRef = useRef(null)

  useEffect(() => {
    const loadFroalaEditor = () => {
      if (editorRef.current) {
        window.editorInstance = new FroalaEditor(editorRef.current, {
          language: 'zh_tw',
          toolbarButtons: {
            moreText: {
              buttons: [
                'bold',
                'italic',
                'underline',
                'strikeThrough',
                'subscript',
                'superscript',
                'fontFamily',
                'fontSize',
                'textColor',
                'backgroundColor',
                'inlineClass',
                'inlineStyle',
                'clearFormatting',
              ],
            },
            moreParagraph: {
              buttons: [
                'alignLeft',
                'alignCenter',
                'alignRight',
                'alignJustify',
                'formatOL',
                'formatUL',
                'paragraphFormat',
                'paragraphStyle',
                'lineHeight',
                'outdent',
                'indent',
                'quote',
              ],
            },
            moreRich: {
              buttons: [
                'insertLink',
                'insertImage',
                'insertVideo',
                'insertTable',
                'emoticons',
                'fontAwesome',
                'specialCharacters',
                'embedly',
                'insertFile',
                'insertHR',
              ],
            },
            moreMisc: {
              buttons: ['undo', 'redo', 'fullscreen', 'html', 'help'],
            },
          },
          pluginsEnabled: null, // 確保所有插件都啟用
          events: {
            contentChanged: function () {
              if (window.updateButtonState) {
                window.updateButtonState()
              }
            },
            'image.beforeUpload': function (files) {
              // 自定義圖片上傳邏輯
              console.log('圖片上傳前', files)
              // 允許圖片上傳
              return true
            },
            'video.beforeUpload': function (files) {
              // 自定義影片上傳邏輯
              console.log('視頻上傳前', files)
              // 允許影片上傳
              return true
            },
            'file.beforeUpload': function (files) {
              // 自定義文件上傳邏輯
              console.log('文件上傳前', files)
              // 允許文件上傳
              return true
            },
          },
          // 調整 z-index 以確保插入連結彈出框顯示在最上層
          zIndex: 1050,
        })
      }
    }

    loadFroalaEditor()

    return () => {
      if (window.editorInstance) {
        window.editorInstance.destroy()
      }
    }
  }, [])

  return (
    <>
      <p>
        文章內容 <span className={`mx-1 ${styles['red-sign']}`}>*</span> :
      </p>
      <div id="example" ref={editorRef}></div>
    </>
  )
}
