import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const uploadDir = "public/images/course-content"; // 圖片上傳目錄

export async function POST(req) {
  try {
    // **手動解析 FormData**
    const formData = await req.formData();
    const file = formData.get("upload");

    if (!file) {
      return NextResponse.json({ message: "未提供檔案" }, { status: 400 });
    }

    // **存儲檔案**
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExt = path.extname(file.name);
    const filename = uuidv4() + fileExt;
    const filePath = path.join(uploadDir, filename);

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      url: `/images/course-content/${filename}`,
      message: "圖片上傳成功",
    }, { status: 200 });
  } catch (error) {
    console.error("上傳錯誤:", error);
    return NextResponse.json({ message: "伺服器錯誤" }, { status: 500 });
  }
}

// **關閉內建 bodyParser**
export const config = {
  api: {
    bodyParser: false,
  },
};
