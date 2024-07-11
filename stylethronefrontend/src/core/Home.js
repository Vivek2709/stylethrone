import React,{useState,useEffect}from 'react'
import "../styles.css"
import {API} from '../backend'
import Base from './Base'
import Card from './Card'
import { getProducts } from '../admin/helper/adminapicall'
export default function Home() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)
    const loadAllProduct = () => {
        getProducts().then(data => {
            if(data.error){
                setError(data)
            }else{
                setProducts(data)
            }
        })
    }
    useEffect(() => {
        loadAllProduct()
    },[])
    console.log("API IS",API)
    return (
        <Base title="Home Page">
        <div className="row">
            <h1 className="text-white">All of products</h1>
            <div className="row">
                {products.map((product,index) => {
                    console.log(products)
                    return(
                        <div key={index} className="col-4 mb-4">
                            <Card product={product}/>
                        </div>
                    )
                })}
            </div>
        </div>
        </Base>
    )
}
