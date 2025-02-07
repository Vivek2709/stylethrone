import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cartHelper'
import StripeCheckoutButton from 'react-stripe-checkout'
import { API } from '../backend'
import { createOrder } from './helper/orderHelper'



const StripeCheckout = ({products,setReload = f => f,reload=undefined}) => {
    const [data, setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    })
    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user.Id
    const getFinalAmount = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + p.price;
        })
        return amount;
    }
    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method:"POST",
            headers,
            body: JSON.stringify(body)
        })
        .then(response => {
            console.log(response)
            const {status} = response
            console.log("STATUS ",status)
        }).catch(err => console.log(err))
    }
    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
                stripeKey="pk_test_51H2cuiFeaHrICz5OHkWp5yjvQouNWuWmKtPdoon4qtL6jzsIzntPzzwNECcfu3guQ6ocA4OxMYGcc95fYoU37jTl00XmFP3owQ"
                token={makePayment}
                amount={getFinalAmount() * 100}
                name="Buy Product"
                shippingAddress
                billingAddress
            >
            <button className="btn btn-success">Pay with Stripe</button>
            </StripeCheckoutButton>
        ): (
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        )
    }
    return (
        <div>
            <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout
