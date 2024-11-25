"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadImage = exports.fetchMarsPhotos = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const NASA_API_KEY = process.env.NASA_API_KEY || "";
const NASA_API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";
// Ensure that images directory will be created if not already present
const IMAGE_DIR = path_1.default.join(__dirname, "images");
const PUBLIC_DIR = path_1.default.resolve(__dirname, "../../nasa-image-viewer-frontend/public");
const PUBLIC_IMG_DIR = path_1.default.join(PUBLIC_DIR, "images");
// function that will call the nasa api specificying the earth date
const fetchMarsPhotos = (date) => __awaiter(void 0, void 0, void 0, function* () {
    // Use axios to fetch
    const response = yield axios_1.default.get(NASA_API_URL, {
        params: { earth_date: date, api_key: NASA_API_KEY },
    });
    return response.data.photos.map((photo) => photo.img_src);
});
exports.fetchMarsPhotos = fetchMarsPhotos;
const downloadImage = (url, filename, date) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fs_1.default.existsSync(IMAGE_DIR)) {
        fs_1.default.mkdirSync(IMAGE_DIR, { recursive: true });
    }
    const dateDirectory = path_1.default.join(IMAGE_DIR, date);
    if (!fs_1.default.existsSync(dateDirectory)) {
        fs_1.default.mkdirSync(dateDirectory, { recursive: true });
    }
    const baseFileName = path_1.default.basename(filename);
    const filePath = path_1.default.join(dateDirectory, baseFileName);
    const publicDatePath = path_1.default.join(PUBLIC_IMG_DIR, date);
    if (!fs_1.default.existsSync(publicDatePath)) {
        fs_1.default.mkdirSync(publicDatePath, { recursive: true });
    }
    const publicFilePath = path_1.default.join(publicDatePath, baseFileName);
    const response = yield (0, axios_1.default)({
        url,
        method: "GET",
        responseType: "stream",
    });
    const writer = fs_1.default.createWriteStream(filePath);
    response.data.pipe(writer);
    const publicWriter = fs_1.default.createWriteStream(publicFilePath);
    response.data.pipe(publicWriter);
    return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
});
exports.downloadImage = downloadImage;
