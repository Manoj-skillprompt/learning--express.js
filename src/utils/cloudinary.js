import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const cloudinaryFileUpload = async (filePath) => {
  try {
    if (!filePath) return null

    const uploadResult = await cloudinary.uploader
      .upload(filePath, {
        allowed_formats: ["auto"],
        resource_type: "auto",
      })
    console.log("uploaded result is", uploadResult.url);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log(error);
    return null;
  }
};

export { cloudinaryFileUpload };
