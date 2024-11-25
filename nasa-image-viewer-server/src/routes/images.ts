import express, { Request, Response } from 'express';
import { fetchMarsPhotos, downloadImage } from '../nasaClient';
import { readDatesFromFile, formatDateString, strictParseDate } from '../utils';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Define the types for the request body
interface FetchRequestBody {
    dates: string[];
  }

router.post('/fetch', async (req: Request<{}, {}, FetchRequestBody>, res: Response<any>): Promise<any> => {
//   const { dates } = req.body;

//   if (!Array.isArray(dates)) {
//     return res.status(400).json({ error: 'Invalid input, dates must be an array.' });
//   }
    const datesFilePath = path.resolve(__dirname, "../../data/dates.txt");

    const dates = readDatesFromFile(datesFilePath)
    if (!dates.length) {
        console.log("no dates found")
    }
    const downloadedImages: string[] = [];
    try {
        for (const date of dates) {
            const formattedDate = strictParseDate(date, "yyyy-MM-dd");

            console.log("DATE", formattedDate)
            if (!formattedDate) {
                continue;
            }

            const photos = await fetchMarsPhotos(formattedDate);

            console.log(`Saving images for ${formattedDate}`);
            for (const photo of photos) {
                const filename = path.basename(photo);
                await downloadImage(photo, filename, formattedDate);

            downloadedImages.push(filename);
      }
    }
    res.status(200).json({ message: 'Images downloaded successfully.', files: downloadedImages });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// router.get('/list', (req, res) => {
//   const imageDir = path.resolve(__dirname, '../images');
//   fs.readdir(imageDir, (err, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Could not list images.' });
//     }
//     res.status(200).json({ images: files });
//   });
// });

export default router;
