import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Slider,
  Drawer,
  IconButton,
  Badge,
  Breadcrumbs,
  Link,
  Divider,
  Tabs,
  Tab,
  Menu,
  MenuItem as MenuItemComponent,
  Snackbar
} from '@mui/material';
import {
  ShoppingCart,
  FilterList,
  Search,
  Favorite,
  FavoriteBorder,
  ViewList,
  ViewModule,
  Sort,
  Person,
  Favorite as FavoriteIcon,
  ShoppingBag,
  KeyboardArrowDown,
  Clear,
  Check
} from '@mui/icons-material';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:5001/api';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  
  // UI states
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedTab, setSelectedTab] = useState(0);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState('featured');

  // Categories for navigation
  const categories = [
    'Trending Now', 'New in', 'View All', 'Dresses', 'Jumpsuits', 
    'Blazers', 'Jackets', 'Shirts', 'Tops', 'T-Shirt', 
    'Jeans', 'Trousers', 'Joggers', 'Skirts', 'Shorts'
  ];

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data.data);
      setFilteredProducts(response.data.data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (size) {
      filtered = filtered.filter(product => product.sizes.includes(size));
    }

    if (color) {
      filtered = filtered.filter(product => product.colors.includes(color));
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
        // Random sorting for demo
        filtered.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, category, priceRange, size, color, searchTerm, sortBy]);



  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        showSnackbar('Removed from wishlist', 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showSnackbar('Added to wishlist!', 'success');
        return [...prev, product];
      }
    });
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };



  const formatPrice = (price) => {
    return `₹${price.toFixed(2)}`;
  };

  const handleSortMenuOpen = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    handleSortMenuClose();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">Loading fashion items...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div className="App">
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
            Wear U Want
          </Typography>
          
          {/* Search Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, maxWidth: 400, mx: 4 }}>
            <TextField
              fullWidth
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                endAdornment: searchTerm && (
                  <IconButton size="small" onClick={() => setSearchTerm('')}>
                    <Clear />
                  </IconButton>
                )
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#f8f9fa'
                }
              }}
            />
          </Box>
          
          {/* Right Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit">
              <Person />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={wishlist.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={cart.length} color="primary">
                <ShoppingBag />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Breadcrumbs */}
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" href="#" underline="hover">Home</Link>
          <Link color="inherit" href="#" underline="hover">Trending Now</Link>
          <Typography color="text.primary">Fashion Collection</Typography>
        </Breadcrumbs>
      </Container>

      {/* Category Navigation */}
      <Container maxWidth="lg" sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={selectedTab} 
            onChange={(e, newValue) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              '& .MuiTab-root': { 
                textTransform: 'none', 
                fontWeight: 500,
                minWidth: 'auto',
                px: 2
              }
            }}
          >
            {categories.map((cat, index) => (
              <Tab key={index} label={cat} />
            ))}
          </Tabs>
        </Box>
      </Container>

      {/* Filter and Sort Bar */}
      <Container maxWidth="lg" sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setFilterDrawerOpen(true)}
              sx={{ textTransform: 'none' }}
            >
              FILTER
            </Button>
            <Button
              variant="outlined"
              startIcon={<Sort />}
              endIcon={<KeyboardArrowDown />}
              onClick={handleSortMenuOpen}
              sx={{ textTransform: 'none' }}
            >
              SORT
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              onClick={() => setViewMode('grid')}
              color={viewMode === 'grid' ? 'primary' : 'default'}
            >
              <ViewModule />
            </IconButton>
            <IconButton 
              onClick={() => setViewMode('list')}
              color={viewMode === 'list' ? 'primary' : 'default'}
            >
              <ViewList />
            </IconButton>
          </Box>
        </Box>
      </Container>

      {/* Products Grid */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  },
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                {/* Wishlist Button */}
                <IconButton 
                  sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8, 
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    zIndex: 1,
                    '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
                  }}
                  onClick={() => toggleWishlist(product)}
                >
                  {wishlist.find(item => item.id === product.id) ? 
                    <Favorite sx={{ color: '#e91e63' }} /> : 
                    <FavoriteBorder />
                  }
                </IconButton>

                {/* Product Image */}
                <CardMedia
                  component="img"
                  height="300"
                  image={product.image}
                  alt={product.name}
                  sx={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Available';
                  }}
                />
                
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  {/* Brand Name */}
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {product.name.split(' ')[0].toUpperCase()}
                  </Typography>
                  
                  {/* Product Name */}
                  <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.3 }}>
                    {product.name}
                  </Typography>
                  
                  {/* Price */}
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
                    {formatPrice(product.price)}
                  </Typography>
                  
                  {/* Color Options */}
                  {product.colors.length > 1 && (
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                      {product.colors.slice(0, 4).map((color, index) => (
                        <Box
                          key={index}
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            backgroundColor: color,
                            border: '1px solid #ddd'
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredProducts.length === 0 && (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary">
              No products found matching your criteria
            </Typography>
          </Box>
        )}
      </Container>

      {/* Sort Menu */}
      <Menu
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={handleSortMenuClose}
      >
        <MenuItemComponent onClick={() => handleSortChange('featured')}>
          Featured
        </MenuItemComponent>
        <MenuItemComponent onClick={() => handleSortChange('newest')}>
          Newest First
        </MenuItemComponent>
        <MenuItemComponent onClick={() => handleSortChange('price-low')}>
          Price: Low to High
        </MenuItemComponent>
        <MenuItemComponent onClick={() => handleSortChange('price-high')}>
          Price: High to Low
        </MenuItemComponent>
        <MenuItemComponent onClick={() => handleSortChange('popular')}>
          Popular
        </MenuItemComponent>
      </Menu>

      {/* Filter Drawer */}
      <Drawer
        anchor="left"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        PaperProps={{
          sx: { width: 320 }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Filters</Typography>
            <Button
              variant="text"
              onClick={() => {
                setCategory('');
                setSize('');
                setPriceRange([0, 100]);
                setColor('');
                setSearchTerm('');
              }}
            >
              Clear All
            </Button>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          {/* Category Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Category
            </Typography>
            <FormControl fullWidth>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="tops">Tops</MenuItem>
                <MenuItem value="bottoms">Bottoms</MenuItem>
                <MenuItem value="outerwear">Outerwear</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Size Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Size
            </Typography>
            <FormControl fullWidth>
              <Select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">All Sizes</MenuItem>
                <MenuItem value="S">Small</MenuItem>
                <MenuItem value="M">Medium</MenuItem>
                <MenuItem value="L">Large</MenuItem>
                <MenuItem value="XL">Extra Large</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Price Range */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
            </Typography>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              sx={{ color: '#1976d2' }}
            />
          </Box>

          {/* Apply Filters Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={() => setFilterDrawerOpen(false)}
            sx={{ mt: 2 }}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Box sx={{ 
          backgroundColor: snackbar.severity === 'success' ? '#4caf50' : '#2196f3',
          color: 'white',
          px: 3,
          py: 2,
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Check />
          {snackbar.message}
        </Box>
      </Snackbar>
    </div>
  );
}

export default App;
