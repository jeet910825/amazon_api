
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.stripe);

// app config
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// api routes
app.get('/', (req, res) => {
    res.status(200).send('Hello, World');
});

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: 'inr',
        description: 'Test payment',
    });

    const clientSecret = paymentIntent.client_secret;

    res.status(201).json({
        clientSecret,
    });
});

// listen command
app.listen(3006,()=>{
    console.log("server is runing on port number 3006")
})
