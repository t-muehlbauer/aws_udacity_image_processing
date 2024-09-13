import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util.js';

// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8082;

// Use the body parser middleware for post requests
app.use(bodyParser.json());

// Utility function to validate URL
const isValidUrl = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (error) {
    return false;
  }
};

// GET /filteredimage?image_url={{URL}}
app.get('/filteredimage', 
  async (req, res) => {
  let { image_url } = req.query;

  // 1. Validate the image_url query
  if (!image_url || !isValidUrl(image_url)) {
    return res.status(400).send({ message: 'A valid image_url query parameter is required.' });
  }

  try {
    console.log('Received image_url:', image_url);

    // 2. Call filterImageFromURL(image_url) to filter the image
    const filteredPath = await filterImageFromURL(image_url);
    console.log('Filtered image saved at:', filteredPath);

    // 3. Send the resulting file in the response
    res.sendFile(filteredPath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        return res.status(500).send({ message: 'Failed to send the filtered image.' });
      }

      // 4. Delete any files on the server on finish of the response
      deleteLocalFiles([filteredPath]);
    });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(422).send({ message: 'Unable to process the image at the provided URL.' });
  }
});

// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
  res.send("try GET /filteredimage?image_url={{}}");
});

// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
