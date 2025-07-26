const express = require('express');
const router = express.Router();

// Sample product data (in a real app, this would come from a database)
let products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    category: "tops",
    price: 29.99,
    description: "Comfortable cotton t-shirt perfect for everyday wear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "black", "gray"],
    image: "https://via.placeholder.com/300x400?text=White+T-Shirt"
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    category: "bottoms",
    price: 79.99,
    description: "Modern slim fit jeans with stretch comfort",
    sizes: ["30x32", "32x32", "34x32", "36x32"],
    colors: ["blue", "black"],
    image: "https://via.placeholder.com/300x400?text=Slim+Fit+Jeans"
  },
  {
    id: 3,
    name: "Casual Hoodie",
    category: "outerwear",
    price: 59.99,
    description: "Warm and cozy hoodie for casual occasions",
    sizes: ["S", "M", "L", "XL"],
    colors: ["navy", "gray", "black"],
    image: "https://via.placeholder.com/300x400?text=Casual+Hoodie"
  }
];

// GET all products
router.get('/', (req, res) => {
  try {
    const { category, minPrice, maxPrice, size, color } = req.query;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === category
      );
    }
    
    // Filter by price range
    if (minPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= parseFloat(minPrice)
      );
    }
    
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= parseFloat(maxPrice)
      );
    }
    
    // Filter by size
    if (size) {
      filteredProducts = filteredProducts.filter(product => 
        product.sizes.includes(size)
      );
    }
    
    // Filter by color
    if (color) {
      filteredProducts = filteredProducts.filter(product => 
        product.colors.includes(color)
      );
    }
    
    res.json({
      success: true,
      data: filteredProducts,
      count: filteredProducts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// GET single product by ID
router.get('/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

// POST new product
router.post('/', (req, res) => {
  try {
    const { name, category, price, description, sizes, colors, image } = req.body;
    
    if (!name || !category || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name, category, and price are required'
      });
    }
    
    const newProduct = {
      id: products.length + 1,
      name,
      category,
      price: parseFloat(price),
      description: description || '',
      sizes: sizes || [],
      colors: colors || [],
      image: image || 'https://via.placeholder.com/300x400?text=Product+Image'
    };
    
    products.push(newProduct);
    
    res.status(201).json({
      success: true,
      data: newProduct,
      message: 'Product created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
});

// PUT update product
router.put('/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    const updatedProduct = {
      ...products[productIndex],
      ...req.body,
      id: productId // Ensure ID doesn't change
    };
    
    products[productIndex] = updatedProduct;
    
    res.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
});

// DELETE product
router.delete('/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    const deletedProduct = products.splice(productIndex, 1)[0];
    
    res.json({
      success: true,
      data: deletedProduct,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
});

module.exports = router; 