import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const NASA_API_KEY = process.env.NASA_API_KEY || '';
const NASA_API_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';

// Ensure that images directory will be created if not already present
const IMAGE_DIR = path.join(__dirname, "images");

// function that will call the nasa api specificying the earth date
export const fetchMarsPhotos = async (date: string): Promise<string[]> => {

    // Use axios to fetch
    const response = await axios.get(NASA_API_URL, {
        params: { earth_date: date, api_key: NASA_API_KEY },
    });

    return response.data.photos.map((photo: any) => photo.img_src);
};

export const downloadImage = async (url: string, filename: string, date: string): Promise<void> => {

    if (!fs.existsSync(IMAGE_DIR)) {
        fs.mkdirSync(IMAGE_DIR, { recursive: true });
    }

    const dateDirectory = path.join(IMAGE_DIR, date)

    if (!fs.existsSync(dateDirectory)) {
        fs.mkdirSync(dateDirectory, { recursive: true });
    }
    const baseFileName = path.basename(filename);
    const filePath = path.join(dateDirectory, baseFileName);

    const response = await axios({
        url,
        method: "GET",
        responseType: 'stream'
    });

    const writer = fs.createWriteStream(filePath);


  return new Promise((resolve, reject) => {
    response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
});
};
