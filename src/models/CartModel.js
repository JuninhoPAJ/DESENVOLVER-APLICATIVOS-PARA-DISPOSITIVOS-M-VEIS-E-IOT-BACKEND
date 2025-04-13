import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true }, // 🆕 adiciona o nome do usuário

    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            name: { type: String, required: true }, // 🆕 adiciona o nome do produto
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],

    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const CartModel = mongoose.model("Cart", CartSchema);
export default CartModel;
