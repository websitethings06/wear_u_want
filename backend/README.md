# Wear U Want - Backend API

A Node.js/Express backend API for a fashion and clothing application.

## Features

- RESTful API for product management
- Product filtering by category, price, size, and color
- CRUD operations for products
- Error handling and validation
- CORS enabled for frontend integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file based on `env.example`:
   ```bash
   cp env.example .env
   ```

5. Update the `.env` file with your configuration

### Running the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## API Endpoints

### Base URL
```
http://localhost:5000
```

### Health Check
- **GET** `/health` - Check API status

### Products

#### Get All Products
- **GET** `/api/products`
- **Query Parameters:**
  - `category` - Filter by category (tops, bottoms, outerwear)
  - `minPrice` - Minimum price filter
  - `maxPrice` - Maximum price filter
  - `size` - Filter by size
  - `color` - Filter by color

**Example:**
```
GET /api/products?category=tops&minPrice=20&maxPrice=50
```

#### Get Single Product
- **GET** `/api/products/:id`

#### Create Product
- **POST** `/api/products`
- **Body:**
  ```json
  {
    "name": "Product Name",
    "category": "tops",
    "price": 29.99,
    "description": "Product description",
    "sizes": ["S", "M", "L"],
    "colors": ["red", "blue"],
    "image": "https://example.com/image.jpg"
  }
  ```

#### Update Product
- **PUT** `/api/products/:id`
- **Body:** Same as POST

#### Delete Product
- **DELETE** `/api/products/:id`

## Product Categories

- `tops` - Shirts, t-shirts, blouses, etc.
- `bottoms` - Pants, jeans, skirts, etc.
- `outerwear` - Jackets, hoodies, coats, etc.

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": [...],
  "message": "Optional message",
  "count": 3
}
```

## Error Handling

Errors are returned in this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## Development

### Project Structure
```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── env.example        # Environment variables template
├── routes/
│   └── products.js    # Product routes
└── README.md          # This file
```

### Adding New Features

1. Create new route files in the `routes/` directory
2. Import and use them in `server.js`
3. Follow the existing error handling patterns
4. Update this README with new endpoints

## Testing

Run tests with:
```bash
npm test
```

## License

MIT License 