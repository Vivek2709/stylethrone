import React,{useState,useEffect}from 'react'
import "../styles.css"
import {API} from '../backend'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import StripeCheckout from './StripeCheckout'

const Cart = () => {
    const [products, setproducts] = useState([])
    const [reload, setReload] = useState(false)
    useEffect(() => {
        setproducts(loadCart())
    }, [reload])
    const loadAllProducts = () => {
        return(
            <div>
                <h2> load all products</h2>
                {products.map((product,index) => (
                    <Card
                        key={index}
                        product={product}
                        removeFromCart={true}
                        addtoCart={false}
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </div>
        )
    }
    const loadCheckOut = () => {
        return(
        <div>
            <h2>Section for checkout</h2>
        </div>
        )
    }
    return (
        <Base title="Cart Page" description="Ready for chekcout">
        <div className="row">
            <div className="col-6">{loadAllProducts()}</div>
            <div className="col-6"><StripeCheckout products={products} setReload={setReload} /></div>
        </div>
        </Base>
    )
}

export default Cart
