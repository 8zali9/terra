import { BlobServiceClient } from '@azure/storage-blob';
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { base64Image, user_id } = await request.json();

    const containerName = 'terra-user-images';
    const connectionString = 'DefaultEndpointsProtocol=https;AccountName=k4terrastorage;AccountKey=fe/fQRHZLFRde8py8cO4B4P06gCSRSPsXT96qpS3zw+EH48p6DmmvaFY8z/qk0cRSF1Ha2UTy0a8+AStOUpMMQ==;EndpointSuffix=core.windows.net';

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const existingBlobName = `user-${user_id}/profile.jpeg`;
    const existingBlockBlobClient = containerClient.getBlockBlobClient(existingBlobName);
    await existingBlockBlobClient.deleteIfExists();

    const blobName = `user-${user_id}/profile.jpeg`;
    const imageBuffer = Buffer.from(base64Image, 'base64');
    
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(imageBuffer, { blobHTTPHeaders: { blobContentType: 'image/jpeg' } });

    const imagePath = `https://k4terrastorage.blob.core.windows.net/${containerName}/${blobName}`;
    console.log("imagePath", imagePath)
    
    return NextResponse.json( { message: 'Image uploaded successfully', imagePath: imagePath } );
  } catch (error) {
    console.error(error);
    return NextResponse.json( { error: 'Error occurred' } );
  }
}
