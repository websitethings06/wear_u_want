# Wear U Want - Fashion E-commerce Platform

A modern, full-stack fashion e-commerce application built with React and Node.js, featuring a professional UI similar to popular fashion retailers.

## ✨ Features

- **Professional Fashion Store UI** - Clean, modern design with Westside-inspired layout
- **Product Catalog** - Browse fashion items with filtering and sorting
- **Search Functionality** - Find products quickly with real-time search
- **Advanced Filtering** - Filter by category, price, size, color, and brand
- **Wishlist Management** - Save favorite items for later
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Real-time Updates** - Dynamic product loading and state management

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Material-UI (MUI)** - Professional UI components
- **Axios** - HTTP client for API communication
- **CSS3** - Custom styling and animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **RESTful API** - Clean API design

## 📁 Project Structure

```
wear_u_want/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── App.js          # Main application component
│   │   ├── App.css         # Custom styles
│   │   └── index.js        # Application entry point
│   └── package.json        # Frontend dependencies
├── backend/                 # Node.js backend API
│   ├── routes/             # API route handlers
│   │   └── products.js     # Product management routes
│   ├── server.js           # Express server setup
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend documentation
└── README.md               # Project overview
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wear_u_want
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The API will be available at `http://localhost:5001`

2. **Start the Frontend Application**
   ```bash
   cd frontend
   npm start
   ```
   The application will open at `http://localhost:3000`

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Filtering & Sorting
- `GET /api/products?category=tops` - Filter by category
- `GET /api/products?minPrice=500&maxPrice=2000` - Filter by price range
- `GET /api/products?sort=price-low` - Sort by price (low to high)
- `GET /api/products?brand=STYLE` - Filter by brand

## 🎨 UI Features

### Header
- **Brand Logo** - "Wear U Want" branding
- **Search Bar** - Real-time product search
- **User Icons** - Profile, wishlist, and cart indicators

### Navigation
- **Category Tabs** - Browse by clothing categories
- **Breadcrumbs** - Easy navigation tracking
- **Filter & Sort** - Advanced product filtering

### Product Display
- **Grid Layout** - Professional product cards
- **Brand Names** - Prominent brand display
- **Price Display** - Indian Rupee pricing
- **Color Options** - Visual color indicators
- **Wishlist Buttons** - Quick save functionality

### Filtering
- **Category Filter** - Tops, Bottoms, Outerwear
- **Size Filter** - S, M, L, XL options
- **Price Range** - Slider for price selection
- **Color Filter** - Multiple color options
- **Brand Filter** - Filter by brand names

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
PORT=5001
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
```

### Backend Deployment
```bash
cd backend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern fashion e-commerce platforms
- Built with Material-UI for professional design
- Uses Unsplash for high-quality product images

---

**Wear U Want** - Your Fashion, Your Style! 👗✨ 