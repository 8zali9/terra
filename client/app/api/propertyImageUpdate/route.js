import { BlobServiceClient } from '@azure/storage-blob';
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { base64Images, user_id } = await request.json();

        if (!base64Images || base64Images.length === 0) {
            throw new Error('No images provided');
        }

        const containerName = 'terra-property-images';
        const connectionString = 'DefaultEndpointsProtocol=https;AccountName=k4terrastorage;AccountKey=fe/fQRHZLFRde8py8cO4B4P06gCSRSPsXT96qpS3zw+EH48p6DmmvaFY8z/qk0cRSF1Ha2UTy0a8+AStOUpMMQ==;EndpointSuffix=core.windows.net';

        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient(containerName);

        const userDirectory = `user-${user_id}`;
        const uniqueSuffix = new Date().getTime();
        const propertyDirectory = `${userDirectory}/${uniqueSuffix}`;

        // List and delete existing blobs in the user directory
        console.log(`Listing blobs in directory: ${userDirectory}`);
        for await (const blob of containerClient.listBlobsFlat({ prefix: userDirectory })) {
            console.log(`Deleting blob: ${blob.name}`);
            await containerClient.deleteBlob(blob.name);
        }

        // Upload new images
        const imagePaths = [];
        await Promise.all(base64Images.map(async (base64Image, index) => {
            const imageName = `propertyImage${index + 1}.jpeg`;
            const blobPath = `${propertyDirectory}/${imageName}`;

            const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
            const imageBuffer = Buffer.from(base64Image, 'base64');
            await blockBlobClient.uploadData(imageBuffer, { blobHTTPHeaders: { blobContentType: 'image/jpeg' } });
            const imagePath = `https://k4terrastorage.blob.core.windows.net/${containerName}/${blobPath}`;
            imagePaths.push(imagePath);
        }));

        return NextResponse.json({ message: 'Images uploaded successfully', imagePaths });

    } catch (error) {
        console.error('Error uploading images:', error);
        return NextResponse.json({ error: 'Error occurred during image upload', details: error.message }, { status: 500 });
    }
}
