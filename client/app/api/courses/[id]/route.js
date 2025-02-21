import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "app/api/_data/courses.json"); // ✅ 確保這個路徑正確

export async function GET(req, context) {  // ✅ 正確使用 context
  console.log("🔍 進入 `GET` API，context:", context);
  console.log("🔍 GET - params:", context.params);

  const { id } = context.params;
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);

    const course = data.courses.find((item) => item.id == id);
    if (!course) {
      return NextResponse.json({ message: "課程不存在" }, { status: 404 });
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("❌ 讀取課程失敗:", error);
    return NextResponse.json({ message: "伺服器錯誤" }, { status: 500 });
  }
}

export async function POST(req, context) {  // ✅ 確保 context 正確
  console.log("🔍 進入 `POST` API，params:", context.params);

  if (!context || !context.params || !context.params.id) {
    console.log("❌ `POST` 沒有收到 `id`");
    return NextResponse.json({ message: "課程 ID 無效" }, { status: 400 });
  }

  const { id } = context.params;
  console.log("✅ POST 請求 ID:", id);

  try {
    const data = await req.json();
    console.log("🔍 收到的資料:", data);

    // **讀取 JSON 檔案**
    const fileContent = await fs.readFile(filePath, "utf8");
    const courseData = JSON.parse(fileContent);

    // **查找對應的課程**
    const courseIndex = courseData.courses.findIndex((item) => item.id == id);
    if (courseIndex === -1) {
      console.log("❌ 找不到課程 ID:", id);
      return NextResponse.json({ message: "課程不存在" }, { status: 404 });
    }

    // **更新課程內容**
    courseData.courses[courseIndex] = {
      ...courseData.courses[courseIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    // **寫回 JSON**
    await fs.writeFile(filePath, JSON.stringify(courseData, null, 2));

    console.log("✅ 課程更新成功:", courseData.courses[courseIndex]);

    return NextResponse.json({
      message: "課程內容更新成功",
      course: courseData.courses[courseIndex],
    }, { status: 200 });
  } catch (error) {
    console.error("❌ 更新課程失敗:", error);
    return NextResponse.json({ message: "伺服器錯誤" }, { status: 500 });
  }
}
