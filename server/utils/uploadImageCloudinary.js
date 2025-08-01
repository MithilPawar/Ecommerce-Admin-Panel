import cloudinary from "../config/cloudinary.js";

export const uploadOnCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "Products" }, //folder name on cloduinary
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          }); //return uploaded image url and id of image
        }
      )
      .end(fileBuffer); //directy sending file buffer
  });
};

export const deleteFromCloudinary = async (publicIds) => {
  if (!Array.isArray(publicIds)) {
    publicIds = [publicIds];
  }

  try {
    const deletedPromise = publicIds.map((id) =>
      cloudinary.uploader.destroy(id)
    );

    const result = await Promise.all(deletedPromise);
    return result;
  } catch (error) {
    console.error("Error deleting images from Cloudinary:", error);
    return null;
  }
};

/*

fileBuffer comes directly from req.file.buffer (using multer memoryStorage).
Uploads directly to Cloudinary without saving locally.
Returns the uploaded image URL (secure_url).
Simple Promise-based function for easy async/await usage.

*/
