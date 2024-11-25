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
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.post('/fetch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const { dates } = req.body;
    //   if (!Array.isArray(dates)) {
    //     return res.status(400).json({ error: 'Invalid input, dates must be an array.' });
    //   }
    const datesFilePath = path_1.default.resolve(__dirname, "../../data/dates.txt");
    const dates = (0, utils_1.readDatesFromFile)(datesFilePath);
    if (!dates.length) {
        console.log("no dates found");
    }
    const downloadedImages = [];
    try {
        for (const date of dates) {
            const formattedDate = (0, utils_1.strictParseDate)(date, "yyyy-MM-dd");
            console.log("DATE", formattedDate);
            if (!formattedDate) {
                continue;
            }
            const photos = yield (0, nasaClient_1.fetchMarsPhotos)(formattedDate);
            console.log(`Saving images for ${formattedDate}`);
            for (const photo of photos) {
                const filename = path_1.default.basename(photo);
                yield (0, nasaClient_1.downloadImage)(photo, filename, formattedDate);
                downloadedImages.push(filename);
            }
        }
        res.status(200).json({ message: 'Images downloaded successfully.', files: downloadedImages });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// router.get('/list', (req, res) => {
//   const imageDir = path.resolve(__dirname, '../images');
//   fs.readdir(imageDir, (err, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Could not list images.' });
//     }
//     res.status(200).json({ images: files });
//   });
// });
exports.default = router;
