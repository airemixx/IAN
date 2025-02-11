'use client'  

import React, { useEffect, useState } from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';  
import styles from './index.module.scss';  

const categories = [  
  { value: "", label: "全部類別" },  
  { value: "option1", label: "選項 1" },  
  { value: "option2", label: "選項 2" },  
  { value: "option3", label: "選項 3" },  
];  

const years = [  
  { value: '', label: '年份' },  
  { value: '2024', label: '2024' },  
  { value: '2023', label: '2023' },  
  { value: '2022', label: '2022' },  
];  

const months = [  
  { value: '', label: '月份' },  
  { value: '01', label: '01' },  
  { value: '02', label: '02' },  
  { value: '03', label: '03' },  
  { value: '04', label: '04' },  
  { value: '05', label: '05' },  
  { value: '06', label: '06' },  
  { value: '07', label: '07' },  
  { value: '08', label: '08' },  
  { value: '09', label: '09' },  
  { value: '10', label: '10' },  
  { value: '11', label: '11' },  
  { value: '12', label: '12' },  
];  

export default function SelectList() {  
  const [isCollapsed, setIsCollapsed] = useState(true);  

  useEffect(() => {  
    const filterCollapse = document.getElementById('filter-collapse');  

    if (filterCollapse) {  
      const handleShow = () => setIsCollapsed(false);  
      const handleHide = () => setIsCollapsed(true);  

      filterCollapse.addEventListener('show.bs.collapse', handleShow);  
      filterCollapse.addEventListener('hide.bs.collapse', handleHide);  

      return () => {  
        filterCollapse.removeEventListener('show.bs.collapse', handleShow);  
        filterCollapse.removeEventListener('hide.bs.collapse', handleHide);  
      };  
    }  
  }, []);  

  const renderSelect = (id, options, title) => (  
    <select id={id} className="form-select select04 me-sm-2" title={title}>  
      {options.map((option) => (  
        <option key={option.value} value={option.value}>  
          {option.label}  
        </option>  
      ))}  
    </select>  
  );  

  return (  
    <>  
      <div className={`my-sm-5 ${styles['y-list-title']} d-flex justify-content-between align-items-center`}>  
        <h2 className="mb-0">文章列表</h2>  
        <button  
          className="mb-0 btn rounded-pill"  
          type="button"  
          data-bs-toggle="collapse"  
          data-bs-target="#filter-collapse"  
          aria-expanded={!isCollapsed}  
          aria-controls="filter-collapse"  
        >  
          篩選條件  
          <FontAwesomeIcon icon={isCollapsed ? faAngleDown : faAngleUp} className="ms-1" style={{ fontSize: '20px', color: 'black' }} />  
        </button>  
      </div>  

      <div className="mb-4 collapse" id="filter-collapse">  
        <div className="d-flex justify-content-between y-selection">  
          <div className={`d-flex justify-content-start ${styles['y-collapse-area']}`}>  
            {renderSelect('select-category', categories, 'Select Category')}  
            {renderSelect('select-year', years, 'Select Year')}  
            {renderSelect('select-month', months, 'Select Month')}  
          </div>  
          <div className={styles['y-clear-option']}>  
            <button  
              id="y-clear-options-btn"  
              className="btn btn-link"  
              onClick={() => {  
                document.querySelectorAll('select').forEach((select) => {  
                  select.selectedIndex = 0;  
                });  
              }}  
            >  
              清除選項  
            </button>  
          </div>  
        </div>  
      </div>  
    </>  
  );  
}  