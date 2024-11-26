"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const images_1 = __importDefault(require("./routes/images"));
<<<<<<< HEAD
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
const PORT = process.env.PORT || 3001;
app.use(body_parser_1.default.json());
app.use("/api/images", images_1.default);
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const shutdown = () => {
    console.log("\nServer shutting down...");
    server.close(() => {
        console.log("Server closed. Port released.");
        process.exit(0);
    });
    setTimeout(() => {
        console.error("Forcing shutdown...");
        process.exit(1);
    }, 10000);
};
process.on("SIGINT", () => {
    console.log("Received SIGINT (Ctrl+C)");
    shutdown();
});
process.on("SIGTERM", () => {
    console.log("Received SIGTERM");
    shutdown();
});
=======
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use('/api/images', images_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
>>>>>>> 5b5b95be82579af4f97e8c80acacd646e83e2e16
