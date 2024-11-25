import express, { Request, Response } from "express";
import { fetchMarsPhotos, downloadImage } from "../nasaClient";
import { readDatesFromFile, formatDateString, strictParseDate } from "../utils";
import { fetchImageRequest } from "../types";
import fs from "fs";
import path from "path";

const router = express.Router();
const PUBLIC_IMG_DIR = path.resolve(
  __dirname,
  "../../../nasa-image-viewer-frontend/public/images"
);
// Define the types for the request body
interface FetchRequestBody {
  dates: string[];
}
//  Code to download the entire image set (I initially understood prompt wrong)
// router.post(
//   "/fetch",
//   async (
//     req: Request<{}, {}, FetchRequestBody>,
//     res: Response<any>
//   ): Promise<any> => {
//     const datesFilePath = path.resolve(__dirname, "../../data/dates.txt");

//     const dates = readDatesFromFile(datesFilePath);
//     if (!dates.length) {
//       console.log("no dates found");
//     }
//     const downloadedImages: string[] = [];
//     const photosOutput: Record<string, string[]> = {};

//     try {
//       for (const date of dates) {
//         const formattedDate = strictParseDate(date, "yyyy-MM-dd");

//         if (!formattedDate) {
//           continue;
//         }

//         const photos = await fetchMarsPhotos(formattedDate);

//         console.log(`Saving images for ${formattedDate}`);

//         const photoList = [];
//         for (const photo of photos) {
//           photoList.push(photo);

//           const filename = path.basename(photo);
//           await downloadImage(photo, filename, formattedDate);

//           downloadedImages.push(filename);
//         }
//         photosOutput[formattedDate] = photoList;
//         console.log(photosOutput);
//       }
//       res.status(200).json({
//         dates: photosOutput,
//       });
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// );

// route to download a specific image, takes in the source url and the formatted datestring
router.post(
  "/download",
  async (
    req: Request<{}, {}, fetchImageRequest>,
    res: Response<any>
  ): Promise<any> => {
    const { url } = req.body;
    const { date } = req.body;
    try {
      const filename = path.basename(url);

      await downloadImage(url, filename, date);

      res.status(200).json({});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Route to actually fetch all images from the nasa api, currently is reading dates from dates.txt file within the directory
router.get(
  "/fetch",
  async (
    req: Request<{}, {}, FetchRequestBody>,
    res: Response<any>
  ): Promise<any> => {
    const datesFilePath = path.resolve(__dirname, "../../data/dates.txt");

    const dates = readDatesFromFile(datesFilePath);
    if (!dates.length) {
      console.log("no dates found");
    }
    const downloadedImages: string[] = [];
    const photosOutput: Record<string, string[]> = {};

    try {
      for (const date of dates) {
        const formattedDate = strictParseDate(date, "yyyy-MM-dd");

        if (!formattedDate) {
          continue;
        }

        const photos = await fetchMarsPhotos(formattedDate);

        console.log(`Saving images for ${formattedDate}`);

        const photoList = [];
        for (const photo of photos) {
          photoList.push(photo);
        }
        photosOutput[formattedDate] = photoList;
      }
      res.status(200).json({
        dates: photosOutput,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Unused route, was for loading already downloaded images for when I had implemented functionality to download all images from api
// router.get("/list", (req: Request, res: Response) => {
//   try {
//     const folders: Record<string, string[]> = {};
//     const directoryContents = fs.readdirSync(PUBLIC_IMG_DIR);

//     directoryContents.forEach((folder) => {
//       const folderPath = path.join(PUBLIC_IMG_DIR, folder);
//       if (fs.statSync(folderPath).isDirectory()) {
//         folders[folder] = fs
//           .readdirSync(folderPath)
//           .filter((file) => file.endsWith(".jpg") || file.endsWith(".JPG"));
//       }
//     });
//     res.json({ dates: folders });
//   } catch (err) {
//     console.log("Error reading image directory:", err);
//     res.status(500).json({ error: "Failed to retrieve images" });
//   }
// });

export default router;
