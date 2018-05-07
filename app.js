const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").load()

app.use(bodyParser.urlencoded({extended: false}));
app.post("/", (request, response) => {
  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here: https://dashboard.stripe.com/account/apikeys
    const stripe = require("stripe")(process.env.KEY);
  // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:

  stripe.charges.create({
   amount: 38700,
   currency: 'usd',
   description: 'Example charge',
   source: request.body.stripeToken,
 }, function (error, charge) {
   if(error) {
     response.status(400).send(error.message)
   } else {
     alert("You successfully paid $387.00");
     response.send(charge);
   }
 })

  console.log(request.body)

});

app.listen(process.env.PORT || 8080);
