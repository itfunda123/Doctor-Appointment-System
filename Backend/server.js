const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Sample route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes will go here (e.g., /api/users, /api/appointments)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
