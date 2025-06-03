

const express = require('express');
const app = express();
const port = 5001;
const cors = require('cors');

// Allow CORS for your frontend origin
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Replace with your frontend URL
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
}));


app.use(express.json()); // For parsing application/json

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});





const mysql = require('mysql2');

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nomaan@9710', // Replace with your MySQL password
  database: 'hotel_bookings'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ MySQL Connection Error:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL Database');
});

// Example route to handle hotel bookings
app.post('/bookings', async (req, res) => {
  const {
    guest_name,
    phone_number,
    email,
    checkin_date,
    checkout_date,
    room_type,
    nights,
    total_price,
    payment_method,
    upi_id,
    payment_transaction_id
  } = req.body;

  const query = `
    INSERT INTO bookings 
    (guest_name, phone_number, email, checkin_date, checkout_date, room_type, nights, total_price, payment_method, upi_id, payment_transaction_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    guest_name,
    phone_number,
    email,
    checkin_date,
    checkout_date,
    room_type,
    nights,
    total_price,
    payment_method,
    upi_id,
    payment_transaction_id
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('❌ Booking Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('✅ Booking Successful:', result);
    res.status(201).json({ message: 'Booking successful', booking_id: result.insertId });
  });
});
