import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoute from './routes/product.route.js';
import userRoute from './routes/user.route.js';
import ratelimit from 'express-rate-limit';
import helmet from 'helmet';

dotenv.config();
if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not set');
}

const app = express();
const port = process.env.PORT || 8000;

const limiter = ratelimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

// middleware
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://davereact.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// route handler
app.get('/', (req, res) => {
    res.send({ message: 'Hello from this side!' });
});

app.use('/api/products', productRoute);

app.use('/api/users', userRoute);

//connect to database
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB database!");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.log("Failed to connect to MongoDB database", err);
})
