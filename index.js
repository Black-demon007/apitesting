const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const authRouter = require('./routes/authRoute');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/', authRouter);

console.log('database:', process.env.MONGODB);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('DB connection successful');
    } catch (error) {
        console.error('Unable to connect with DB:', error);
        process.exit(1); // Exit the process with failure
    }
};

// Corrected error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

const PORT = process.env.PORT || 3005; // Default to 3005 if PORT is not set
app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
    connect();
});
