import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const ProductModel = mongoose.model("Product", schema);
export default ProductModel;