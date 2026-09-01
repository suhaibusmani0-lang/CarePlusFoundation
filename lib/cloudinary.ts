import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'bmf2tikg',
  api_key: process.env.CLOUDINARY_API_KEY || '993445429773831',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'BAwlLkWMei_16_HFw4H7VO0TPrk',
});

export default cloudinary;
