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
    },
    addProduct: async (req, res) => {
        try {
            // Cria um novo produto com os dados enviados no corpo da requisição
            const { id, name, description, price, image } = req.body;

            // Verifica se todos os campos necessários foram enviados
            if (!id || !name || !description || !price || !image) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Cria uma nova instância do produto no banco de dados
            const newProduct = new productModel({
                id,
                name,
                description,
                price,
                image,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            // Salva o produto no banco de dados
            await newProduct.save();

            // Retorna a resposta com o produto criado
            res.status(201).json({ message: 'Product added successfully', product: newProduct });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default productController;