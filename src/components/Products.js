import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect( () => {
        try{
            axiosPrivate('/api/product/all', { 
                method : 'GET',
            })
                .then(res => {
                    console.log(res)
                    setProducts(res.data)
                })
                .catch()
        }catch(e){
            console.log(e);
            navigate('/login', { state: { from: location }, replace: true });
        }
        
    }, [])

    return (
        <div>
            <ul>
                {
                    products.map(product => <div>
                        <li key = {product.id}>{product.productName}</li>
                        <p>{product.price}</p>
                        <p>{product.categoryName}</p>
                    </div>)
                }
            </ul>
        </div>
    )
}

export default Products