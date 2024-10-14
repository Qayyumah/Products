import React, { useState } from 'react';
import '../css/addProduct.css'
import { Link } from 'react-router-dom';

const AddProducts = () => {
    const [productDetails, setProductDetails] = useState({
        title: '',
        price: '',
    });
    const [productImage, setProductImage] = useState(null);
    const [products, setProducts] = useState([]); // Array to hold multiple products
    const [submitted, setSubmitted] = useState(false); // State to track submission

    const handleChange = (event) => {
        setProductDetails({
            ...productDetails,
            [event.target.name]: event.target.value
        })
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProductImage(URL.createObjectURL(file)); // Create a URL for the image
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newProduct = {
            title: productDetails.title,
            price: productDetails.price,
            image: productImage,
        };

        setProducts([...products, newProduct]); // Add new product to the list
        setSubmitted(true); // Set submitted to true

        // Reset form fields
        setProductDetails({ title: '', price: '' });
        setProductImage(null);
    };

    return (
        <div>

        {submitted?null:
            <div className="containerAdd">
                <Link to='/'>back</Link>
                <h2>Add Products</h2>
                <form onSubmit={handleSubmit}>
                    <label className="label" htmlFor="productTitle">Product Title</label>
                    <input
                        className="input"
                        type="text"
                        name="title"
                        id="productTitle"
                        
                        onChange={handleChange}
                    />

                    <label className="label" htmlFor="productPrice">Price</label>
                    <input
                        className="input"
                        name="price"
                        id="productPrice"
                        value={productDetails.price}
                        onChange={handleChange}
                        step="0.01"
                    />

                    <label className="label" htmlFor="productImage">Upload Image</label>
                    <input
                        className="input"
                        type="file"
                        id="productImage"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <button className="button" type="submit">Add Product</button>
                </form>

                
            </div>
        }
            {submitted && (
                <>
                    <div className='new-product'>
                        <h2>New Products</h2>
                        <button onClick={()=>setSubmitted(false)}>Add New Product</button>
                    </div>
                    <div className="product-list">
                        {products.map((product, index) => (
                            <div key={index} className="product-item">
                                {product.image && (
                                    <img src={product.image} alt={product.title} className="preview-image" />
                                )}
                                <div className='tags'>
                                    <h4>{product.title}</h4>
                                    <p>Price: ${product.price}</p>
                                    <button>Add to cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default AddProducts;
