import nextConnect from 'next-connect'
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// 設定檔案儲存位置，將上傳檔案存放於 public/image/article-content/
const uploadDir = path.join(process.cwd(), 'public/image/article-content')

// 若目錄不存在請先建立
// 可用 fs-extra 模組或手動在專案下建立

// 修改上傳設定檔案大小（此處限制 100MB）
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      // 取得檔案副檔名
      const ext = path.extname(file.originalname)
      // 使用 uuid 產生唯一檔案名稱
      const filename = `${uuidv4()}${ext}`
      cb(null, filename)
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `上傳出錯：${error.message}` })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `方法 ${req.method} 不允許` })
  },
})

// 根據 query.type 區分圖片、影片、文件；本例只示範圖片
apiRoute.use(upload.single('file'))

apiRoute.post((req, res) => {
  // 印出上傳檔案的大小
  console.log('上傳檔案大小:', req.file.size, '位元組')
  const { type } = req.query

  // 回傳給 Froala 編輯器的格式：link 屬性為圖片 URL
  res.status(200).json({
    // 注意：回傳的 URL 為相對於 public 資料夾的路徑
    link: `/image/article-content/${req.file.filename}`,
  })
})

export default apiRoute
