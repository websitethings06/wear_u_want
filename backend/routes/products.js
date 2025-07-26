const express = require('express');
const router = express.Router();

// Sample product data (in a real app, this would come from a database)
let products = [
  {
    id: 1,
    name: "STYLE Classic White T-Shirt",
    category: "tops",
    price: 899,
    description: "Comfortable cotton t-shirt perfect for everyday wear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "black", "gray"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
    brand: "STYLE"
  },
  {
    id: 2,
    name: "FASHION Slim Fit Jeans",
    category: "bottoms",
    price: 2499,
    description: "Modern slim fit jeans with stretch comfort",
    sizes: ["30x32", "32x32", "34x32", "36x32"],
    colors: ["blue", "black"],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop",
    brand: "FASHION"
  },
  {
    id: 3,
    name: "TRENDY Casual Hoodie",
    category: "outerwear",
    price: 1799,
    description: "Warm and cozy hoodie for casual occasions",
    sizes: ["S", "M", "L", "XL"],
    colors: ["navy", "gray", "black"],
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop",
    brand: "TRENDY"
  },
  {
    id: 4,
    name: "ELEGANT Summer Dress",
    category: "tops",
    price: 1599,
    description: "Elegant summer dress with floral pattern",
    sizes: ["XS", "S", "M", "L"],
    colors: ["pink", "blue", "yellow"],
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop",
    brand: "ELEGANT"
  },
  {
    id: 5,
    name: "MODERN Denim Jacket",
    category: "outerwear",
    price: 2999,
    description: "Classic denim jacket with modern styling",
    sizes: ["S", "M", "L", "XL"],
    colors: ["blue", "black"],
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&h=400&fit=crop",
    brand: "MODERN"
  },
  {
    id: 6,
    name: "CASUAL High-Waist Pants",
    category: "bottoms",
    price: 1899,
    description: "Elegant high-waist pants for formal occasions",
    sizes: ["28", "30", "32", "34"],
    colors: ["black", "navy", "beige"],
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
    brand: "CASUAL"
  },
  {
    id: 7,
    name: "CHIC Blouse",
    category: "tops",
    price: 1299,
    description: "Professional blouse with button-up design",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "pink", "blue"],
    image: "https://images.unsplash.com/photo-1564257631407-3deb25e9c8e6?w=300&h=400&fit=crop",
    brand: "CHIC"
  },
  {
    id: 8,
    name: "URBAN Jumpsuit",
    category: "tops",
    price: 2199,
    description: "Stylish jumpsuit for modern women",
    sizes: ["XS", "S", "M", "L"],
    colors: ["black", "navy", "olive"],
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
    brand: "URBAN"
  },
  {
    id: 9,
    name: "PROFESSIONAL Blazer",
    category: "outerwear",
    price: 3499,
    description: "Professional blazer for office wear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "navy", "gray"],
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
    brand: "PROFESSIONAL"
  },
  {
    id: 10,
    name: "BASIC Shirt",
    category: "tops",
    price: 999,
    description: "Casual shirt perfect for everyday wear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "blue", "striped"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
    brand: "BASIC"
  },
  {
    id: 11,
    name: "GRACE Skirt",
    category: "bottoms",
    price: 1499,
    description: "Elegant skirt for formal occasions",
    sizes: ["XS", "S", "M", "L"],
    colors: ["black", "navy", "gray"],
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
    brand: "GRACE"
  },
  {
    id: 12,
    name: "ACTIVE Shorts",
    category: "bottoms",
    price: 799,
    description: "Comfortable shorts for active lifestyle",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "gray", "navy"],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop",
    brand: "ACTIVE"
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