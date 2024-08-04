const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const authRouter = require('./routes/authRoute');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/', authRouter);


console.log('database:',process.env.MONGODB);



const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log('db connection successful');
    } catch (error) {
        console.error('Unable to connect with DB:', error);
    }
};


app.use((err, res, req) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`App Is Running On Port : ${PORT}`);
    connect()
});
