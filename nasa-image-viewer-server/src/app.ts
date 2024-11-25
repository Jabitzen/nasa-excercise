import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import imagesRouter from './routes/images';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/images', imagesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
