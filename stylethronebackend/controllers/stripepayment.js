const stripe = require("stripe")("sk_test_51H2cuiFeaHrICz5OQcHJ7t7u3de16XWT77js5KFUhJtmI8skeoHMC4pteueOfqXHASKNqrijaSWyfEmy1mmnwSUj00FHN6SPQX")
const { response } = require("express")
const uuid = require("uuid/v4")
const { createOrder } = require("./order")


exports.makepayment = (req,res) => {
    const {products,token} = req.body
    console.log("PRODUCTS ",products)
        let amount = 0;
        products.map(p => {
            amount = amount + p.price;
        })
    const idempotencyKey = uuid()
    return stripe.customers.create({
        email: token.email,
        source: token.id
    })
    .then(customer => {
        stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email:token.email,
            description: "a test account",
            shipping: {
                name: token.card.name,
                address: {
                    line1 :token.card.address_line1,
                    line2 :token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        },{idempotencyKey})
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
    })
}