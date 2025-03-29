import productModel from '../models/ProductModel.js';

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const result = await productModel.find();
            if (!result || result.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getProductById: async (req, res) => {
        try {
            const result = await productModel.findById(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default productController;