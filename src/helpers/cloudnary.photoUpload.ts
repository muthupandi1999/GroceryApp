import { v4 as uuidv4 } from "uuid";
import { cloudinary } from "../config/cloudnary.config";

import fs from "fs";
import { promisify } from "util";

import { createWriteStream } from "fs";
import { Readable } from "stream";
const writeFileAsync = promisify(fs.writeFile);
// import Multer from "multer";

// const storage =  Multer.memoryStorage();
// const upload = Multer({
//   storage,
// });

// const upload = multer({ dest: "src/public/files" });

// export const photoUpload = async (file: any) => {
//   try {
//     const myuuid = uuidv4();
//     const tempFilePath = `src/${myuuid}.png`;

//     // Create a writable stream to save the file temporarily
//     const writeStream = createWriteStream(tempFilePath);

//     // Convert the file to a readable stream if it's not already
//     const readStream = file instanceof Readable ? file : Readable.from([file]);

//     // Pipe the file data to the writable stream
//     readStream.pipe(writeStream);

//     // Wait for the file to finish writing
//     await new Promise((resolve, reject) => {
//       writeStream.on("finish", resolve);
//       writeStream.on("error", reject);
//     });

//     // Upload the temporary file to Cloudinary
//     const cloudinaryResponse = await cloudinary.uploader.upload(tempFilePath, {
//       // Cloudinary upload options (e.g., folder, resource_type, etc.)
//       folder: "Category",
//     });

//     // Delete the temporary file
//     fs.unlinkSync(tempFilePath);

//     return cloudinaryResponse;
//   } catch (error) {
//     console.error("Error uploading file to Cloudinary:", error);
//     throw error;
//   }
// };

export const photoUpload = async (base64String: string): Promise<string > => {
  try {
    // Generate a unique identifier for the image
    const publicId = uuidv4();

    // console.log("base64String", base64String);
    if (base64String != undefined) {
      // Upload the image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(base64String, {
        folder: "Grocery",
        public_id: publicId,
        overwrite: true, // Set to true to overwrite if the image already exists
      });

      // console.log("uploadResult", uploadResult);

      // Return the URL of the uploaded image
      return uploadResult.secure_url;

    } else {
      return '';
    }
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
