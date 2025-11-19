const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// === Tire Inventory (add as many as you want!) ===
const tires = [
  { id: 1, brand: "Michelin", model: "Pilot Sport 4S", size: "245/40R18", price: 250 },
  { id: 2, brand: "Goodyear", model: "Eagle F1 Asymmetric 6", size: "235/45R18", price: 195 },
  { id: 3, brand: "Bridgestone", model: "Potenza Sport", size: "225/40R18", price: 210 },
  { id: 4, brand: "Pirelli", model: "P Zero PZ4", size: "255/35R19", price: 280 },
  { id: 5, brand: "Continental", model: "PremiumContact 7", size: "225/45R17", price: 175 },
  { id: 6, brand: "Michelin", model: "Primacy 4+", size: "205/55R16", price: 135 },
  { id: 7, brand: "Goodyear", model: "EfficientGrip Performance 2", size: "195/65R15", price: 98 },
  { id: 8, brand: "Hankook", model: "Ventus S1 evo3", size: "235/40R18", price: 165 },
  { id: 9, brand: "Dunlop", model: "Sport Maxx RT2", size: "225/50R17", price: 155 },
  { id: 10, brand: "Yokohama", model: "Advan Sport V105", size: "245/45R18", price: 220 }
];

// API routes
app.get('/api/tires', (req, res) => {
  // Add placeholder image for each tire
  const tiresWithImages = tires.map(tire => ({
    ...tire,
    image: `https://via.placeholder.com/400x300/333333/FFFFFF?text=${encodeURIComponent(tire.brand + ' ' + tire.model)}`
  }));
  res.json(tiresWithImages);
});

app.post('/api/order', (req, res) => {
  console.log('=== NEW ORDER RECEIVED ===');
  console.log('Customer:', req.body.customer);
  console.log('Cart:', req.body.cart);
  console.log('Total: $' + req.body.total);
  // Here you could save to database, send email, charge with Stripe, etc.
  res.json({ success: true, message: "Order received! We will contact you soon." });
});

app.listen(port, () => {
  console.log(`Tire shop running at http://localhost:${port}`);
});