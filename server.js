const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const app = express();

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const consumerRoutes = require('./routes/consumer');

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/consumer', consumerRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

sequelize.sync()
    .then(result => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.log(err);
    });

module.exports = app;
