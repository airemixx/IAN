'use client'
import Link from 'next/link'
import styles from './user.module.scss'
import React, { useState, useEffect } from 'react'
import useAuth from '@/hooks/use-auth'
import Sidenav from './_components/Sidenav/page'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function UserPage(props) {
  const { token, user = {}, loading, setUser, setToken } = useAuth()
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [password, setPassword] = useState('')
  const [updating, setUpdating] = useState(false)
  const MySwal = withReactContent(Swal);
  const [addresses, setAddresses] = useState([]); // 存所有住址
  const [latestAddress, setLatestAddress] = useState(''); // 記錄資料庫中的最新地址
  


  useEffect(() => {
    console.log("📌 useEffect 內 user:", user); // ✅ 檢查 user 內容

    if (user && Object.keys(user).length > 0) {
      setName(user.name || '');

      let birthdayFormatted = "";
      if (user.birthday) {
        console.log("📌 原始 user.birthday:", user.birthday, "類型:", typeof user.birthday);

        if (typeof user.birthday === "string") {
          // 可能是 "2025-02-04T16:00:00.000Z" 或 "2025-02-04"
          birthdayFormatted = user.birthday.includes("T")
            ? user.birthday.split("T")[0]
            : user.birthday;
        } else if (user.birthday instanceof Date) {
          // 可能是 Date 物件
          birthdayFormatted = user.birthday.toISOString().split("T")[0];
        } else {
          // 嘗試轉換為 Date
          try {
            birthdayFormatted = new Date(user.birthday).toISOString().split("T")[0];
          } catch (error) {
            console.error("❌ 無法解析 birthday:", user.birthday, error);
            birthdayFormatted = "";
          }
        }
      }

      console.log("📌 格式化後的 birthday:", birthdayFormatted);
      setBirthday(birthdayFormatted);
    }
  }, [user]); // ✅ 當 `user` 變更時，`name` 和 `birthday` 才會更新


   // **初始載入時獲取資料**
   useEffect(() => {
    if (token) {
      fetchAddresses();
    }
  }, [token]); 


  if (loading) {
    return <div className="text-center mt-5">載入中...</div>
  }

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.status !== 'success') throw new Error(result.message);

      console.log("📌 取得的 user 資料:", result.data);

      // 🔥 **步驟 1：如果後端有提供新 Token，就更新**
      if (result.token) {
        console.log("✅ 從 API 取得新 Token:", result.token);
        localStorage.setItem("loginWithToken", result.token);
        setToken(result.token);
      }

      // 🔥 **步驟 2：更新使用者資訊**
      setUser(prevUser => ({
        ...prevUser,
        ...result.data,
        birthday: result.data.birthday
          ? result.data.birthday.split("T")[0]  // 確保 `YYYY-MM-DD`
          : ''
      }));
    } catch (error) {
      console.error('❌ 取得最新資料失敗:', error);
    }
  };


  //上傳圖片函式
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("account", user.account); // 傳遞帳號，讓後端知道要更新誰

    try {
      const response = await fetch("http://localhost:8000/api/users/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.status !== "success") throw new Error(result.message);

      // ✅ 更新 user.head，讓前端立即顯示新頭像
      setUser({ ...user, head: result.imageUrl });
    } catch (error) {
      console.error("圖片上傳失敗:", error);
      alert("圖片上傳失敗，請稍後再試");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${user.account}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            password: password || undefined,
            birthday: birthday
              ? (typeof birthday === "string"
                ? birthday.split("T")[0]
                : new Date(birthday).toISOString().split("T")[0])
              : '',
            head: user.head,
          }),
        }
      );

      const result = await response.json();
      console.log("📌 更新 API 回應:", result);

      if (result.status !== 'success') throw new Error(result.message);

      alert("更新成功！");

      // 🔥 **步驟 1：檢查後端是否提供新的 Token**
      if (result.token) {
        console.log("✅ 從 API 取得新 Token:", result.token);

        // **更新 localStorage & useAuth 狀態**
        localStorage.setItem("loginWithToken", result.token);
        setToken(result.token);
      }

      // 🔥 **步驟 2：重新獲取使用者資訊**
      await fetchUserData();

      // 🔥 **步驟 3：導向 `/user` 頁面**
      window.location.href = "/user";
    } catch (error) {
      console.error("❌ 更新失敗:", error);
      alert("更新失敗，請稍後再試");
    } finally {
      setUpdating(false);
    }
  };

  //address

  // **函式: 獲取最新的住址**
  // **獲取所有住址**
  const fetchAddresses = async () => {
    if (!token) {
      Swal.fire('錯誤', '請先登入', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/users/addresses/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.status === 'success' && result.data) {
        setAddresses(result.data); // ✅ 更新地址清單
      } else {
        setAddresses([]); // ✅ 沒有住址，設為空陣列
      }
    } catch (error) {
      console.error("❌ 獲取住址失敗:", error);
      setAddresses([]);
    }
  };



  // **函式: 添加住址**
  const handleAddAddress = async () => {
    // **先獲取最新的住址**
    await fetchAddresses();

    // **顯示 Swal 彈窗，並預填最新住址**

     // ✅ 創建一個函式來渲染住址列表
  const renderAddressList = () => {
    if (addresses.length === 0) {
      return '<p class="text-muted">尚未填寫住址</p>'
    }

    return `
      <ul id="swal-address-list" style="text-align: left; max-height: 200px; overflow-y: auto; padding: 0; list-style: none;">
        ${addresses.map(address => 
          `<li style="margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
            📍 ${address.address}
            <div>
              <button class="edit-btn" data-id="${address.id}" style="margin-right: 5px; background: #ffc107; border: none; padding: 3px 8px; cursor: pointer;">✏️</button>
              <button class="delete-btn" data-id="${address.id}" style="background: #dc3545; border: none; padding: 3px 8px; cursor: pointer;">🗑</button>
            </div>
          </li>`
        ).join('')}
      </ul>`
  }

  // ✅ 顯示 Swal 彈窗，包含住址列表和輸入框
  const { value: address } = await MySwal.fire({
    title: '管理住址',
    html: `
      <div>
        <strong>您的住址清單:</strong>
        ${renderAddressList()}
      </div>
      <input id="swal-input" class="swal2-input" style="border-radius: 10px;" width="100%;" placeholder="請輸入新住址...">
    `,
    showCancelButton: true,
    confirmButtonText: '新增',
    cancelButtonText: '關閉',
    didOpen: () => {
      // ✅ 綁定「編輯」按鈕
      document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
          const addressId = e.target.dataset.id
          const currentAddress = addresses.find(a => a.id == addressId)?.address || ''

          const { value: newAddress } = await MySwal.fire({
            title: '編輯住址',
            input: 'text',
            inputValue: currentAddress,
            showCancelButton: true,
            confirmButtonText: '更新',
            cancelButtonText: '取消',
            inputValidator: (value) => {
              if (!value) return '住址不能為空'
            },
          })

          if (newAddress && newAddress !== currentAddress) {
            try {
              const response = await fetch(`http://localhost:8000/api/users/addresses/${addressId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ address: newAddress }),
              })

              const result = await response.json()

              if (result.status === 'success') {
                Swal.fire('成功', '住址已更新', 'success')
                fetchAddresses() // ✅ 刷新住址列表
              } else {
                Swal.fire('錯誤', result.message || '無法更新住址', 'error')
              }
            } catch (error) {
              Swal.fire('錯誤', '伺服器錯誤，請稍後再試', 'error')
            }
          }
        })
      })

      // ✅ 綁定「刪除」按鈕
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
          const addressId = e.target.dataset.id

          const { isConfirmed } = await MySwal.fire({
            title: '確認刪除',
            text: '您確定要刪除此住址嗎？',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '刪除',
            cancelButtonText: '取消',
          })

          if (isConfirmed) {
            try {
              const response = await fetch(`http://localhost:8000/api/users/addresses/${addressId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
              })

              const result = await response.json()

              if (result.status === 'success') {
                Swal.fire('成功', '住址已刪除', 'success')
                fetchAddresses() // ✅ 刷新住址列表
              } else {
                Swal.fire('錯誤', result.message || '無法刪除住址', 'error')
              }
            } catch (error) {
              Swal.fire('錯誤', '伺服器錯誤，請稍後再試', 'error')
            }
          }
        })
      })
    },
    preConfirm: () => {
      const inputValue = document.getElementById('swal-input').value
      if (!inputValue) {
        Swal.showValidationMessage('住址不能為空')
      }
      return inputValue
    }
  })


    // 舊的swal 先暫劉
    // const { value: address } = await MySwal.fire({
    //   title: '添加新住址',
    //   input: 'text',
    //   inputValue: latestAddress, // ✅ 從資料庫填充最新住址
    //   inputPlaceholder: '請輸入住址...',
    //   showCancelButton: true,
    //   confirmButtonText: '添加',
    //   cancelButtonText: '取消',
    //   inputValidator: (value) => {
    //     if (!value) {
    //       return '住址不能為空';
    //     }
    //   },
    // });

    // **處理地址提交**
    if (address) {
      try {
        const token = localStorage.getItem("loginWithToken");
        if (!token) {
          return Swal.fire('錯誤', '請先登入再添加住址', 'error');
        }

        const response = await fetch('http://localhost:8000/api/users/addresses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ address }),
        });

        const result = await response.json();

        if (result.status === 'success') {
          setAddresses((prevAddresses) => [...prevAddresses, result.data]); // ✅ **直接更新狀態**
        Swal.fire('成功', '住址已添加', 'success');
      } else {
        Swal.fire('錯誤', result.message || '無法添加住址', 'error');
        }
      } catch (error) {
        Swal.fire('錯誤', '伺服器錯誤，請稍後再試', 'error');
      }
    }
  };

  const handleEditAddress = async (addressId, currentAddress) => {
    const { value: newAddress } = await MySwal.fire({
      title: '編輯住址',
      input: 'text',
      inputValue: currentAddress,
      showCancelButton: true,
      confirmButtonText: '更新',
      cancelButtonText: '取消',
      inputValidator: (value) => {
        if (!value) {
          return '住址不能為空';
        }
      },
    });

    if (newAddress && newAddress !== currentAddress) {
      try {
        const response = await fetch(`http://localhost:8000/api/users/addresses/${addressId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ address: newAddress }),
        });

        const result = await response.json();

        if (result.status === 'success') {
          Swal.fire('成功', '住址已更新', 'success');
        } else {
          Swal.fire('錯誤', result.message || '無法更新住址', 'error');
        }
      } catch (error) {
        Swal.fire('錯誤', '伺服器錯誤，請稍後再試', 'error');
      }
    }
  };

  const handleDeleteAddress = async (addressId) => {
    const { isConfirmed } = await MySwal.fire({
      title: '確認刪除',
      text: '您確定要刪除此住址嗎？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '刪除',
      cancelButtonText: '取消',
    });

    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8000/api/users/addresses/${addressId}`, {
          method: 'DELETE',
        });

        const result = await response.json();

        if (result.status === 'success') {
          Swal.fire('成功', '住址已刪除', 'success');
        } else {
          Swal.fire('錯誤', result.message || '無法刪除住址', 'error');
        }
      } catch (error) {
        Swal.fire('錯誤', '伺服器錯誤，請稍後再試', 'error');
      }
    }
  };

  const AddressList = () => {
    const [addresses, setAddresses] = React.useState([]);

    // 初始取得地址列表
    React.useEffect(() => {
      const fetchAddresses = async () => {
        const response = await fetch('http://localhost:8000/api/users/addresses');
        const result = await response.json();
        if (result.status === 'success') {
          setAddresses(result.data);
        }
      };

      fetchAddresses();
    }, []);
  }

  return (
    <div>
      <div className={`container py-4`}>
        <div className={`row ${styles.marginTop}`}>
          <Sidenav />

          {/* 主要內容區 */}
          <div className="col-md-9">
            <div className="mb-4">
              <h1>會員資料修改</h1>
              <p className="text-muted">
                在此部分中，您可以尋找和編輯您的個人檔案和地址。您還可以管理您的相機電子報訂閱和更改密碼。
              </p>
            </div>

            {/* 橫幅區域 */}
            <div
              className={`${styles.heroSection} mb-4 p-4 d-flex flex-column justify-content-center`}
            >
              <h6 className="text-black ms-3">獲取相機最新消息</h6>
              <Link href="/article"><button className={styles.customBtn}>立即前往</button></Link>
            </div>

            {/* 表單區域 */}
            <div className="row">
              {/* 個人資料表單 */}
              <div className="col-lg-7 mb-4">
                <div className={styles.customCard}>
                  <form onSubmit={handleUpdate}>
                    <div className="d-flex flex-column align-items-center ">
                      <div className="avatar-container mb-3">
                        <img
                          id="avatar"
                          src={user.head ? user.head : "/uploads/users.webp"} // ✅ 使用相對路徑
                          alt="大頭貼"
                          className={styles.avatar}
                        />
                      </div>
                      <div className="mb-3 ">
                        <input
                          type="file"
                          id="fileInput"
                          className="fileInput"
                          accept="image/*"
                          onChange={handleImageUpload} // ✅ 綁定上傳函式
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">電郵地址</label>
                      <input
                        type="email"
                        className={`form-control ${styles.customInput}`}
                        disabled
                        value={user?.mail || ''}
                        readOnly
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">名字 *</label>
                      <input
                        type="text"
                        className={`form-control ${styles.customInput}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">暱稱 *</label>
                      <input
                        type="text"
                        className={`form-control ${styles.customInput}`}
                        disabled
                        value={user?.nickname || ''}
                        readOnly
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">出生日期</label>
                      <input
                        type="date"
                        value={birthday || ""} // ✅ `YYYY-MM-DD` 格式
                        onChange={(e) => setBirthday(e.target.value)} // ✅ 確保不會帶時間
                        className="form-control"
                      />
                    </div>
                    <button
                      type="submit"
                      className={styles.customBtn}
                      disabled={updating}
                    >
                      更新我的帳戶
                    </button>
                  </form>
                </div>
              </div>

              {/* 密碼修改區 */}
              <div className="col-lg-5 mb-4">
                <div className={styles.customCard}>
                  <h5>我的密碼</h5>
                  <p className="mt-4 text-muted">
                    如要更改密碼，您需要先輸入目前的密碼。
                  </p>
                  <Link href="/user/passwordChange">
                    <button className={`mt-4 ${styles.customBtn}`}>
                      更新我的密碼
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* 地址區域 */}
            <div className={`${styles.customCard} mt-4`}>
              <h4 className="mb-4">我的地址</h4>
              <div className="mb-3">
                <strong>送貨地址:</strong>
                <div className="card p-3">
        {addresses.length > 0 ? (
          <ul className="">
            {addresses.map((address) => (
              <li key={address.id} className="list-group-item">
                 {address.address}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">尚未填寫住址</p>
        )}
      </div>
              </div>
              <div>
                <Link href="#" className="text-decoration-none">
                  選擇預設送貨地址
                </Link>
                <br />
                <div>
                  <a onClick={handleAddAddress}>添加新住址</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


//<ul>
// {addresses.map((address) => (
//   <li key={address.id}>
//     {address.address}
//     <button onClick={() => handleEditAddress(address.id, address.address)}>編輯</button>
//     <button onClick={() => handleDeleteAddress(address.id)}>刪除</button>
//   </li>
// ))}
// </ul>