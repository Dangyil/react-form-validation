import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoute from './routes/product.route.js';
import userRoute from './routes/user.route.js';

const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// route handler
app.get('/', (req, res) => {
    res.send({ message: 'Hello from this side!' });
});

 
app.use('/api/products', productRoute);

app.use('/api/users', userRoute);

//connect to database
mongoose.connect("mongodb+srv://admin:4Vk3gMHqDXbQnvRW@backend.jhob2vf.mongodb.net/?appName=backend").then(() => {
    console.log("Connected to MongoDB database!");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(() => {
    console.log("Failed to connect to MongoDB database");
})
