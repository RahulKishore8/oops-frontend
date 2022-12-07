import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import CartItem from "./CartItem";

const GET_CART_URL = "/api/user/get-cart";
const INCREMENT_CART_URL = "/api/user/cart/increment";
const DECREMENT_CART_URL = "/api/user/cart/decrement";
const ORDER_URL = "/api/user/place-order";
function CartPage(){
    const [cartItems, setCartItems] = useState([]);
    const [update, setUpdate] = useState(0);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect( () => {
        try{
            axiosPrivate(GET_CART_URL, { 
                method : 'GET',
            })
                .then(res => {
                    console.log(res.data);
                    setCartItems(res.data);
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }, [update])

    const handleAdd = (productID) =>{
        try{
            axiosPrivate.patch(INCREMENT_CART_URL,
                JSON.stringify({
                "productID" : productID
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
                .then(res=>{
                    if(res.status === 200){
                        setUpdate(1);
                        setUpdate(0);
                    }
                })
        }catch(e){
            console.log(e);
        }
    }

    const handleRemove = (productID) =>{
        try{
            axiosPrivate.patch(DECREMENT_CART_URL,
                JSON.stringify({
                "productID" : productID
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
                .then(res=>{
                    if(res.status === 200){
                        setUpdate(1);
                        setUpdate(0);
                    }
                })
        }catch(e){
            console.log(e);
        }
    }

    const handleOrder = () => {
        axiosPrivate.patch(ORDER_URL).then(res => {
            if(res.status === 200){
                navigate('/orders', { state: { from: location }, replace: true });
            }else{
                navigate('/insufficient-balance', { state: { from: location }, replace: true });
            }
        })
    }

    if(cartItems.length === 0){
        return(
            <div>
                <p>Empty cart</p>
            </div>
        )
    }else{
        return (
            <div>
           { cartItems.map(item => <div key = {item.product.id}>
            <li key = {item.id}>{item.product.productName}</li>
            <p>{item.product.price}</p>
            <p>{item.product.price * item.quantity}</p>
            <p>{item.quantity}</p>
            <button id = {item.product.id} onClick = {() => handleAdd(item.product.id)}>+</button>
            <button id = {item.product.id} onClick = {() => handleRemove(item.product.id)}>-</button>
        </div>
        )}
        <button onClick = {() => handleOrder()}>Place Order</button>
        </div>
        )
    }
}

export default CartPage;