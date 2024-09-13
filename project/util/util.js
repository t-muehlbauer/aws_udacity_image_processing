import fs from "fs";
import Jimp from "jimp";


// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`Start processing image from URL: ${inputURL}`);
      
      // Attempt to read the image from the URL
      const photo = await Jimp.read(inputURL);
      console.log('Image successfully downloaded and read.');

      // Generate a path for the filtered image
      const outpath = "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      console.log(`Saving filtered image to: ${outpath}`);
      
      // Process the image: resize, set quality, and apply greyscale filter
      await photo
        .resize(256, 256) // Resize
        .quality(60) // Set JPEG quality
        .greyscale() // Apply greyscale filter
        .write(outpath, (img) => {
          console.log(`Image processing complete. File saved at: ${outpath}`);
          resolve(outpath);
        });

    } catch (error) {
      // Log the error and reject the promise
      console.error(`Error processing image from URL: ${inputURL}`, error);
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
 export async function deleteLocalFiles(files) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
