"use client"  
import React, { useEffect, useRef, useCallback } from 'react'  
import dynamic from 'next/dynamic'  
import 'bootstrap/dist/css/bootstrap.min.css'  
import styles from './AddArticleModal.module.scss'  
import BackSelectTitle from './back-select-title'  
import ImageUpdate from './imageUpdate'  
import HashtagInput from './hashtag-input'  
import ButtonGroup from './ButtonGroup'  

const FroalaEditor = dynamic(() => import('./froalaEditor'), { ssr: false })  

export default function AddArticleModal() {  
  const modalRef = useRef(null)  
  const bsModal = useRef(null)  

  const confirmClose = useCallback(() => {  
    if (bsModal.current) {  
      bsModal.current.hide()  
    }  
  }, [])  

  useEffect(() => {  
    if (typeof window === 'undefined') return  
    
    import('bootstrap/js/dist/modal').then(({ default: Modal }) => {  
      bsModal.current =  
        Modal.getInstance(modalRef.current) ||  
        new Modal(modalRef.current, {  
          backdrop: 'static',  
          keyboard: false  
        })  

      const modalEl = modalRef.current  

      const handleModalShown = () => {  
        const modalAddButton = modalEl.querySelector('.y-btn-add')  
        if (modalAddButton) modalAddButton.disabled = true  

        const categorySelect = document.querySelector('select[name="文章分類"]')  
        const titleInput = document.querySelector(  
          'input[placeholder="標題 (必填)"]'  
        )  
        const imageUpload = document.querySelector('#imageUpload')  
        const imagePath = document.querySelector('#imagePath')  
        const editorDiv = document.querySelector('#example')  
        const editorInstance = window.editorInstance  

        if (  
          !modalAddButton ||  
          !categorySelect ||  
          !titleInput ||  
          !editorDiv ||  
          !editorInstance  
        ) return  

        const checkRequiredFields = () => {  
          let allFilled = true  

          if (categorySelect.value === '0') {  
            categorySelect.style.border = '1px solid red'  
            allFilled = false  
          } else {  
            categorySelect.style.border = ''  
          }  

          if (!titleInput.value.trim()) {  
            titleInput.style.border = '1px solid red'  
            allFilled = false  
          } else {  
            titleInput.style.border = ''  
          }  

          const imageSourceLocal = document.querySelector('#imageSourceLocal')  
          if (imageSourceLocal && imageSourceLocal.checked) {  
            if (!imageUpload || !imageUpload.files || imageUpload.files.length === 0) {  
              if (imageUpload) imageUpload.style.border = '1px solid red'  
              allFilled = false  
            } else {  
              if (imageUpload) imageUpload.style.border = ''  
            }  
          } else {  
            if (!imagePath || !imagePath.value.trim()) {  
              if (imagePath) imagePath.style.border = '1px solid red'  
              allFilled = false  
            } else {  
              if (imagePath) imagePath.style.border = ''  
            }  
          }  

          const content = editorInstance.html.get()  
          if (!content.trim() || content.trim() === '<p><br></p>') {  
            if (editorDiv) editorDiv.style.border = '1px solid red'  
            allFilled = false  
          } else {  
            if (editorDiv) editorDiv.style.border = ''  
          }  

          return allFilled  
        }  

        const updateButtonState = () => {  
          if (checkRequiredFields()) {  
            modalAddButton.classList.remove('disabled')  
            modalAddButton.disabled = false  
          } else {  
            modalAddButton.classList.add('disabled')  
            modalAddButton.disabled = true  
          }  
        }  

        window.updateButtonState = updateButtonState  
        updateButtonState()  

        categorySelect.addEventListener('change', updateButtonState)  
        titleInput.addEventListener('input', updateButtonState)  
        if (imageUpload) imageUpload.addEventListener('change', updateButtonState)  
        if (imagePath) imagePath.addEventListener('input', updateButtonState)  
        const imageSourceLocalRadio = document.querySelector('#imageSourceLocal')  
        const imageSourcePathRadio = document.querySelector('#imageSourcePath')  
        if (imageSourceLocalRadio) imageSourceLocalRadio.addEventListener('change', updateButtonState)  
        if (imageSourcePathRadio) imageSourcePathRadio.addEventListener('change', updateButtonState)  

        const intervalId = setInterval(updateButtonState, 100)  

        modalEl.addEventListener('hidden.bs.modal', () => {  
          clearInterval(intervalId)  
        })  
      }  

      modalEl.addEventListener('shown.bs.modal', handleModalShown)  
      return () => {  
        modalEl.removeEventListener('shown.bs.modal', handleModalShown)  
      }  
    })  
  }, [])  

  return (  
    <>  
      <button  
        type="button"  
        className={`btn ${styles['add-article-btn']} mt-5`}  
        onClick={() => {  
          if (bsModal.current) {  
            bsModal.current.show()  
          }  
        }}  
      >  
        <i className="fa-solid fa-plus me-1"></i>新增文章  
      </button>  
      <div  
        ref={modalRef}  
        className="modal fade"  
        id="addArticleModal"  
        tabIndex="-1"  
        aria-labelledby="addArticleModalLabel"  
        aria-hidden="true"  
      >  
        <div className="modal-dialog modal-dialog-centered modal-xl">  
          <div className={`modal-content ${styles['modal-content']}`}>  
            <div className="modal-body">  
              <div className="container">  
                <BackSelectTitle confirmClose={confirmClose} />  
                <ImageUpdate />  
                <FroalaEditor />  
                <HashtagInput />  
                <ButtonGroup confirmClose={confirmClose} />  
              </div>  
            </div>  
          </div>  
        </div>  
      </div>  
    </>  
  )  
}