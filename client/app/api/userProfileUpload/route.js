import { BlobServiceClient } from '@azure/storage-blob';
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { base64Image, user_id } = await request.json();

    const containerName = 'terra-user-images';
    const connectionString = 'DefaultEndpointsProtocol=https;AccountName=k4terrastorage;AccountKey=fe/fQRHZLFRde8py8cO4B4P06gCSRSPsXT96qpS3zw+EH48p6DmmvaFY8z/qk0cRSF1Ha2UTy0a8+AStOUpMMQ==;EndpointSuffix=core.windows.net';

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobName = `user-${user_id}/profile.jpeg`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const imageBuffer = Buffer.from(base64Image, 'base64');

    await blockBlobClient.deleteIfExists();

    await blockBlobClient.uploadData(imageBuffer, { blobHTTPHeaders: { blobContentType: 'image/jpeg' } });

    const imagePath = `https://k4terrastorage.blob.core.windows.net/${containerName}/${blobName}`;

    return NextResponse.json({ message: 'Image uploaded successfully', imagePath: imagePath });
  } catch (error) {
    console.error('Error during image upload:', error);
    return NextResponse.json({ error: 'Error occurred during image upload' });
  }
}
