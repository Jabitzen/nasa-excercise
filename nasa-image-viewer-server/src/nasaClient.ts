<<<<<<< HEAD
import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const NASA_API_KEY = process.env.NASA_API_KEY || "";
const NASA_API_URL =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

// Ensure that images directory will be created if not already present
const IMAGE_DIR = path.join(__dirname, "images");
const PUBLIC_DIR = path.resolve(
  __dirname,
  "../../nasa-image-viewer-frontend/public"
);

const PUBLIC_IMG_DIR = path.join(PUBLIC_DIR, "images");

// function that will call the nasa api specificying the earth date
export const fetchMarsPhotos = async (date: string): Promise<string[]> => {
  // Use axios to fetch
  const response = await axios.get(NASA_API_URL, {
    params: { earth_date: date, api_key: NASA_API_KEY },
  });

  return response.data.photos.map((photo: any) => photo.img_src);
};

// download image using url which is returned from api, filename is the basename of that url, and date is the formatted date string
export const downloadImage = async (
  url: string,
  filename: string,
  date: string
): Promise<void> => {
  if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
  }

  // create directory for each date so you know which date each image is from
  const dateDirectory = path.join(IMAGE_DIR, date);

  if (!fs.existsSync(dateDirectory)) {
    fs.mkdirSync(dateDirectory, { recursive: true });
  }
  const baseFileName = path.basename(filename);
  const filePath = path.join(dateDirectory, baseFileName);

  const publicDatePath = path.join(PUBLIC_IMG_DIR, date);

  if (!fs.existsSync(publicDatePath)) {
    fs.mkdirSync(publicDatePath, { recursive: true });
  }

  const publicFilePath = path.join(publicDatePath, baseFileName);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  // writes to public img directory in frontend, but also an img directory in the backend if needed
  const writer = fs.createWriteStream(filePath);
  response.data.pipe(writer);
  const publicWriter = fs.createWriteStream(publicFilePath);
  response.data.pipe(publicWriter);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
=======
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
>>>>>>> 5b5b95be82579af4f97e8c80acacd646e83e2e16
};
