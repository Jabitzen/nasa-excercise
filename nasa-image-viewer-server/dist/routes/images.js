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
const express_1 = __importDefault(require("express"));
const nasaClient_1 = require("../nasaClient");
const utils_1 = require("../utils");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const PUBLIC_IMG_DIR = path_1.default.resolve(__dirname, "../../../nasa-image-viewer-frontend/public/images");
//  Code to download the entire image set
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
router.post("/download", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    const { date } = req.body;
    try {
        const filename = path_1.default.basename(url);
        yield (0, nasaClient_1.downloadImage)(url, filename, date);
        res.status(200).json({});
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get("/fetch", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const datesFilePath = path_1.default.resolve(__dirname, "../../data/dates.txt");
    const dates = (0, utils_1.readDatesFromFile)(datesFilePath);
    if (!dates.length) {
        console.log("no dates found");
    }
    const downloadedImages = [];
    const photosOutput = {};
    try {
        for (const date of dates) {
            const formattedDate = (0, utils_1.strictParseDate)(date, "yyyy-MM-dd");
            if (!formattedDate) {
                continue;
            }
            const photos = yield (0, nasaClient_1.fetchMarsPhotos)(formattedDate);
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
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get("/list", (req, res) => {
    try {
        const folders = {};
        const directoryContents = fs_1.default.readdirSync(PUBLIC_IMG_DIR);
        directoryContents.forEach((folder) => {
            const folderPath = path_1.default.join(PUBLIC_IMG_DIR, folder);
            if (fs_1.default.statSync(folderPath).isDirectory()) {
                folders[folder] = fs_1.default
                    .readdirSync(folderPath)
                    .filter((file) => file.endsWith(".jpg") || file.endsWith(".JPG"));
            }
        });
        res.json({ dates: folders });
    }
    catch (err) {
        console.log("Error reading image directory:", err);
        res.status(500).json({ error: "Failed to retrieve images" });
    }
});
exports.default = router;
