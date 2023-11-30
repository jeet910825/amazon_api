
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.stripe);

// app config
const app = express();
const port = process.env.PORT || 3006;

// middleware
app.use(cors());
app.use(express.json());

// api routes

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
app.listen(port,()=>{
    console.log("server is runing on port number " + port)
})
