import fs from 'fs';
import Jimp from 'jimp';
import path from 'path';
import axios from 'axios';

// filterImageFromURL
// Helper function to download, filter, and save the filtered image locally
// Returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`Attempting to read image from URL: ${inputURL}`);
      const response = await axios.get(inputURL, { responseType: 'arraybuffer' });
      const photo = await Jimp.read(response.data);
      console.log('Image successfully read');

      // Use /tmp directory for temporary files
      const outpath = path.join('/tmp', 'filtered.' + Math.floor(Math.random() * 2000) + '.jpg');
      console.log(`Saving filtered image to: ${outpath}`);

      await photo
        .resize(256, 256) // Resize
        .quality(60) // Set JPEG quality
        .greyscale() // Set greyscale
        .write(outpath, (err) => {
          if (err) {
            console.error(`Failed to write image: ${err.message}`);
            return reject(err);
          }
          console.log('Image successfully written');
          resolve(outpath);
        });
    } catch (error) {
      console.error(`Failed to process image: ${error.message}`);
      reject(new Error(`Failed to process image: ${error.message}`));
    }
  });
}

// deleteLocalFiles
// Helper function to delete files on the local disk
// Useful to clean up after tasks
// INPUTS
//    files: Array<string> - an array of absolute paths to files
export async function deleteLocalFiles(files) {
  for (let file of files) {
    try {
      fs.unlinkSync(file);
      console.log(`Deleted file: ${file}`);
    } catch (error) {
      console.error(`Failed to delete file ${file}: ${error.message}`);
    }
  }
}
