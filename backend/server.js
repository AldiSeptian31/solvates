const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

/* ===============================
   CORS CONFIG (WAJIB & FIX)
================================ */
app.use(cors({
  origin: [
    'https://solvates.vercel.app', // frontend Vercel
    'http://localhost:3000'        // frontend lokal
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/* ===============================
   MIDDLEWARE
================================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder untuk gambar
app.use('/images', express.static(path.join(__dirname, 'public/images')));

/* ===============================
   DUMMY PRODUCT DATA
================================ */
const products = [
  {
    id: 'sepatu-001',
    name: 'Velocity Runner',
    brand: 'AeroStride',
    price: 750000,
    image: 'sepatu-lari.jpeg'
  },
  {
    id: 'sepatu-002',
    name: 'Urban Walker',
    brand: 'CityScout',
    price: 550000,
    image: 'sepatu-kota.jpg'
  },
  {
    id: 'sepatu-003',
    name: 'Trail Blazer',
    brand: 'TerraFlex',
    price: 950000,
    image: 'sepatu-trail.jpeg'
  },
  {
    id: 'sepatu-004',
    name: 'Classic Canvas',
    brand: 'OldSkool',
    price: 450000,
    image: 'sepatu-canvas.jpg'
  },
  {
    id: 'sepatu-005',
    name: 'Ortuseight Hyperblast 2.0',
    brand: 'Ortuseight',
    price: 1000000,
    image: 'ortuseight-hyperblast.jpg'
  },
  {
    id: 'sepatu-006',
    name: 'Ortuseight Solar 1.0',
    brand: 'Ortuseight',
    price: 1500000,
    image: 'ortuseight-solar.jpg'
  }
];

/* ===============================
   ROUTES
================================ */

// Test server
app.get('/', (req, res) => {
  res.send('✅ Server SoleMates berjalan');
});

// Get products
app.get('/api/products', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const result = products.map(p => ({
    ...p,
    imageUrl: `${baseUrl}/images/${p.image}`
  }));

  res.status(200).json(result);
});

/* ===============================
   SERVER START
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
