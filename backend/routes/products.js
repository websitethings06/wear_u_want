const express = require('express');
const router = express.Router();

// Sample product data (in a real app, this would come from a database)
let products = [
  {
    id: 1,
    name: "WUNDERLOVE Classic White T-Shirt",
    category: "tops",
    price: 899,
    description: "Comfortable cotton t-shirt perfect for everyday wear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "black", "gray"],
    image: "https://via.placeholder.com/300x400?text=WUNDERLOVE+T-Shirt",
    brand: "WUNDERLOVE"
  },
  {
    id: 2,
    name: "LUNA BLU Slim Fit Jeans",
    category: "bottoms",
    price: 2499,
    description: "Modern slim fit jeans with stretch comfort",
    sizes: ["30x32", "32x32", "34x32", "36x32"],
    colors: ["blue", "black"],
    image: "https://via.placeholder.com/300x400?text=LUNA+BLU+Jeans",
    brand: "LUNA BLU"
  },
  {
    id: 3,
    name: "WARDROBE Casual Hoodie",
    category: "outerwear",
    price: 1799,
    description: "Warm and cozy hoodie for casual occasions",
    sizes: ["S", "M", "L", "XL"],
    colors: ["navy", "gray", "black"],
    image: "https://via.placeholder.com/300x400?text=WARDROBE+Hoodie",
    brand: "WARDROBE"
  },
  {
    id: 4,
    name: "NUON Summer Dress",
    category: "tops",
    price: 1599,
    description: "Elegant summer dress with floral pattern",
    sizes: ["XS", "S", "M", "L"],
    colors: ["pink", "blue", "yellow"],
    image: "https://via.placeholder.com/300x400?text=NUON+Dress",
    brand: "NUON"
  },
  {
    id: 5,
    name: "WESTERN Denim Jacket",
    category: "outerwear",
    price: 2999,
    description: "Classic denim jacket with modern styling",
    sizes: ["S", "M", "L", "XL"],
    colors: ["blue", "black"],
    image: "https://via.placeholder.com/300x400?text=WESTERN+Jacket",
    brand: "WESTERN"
  },
  {
    id: 6,
    name: "STYLE High-Waist Pants",
    category: "bottoms",
    price: 1899,
    description: "Elegant high-waist pants for formal occasions",
    sizes: ["28", "30", "32", "34"],
    colors: ["black", "navy", "beige"],
    image: "https://via.placeholder.com/300x400?text=STYLE+Pants",
    brand: "STYLE"
  },
  {
    id: 7,
    name: "FASHION Blouse",
    category: "tops",
    price: 1299,
    description: "Professional blouse with button-up design",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "pink", "blue"],
    image: "https://via.placeholder.com/300x400?text=FASHION+Blouse",
    brand: "FASHION"
  },
  {
    id: 8,
    name: "TRENDY Jumpsuit",
    category: "tops",
    price: 2199,
    description: "Stylish jumpsuit for modern women",
    sizes: ["XS", "S", "M", "L"],
    colors: ["black", "navy", "olive"],
    image: "https://via.placeholder.com/300x400?text=TRENDY+Jumpsuit",
    brand: "TRENDY"
  },
  {
    id: 9,
    name: "MODERN Blazer",
    category: "outerwear",
    price: 3499,
    description: "Professional blazer for office wear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "navy", "gray"],
    image: "https://via.placeholder.com/300x400?text=MODERN+Blazer",
    brand: "MODERN"
  },
  {
    id: 10,
    name: "CASUAL Shirt",
    category: "tops",
    price: 999,
    description: "Casual shirt perfect for everyday wear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "blue", "striped"],
    image: "https://via.placeholder.com/300x400?text=CASUAL+Shirt",
    brand: "CASUAL"
  },
  {
    id: 11,
    name: "ELEGANT Skirt",
    category: "bottoms",
    price: 1499,
    description: "Elegant skirt for formal occasions",
    sizes: ["XS", "S", "M", "L"],
    colors: ["black", "navy", "gray"],
    image: "https://via.placeholder.com/300x400?text=ELEGANT+Skirt",
    brand: "ELEGANT"
  },
  {
    id: 12,
    name: "SPORTY Shorts",
    category: "bottoms",
    price: 799,
    description: "Comfortable shorts for active lifestyle",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "gray", "navy"],
    image: "https://via.placeholder.com/300x400?text=SPORTY+Shorts",
    brand: "SPORTY"
  }
];

// GET all products
router.get('/', (req, res) => {
  try {
    const { category, minPrice, maxPrice, size, color, brand, sort } = req.query;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === category
      );
    }
    
    // Filter by brand
    if (brand) {
      filteredProducts = filteredProducts.filter(product => 
        product.brand.toLowerCase().includes(brand.toLowerCase())
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
    
    // Apply sorting
    if (sort) {
      switch (sort) {
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          filteredProducts.sort((a, b) => b.id - a.id);
          break;
        case 'popular':
          // Random sorting for demo
          filteredProducts.sort(() => Math.random() - 0.5);
          break;
        case 'name':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    }
    
    res.json({
      success: true,
      data: filteredProducts,
      count: filteredProducts.length,
      total: products.length
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
    const { name, category, price, description, sizes, colors, image, brand } = req.body;
    
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
      image: image || 'https://via.placeholder.com/300x400?text=Product+Image',
      brand: brand || 'GENERIC'
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

// GET categories
router.get('/categories/list', (req, res) => {
  try {
    const categories = [...new Set(products.map(product => product.category))];
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

// GET brands
router.get('/brands/list', (req, res) => {
  try {
    const brands = [...new Set(products.map(product => product.brand))];
    res.json({
      success: true,
      data: brands
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching brands',
      error: error.message
    });
  }
});

module.exports = router; 