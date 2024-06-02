import { writeFile } from 'fs/promises'
import { NextResponse } from "next/server";
import { promises as fsPromises } from 'fs';
import { join } from 'path';

export async function POST(request) {
  const path = 'D:/terra-images/user-images'
  const data = await request.formData()

  const file = data.get('file');
  const user_id = data.get('user_id')

  if (!file) return NextResponse.json({ error: "No file", status: 404 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const imagePath = join(path, user_id)
  const fullPath = join(imagePath, file.name)
  await fsPromises.mkdir(imagePath, { recursive: true });

  const files = await fsPromises.readdir(imagePath);
  for (const file of files) {
    await fsPromises.unlink(join(imagePath, file));
  }

  await writeFile(fullPath, buffer)

  return NextResponse.json({ 
    message: "File Uploaded", 
    imagePath: fullPath,
    status: 201 
  })
}
