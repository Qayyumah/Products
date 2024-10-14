import React from 'react'
import { useEffect, useState } from 'react'
import '../css/Ecommerce.css'
import { Link } from 'react-router-dom'

const Ecommerce = () => {

    const [myProducts, setMyProducts] = useState([])
    const [productDisplay, setProductDisplay] = useState([])
    const [first, setFirst] = useState('')
    const [carts, setCarts] = useState([])
    const[cartDisplay, setCartDisplay] = useState(false)
    const [discountVisibility, setDiscountVisibility] = useState({});
    
    

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/').
            then(response => response.json()).
            then(data => {
                setMyProducts(data)
                setProductDisplay(data)
                console.log(data)
            })
    }, [])

    const filter = (items) => {
        let allFilter = myProducts.filter((item) => {
            return item.category === items
        })
        setProductDisplay(allFilter)
    }

    const addToCart = (myProducts)=>{
        
        const newProduct = {
            title: myProducts.title,
            price: myProducts.price,
            // image: productImage,
        };
        setCarts([...carts, newProduct])
        setCartDisplay(true)
    }
    
    let home = () => {
        window.location.reload()
    }

    let handleChange=(event)=>{
        setFirst(event.target.value);

        const searchItems = myProducts.filter((myProduct)=>{
            const {title} = myProduct
            return title.toLowerCase().includes(first.toLowerCase())
           
        })
        setProductDisplay(searchItems)
    }

    const toggleDiscount = (productId) => {
        setDiscountVisibility(prev => ({ 
            ...prev,
            [productId]: !prev[productId] 
        }));
    };

    return (
        <div>
        {
            cartDisplay?null:
        <div>
            <div className='container'>
                <div className='sub-container'>
                    <div>
                        <h1>Fstore</h1>
                    </div>
                    <form action="#" class="search">
                        <input type="text" class="search-input" placeholder="search-products" onChange={(event)=>{handleChange(event)}}></input>
                        
                    </form>
               
                </div>
                <div className='buttons'>
                    <button onClick={home}>All</button>
                    <button onClick={() => filter("men's clothing")}>Men's clothing</button>
                    <button onClick={() => filter("women's clothing")}>Women's clothing</button>
                    <button onClick={() => filter("jewelery")}>Jewelery</button>
                    <button onClick={() => filter("electronics")}>Electronics</button>
                    <button><Link to='/add'>Create Products</Link></button>
                </div>
                
                <div className='sec'>
                    {

                        productDisplay.map((myProduct) => {
                             return <div className='div' key={myProduct.id}>
                                <img src={myProduct.image}/>
                                <div className='tags'>
                                    <h5>{myProduct.title}</h5>
                                    <h6 style={{ textDecoration: discountVisibility[myProduct.id] ? 'line-through' : 'none' }}>
                                            ${myProduct.price}
                                        </h6>
                                        {discountVisibility[myProduct.id] && (
                                            <h6>
                                                Discounted: ${(myProduct.price * 0.9)}
                                            </h6>
                                        )}
                             
                                    <div className='btn'>
                                        <button onClick={() => toggleDiscount(myProduct.id)}>
                                            {discountVisibility[myProduct.id] ? 'Hide Discount' : 'Show Discount'}
                                        </button>
                     
                                        <button onClick={(e)=>addToCart((myProduct))}>ADD TO CART</button>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
               

                
            </div>
        </div>
        }
        
        {
            cartDisplay?
        <div style={{backgroundColor:'white', color:'black', padding:'50px 20px',  minHeight:'100vh', backgroundColor:'pink', marginBottom:'30px'}}>
            <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}}>
                <h1>Add To Cart</h1>
                <button onClick={()=>setCartDisplay(false)} style={{border:'none', backgroundColor:'palevioletred', padding:'10px 10px', fontSize:'18px', color:'#fff'}}>Add New Item</button>
            </div>
            {

                carts.map((cart)=>{
                    return <div>
                    
                        <ul>
                        
                            <li key={1}>
                                <h1>{cart.title}</h1>
                                <p>{cart.price}</p>
                            </li>
                        </ul>
                    </div>
                })
            }
        </div>:null
        }
       </div>
    )
}

export default Ecommerce