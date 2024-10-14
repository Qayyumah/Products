// Importing necessary libraries and components
import React from 'react' // Importing React to use its features
import { useEffect, useState } from 'react' // Importing hooks for managing state and side effects
import '../css/Ecommerce.css' // Importing CSS styles for the component
import { Link } from 'react-router-dom' // Importing Link for navigation

// Defining the Ecommerce functional component
const Ecommerce = () => {
    // Declaring state variables using useState
    const [myProducts, setMyProducts] = useState([]) // Holds all products fetched from API
    const [productDisplay, setProductDisplay] = useState([]) // Holds products to display
    const [first, setFirst] = useState('') // Stores input value for search
    const [carts, setCarts] = useState([]) // Holds products added to the cart
    const [cartDisplay, setCartDisplay] = useState(false) // Controls cart visibility
    const [discountVisibility, setDiscountVisibility] = useState({}); // Controls discount visibility for products
    
    // useEffect to fetch products from API on component mount
    useEffect(() => {
        fetch('https://fakestoreapi.com/products/') // Fetching products from the fake store API
            .then(response => response.json()) // Parsing response as JSON
            .then(data => {
                setMyProducts(data) // Storing fetched products in state
                setProductDisplay(data) // Initial display of all products
                console.log(data) // Logging fetched data to console for debugging
            })
    }, []) // Empty dependency array means this runs once on mount

    // Function to filter products based on category
    const filter = (items) => {
        let allFilter = myProducts.filter((item) => {
            return item.category === items // Filtering products by category
        })
        setProductDisplay(allFilter) // Updating displayed products
    }

    // Function to add a product to the cart
    const addToCart = (myProducts) => {
        const newProduct = {
            title: myProducts.title, // Storing title of the product
            price: myProducts.price, // Storing price of the product
            // image: productImage, // Image property can be added if needed
        };
        setCarts([...carts, newProduct]) // Updating cart with new product
        setCartDisplay(true) // Displaying the cart
    }
    
    // Function to reload the page (though window.location is used incorrectly)
    let home = () => {
        window.location = 'reload' // This should likely be 'window.location.reload()'
    }

    // Function to handle search input changes
    let handleChange = (event) => {
        setFirst(event.target.value); // Updating search input state

        // Filtering products based on the search input
        const searchItems = myProducts.filter((myProduct) => {
            const { title } = myProduct
            return title.toLowerCase().includes(first.toLowerCase()) // Case insensitive search
        })
        setProductDisplay(searchItems) // Updating displayed products based on search
    }

    // Function to toggle discount visibility for a specific product
    const toggleDiscount = (productId) => {
        setDiscountVisibility(prev => ({
            ...prev,
            [productId]: !prev[productId] // Toggle the discount visibility state
        }));
    };

    // Rendering the component
    return (
        <div>
        {
            // Conditional rendering based on cartDisplay state
            cartDisplay ? null : 
        <div>
            <div className='container'>
                <div className='sub-container'>
                    <div>
                        <h1>Fstore</h1> {/* Store title */}
                    </div>
                    <form action="#" className="search"> {/* Search form */}
                        <input type="text" className="search-input" placeholder="search-products" onChange={(event) => {handleChange(event)}} />
                    </form>
                </div>
                <div className='buttons'>
                    {/* Category filter buttons */}
                    <button onClick={home}>All</button>
                    <button onClick={() => filter("men's clothing")}>Men's clothing</button>
                    <button onClick={() => filter("women's clothing")}>Women's clothing</button>
                    <button onClick={() => filter("jewelery")}>Jewelery</button>
                    <button onClick={() => filter("electronics")}>Electronics</button>
                    <button><Link to='/add'>Create Products</Link></button> {/* Link to create new products */}
                </div>
                
                <div className='sec'>
                    {
                        // Mapping over products to display them
                        productDisplay.map((myProduct) => {
                             return <div className='div' key={myProduct.id}>
                                <img src={myProduct.image} alt={myProduct.title} /> {/* Product image */}
                                <div className='tags'>
                                    <h5>{myProduct.title}</h5> {/* Product title */}
                                    <h6 style={{ textDecoration: discountVisibility[myProduct.id] ? 'line-through' : 'none' }}>
                                        ${myProduct.price} {/* Product price, possibly with strikethrough if discounted */}
                                    </h6>
                                    {discountVisibility[myProduct.id] && (
                                        <h6>
                                            Discounted: ${(myProduct.price * 0.9).toFixed(2)} {/* Display discounted price */}
                                        </h6>
                                    )}
                                    <button onClick={() => toggleDiscount(myProduct.id)}>
                                        {discountVisibility[myProduct.id] ? 'Hide Discount' : 'Show Discount'} {/* Button to toggle discount display */}
                                    </button>
                             
                                    <div className='btn'>
                                        <button onClick={(e) => addToCart(myProduct)}>ADD TO CART</button> {/* Button to add product to cart */}
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
            // Displaying cart when cartDisplay is true
            cartDisplay ?
        <div style={{ backgroundColor: 'white', color: 'black', padding: '50px 20px', minHeight: '100vh', backgroundColor: 'pink', marginBottom: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <h1>Add To Cart</h1>
                <button onClick={() => setCartDisplay(false)} style={{ border: 'none', backgroundColor: 'palevioletred', padding: '10px 10px', fontSize: '18px', color: '#fff' }}>Add New Item</button> {/* Button to return to product display */}
            </div>
            {
                // Mapping over cart items to display them
                carts.map((cart, index) => {
                    return <div key={index}>
                        <ul>
                            <li>
                                <h1>{cart.title}</h1> {/* Displaying cart item title */}
                                <p>{cart.price}</p> {/* Displaying cart item price */}
                            </li>
                        </ul>
                    </div>
                })
            }
        </div> : null
        }
       </div>
    )
}

// Exporting the Ecommerce component for use in other files
export default Ecommerce
