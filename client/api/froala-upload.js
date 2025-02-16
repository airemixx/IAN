import nextConnect from 'next-connect'
import multer from 'multer'
import path from 'path'

// 設定檔案儲存位置，這裡將上傳檔案存放於 public/uploads/froala/
const uploadDir = path.join(process.cwd(), 'public/uploads/froala')
const upload = multer({ dest: uploadDir })

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

// 根據 query.type 區分圖片、影片、文件（可依需求擴充）
apiRoute.use(upload.single('file'))

apiRoute.post((req, res) => {
  // req.file 為上傳的檔案資訊
  // 此處可進一步處理檔案名或移動檔案，例如更名、存入資料庫等等
  // 此範例回傳檔案在 public 裡的相對 URL
  const { type } = req.query // type=image, video, file
  
  // 回傳給 Froala 的格式可能需要符合它的要求
  res.status(200).json({
    link: `/uploads/froala/${req.file.filename}`
  })
})