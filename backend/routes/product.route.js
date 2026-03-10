import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getProductStats
} from '../controllers/product.controller.js';

const router = express.Router();

router.use(verifyToken);

router.get('/stats/overview', getProductStats);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;