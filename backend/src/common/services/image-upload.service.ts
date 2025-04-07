import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ImageUploadService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
  // note : Provide an URl and a self generated publicID to receive a Secure URl for the image URl 
  async uploadImage(imagePathOrUrl: string, publicId: string): Promise<string> {
    try {
      const uploadResult = await cloudinary.uploader.upload(imagePathOrUrl, {
        public_id: publicId,
      });
      return uploadResult.secure_url; // Return the secure URL
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      throw new Error('Error uploading image');
    }
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
      console.log(`Image with publicId ${publicId} deleted successfully.`);
    } catch (error) {
      console.error('Cloudinary delete failed:', error);
      throw new Error('Error deleting image');
    }
  }
}
// note: Provide a publicID to delete the corresponding image from Cloudinary
