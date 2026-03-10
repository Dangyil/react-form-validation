import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please enter product name"]
      },
      description: {
        type: String,
        required: false,
        default: ""
      },
      quantity: {
        type: Number,
        required: true,
        default: 0
      },
      price: {
        type: Number,
        required: true,
        default: 0
      },
      image: {
        type: String,
        required: false
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
      },
      status: {
        type: String,
        enum: ['active', 'inactive', 'archived'],
        default: 'active'
      }
    },
    { timestamps: true }  
);

const Product = mongoose.model("Product", productSchema);
export default Product;