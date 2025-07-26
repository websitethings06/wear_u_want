# Wear U Want - Fashion Store

A modern full-stack fashion e-commerce application built with React frontend and Node.js/Express backend.

## 🎯 Features

- **Modern UI**: Beautiful, responsive design with Material-UI components
- **Product Management**: Full CRUD operations for fashion products
- **Advanced Filtering**: Filter by category, price, size, and color
- **Search Functionality**: Find products by name or description
- **Shopping Cart**: Add items to cart with quantity tracking
- **Wishlist**: Save favorite items for later
- **RESTful API**: Clean, well-documented backend API

## 🚀 Tech Stack

### Frontend
- **React** - UI framework
- **Material-UI** - Component library
- **Axios** - HTTP client
- **CSS3** - Styling with modern animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables

## 📁 Project Structure

```
wear_u_want/
├── backend/
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   ├── routes/
│   │   └── products.js    # Product API routes
│   ├── env.example        # Environment template
│   └── README.md          # Backend documentation
├── frontend/
│   ├── public/            # Static files
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styling
│   │   └── index.js       # React entry point
│   ├── package.json       # Frontend dependencies
│   └── README.md          # Frontend documentation
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your configuration
node server.js
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🌐 Running the Application

### Development Mode
1. **Start Backend**: `cd backend && node server.js`
   - Server runs on: `http://localhost:5001`
   - API available at: `http://localhost:5001/api/products`

2. **Start Frontend**: `cd frontend && npm start`
   - App runs on: `http://localhost:3000`

## 📋 API Endpoints

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Query Parameters
- `category` - Filter by category (tops, bottoms, outerwear)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `size` - Filter by size
- `color` - Filter by color

## 🎨 Features

### Product Categories
- **Tops**: Shirts, t-shirts, blouses, etc.
- **Bottoms**: Pants, jeans, skirts, etc.
- **Outerwear**: Jackets, hoodies, coats, etc.

### UI Features
- Responsive design for all devices
- Smooth animations and hover effects
- Modern gradient backgrounds
- Interactive filtering and search
- Shopping cart with badge counter
- Wishlist functionality

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/wear_u_want
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm install --production
NODE_ENV=production node server.js
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the build folder to your hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Wear U Want Fashion Store - A modern e-commerce solution for fashion retailers.

---

**Happy Shopping! 🛍️** 