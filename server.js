const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl:{
    rejectUnauthorized: false
  }
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

// User login
app.post('/api/login', (req, res) => {
  console.log("Request body:", req.body);
  const { username, password } = req.body;
  console.log("Received username:", username);
  console.log("Received password:", password);

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).send('Database error');
    }
    
    if (results.length === 0) {
      console.log("User not found");
      return res.status(401).send('Invalid credentials');
    }

    const user = results[0];
    console.log("Stored hash:", user.password_hash);

    // Trim and compare
    const inputPassword = password.trim();
    const storedHash = user.password_hash.trim();
    const match = bcrypt.compareSync(inputPassword, storedHash);

    console.log("Match result:", match);
    
    if (!match) return res.status(401).send('Invalid credentials');
    res.json({ id: user.id, username: user.username, role: user.role });
  });
});




// Create notification
app.post('/api/notifications', (req, res) => {
  const { notification_no, functional_location, equipment, description, damage_code, effect, created_by } = req.body;
  db.query(
    'INSERT INTO notifications (notification_no, functional_location, equipment, description, damage_code, effect, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [notification_no, functional_location, equipment, description, damage_code, effect, created_by],
    (err, result) => {
      if (err) return res.status(500).send('Error');
      res.json({ id: result.insertId });
    }
  );
});

// Create work order
app.post('/api/workorders', (req, res) => {
  const { work_order_no, notification_id, operations, num_people, duration, start_datetime, end_datetime, status } = req.body;
  db.query(
    'INSERT INTO work_orders (work_order_no, notification_id, operations, num_people, duration, start_datetime, end_datetime, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [work_order_no, notification_id, operations, num_people, duration, start_datetime, end_datetime, status],
    (err, result) => {
      if (err) return res.status(500).send('Error');
      res.json({ id: result.insertId });
    }
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

