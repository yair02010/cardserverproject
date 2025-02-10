const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/cards', cardRoutes);
app._router.stack.forEach(function(r){
    if (r.route && r.route.path) {
        console.log(r.route.path)
    }
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app._router.stack.forEach(function(r){
    if (r.route && r.route.path) {
        console.log(`Route found: ${r.route.path}`);
    }
});
app._router.stack.forEach(function(r){
    if (r.route && r.route.path) {
        console.log(`✅ Route found: ${r.route.path}`);
    }
});
