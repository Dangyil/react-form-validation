import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoute from './routes/product.route.js';
import userRoute from './routes/user.route.js';
import ratelimit from 'express-rate-limit';
import helmet from 'helmet';

const app = express();
const port = process.env.PORT || 8000;

const limiter = ratelimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
app.use(helmet());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true
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
}).catch(() => {
    console.log("Failed to connect to MongoDB database");
})
