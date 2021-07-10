import React, { useEffect, useState } from 'react'
import './Createcat.css';
import { Link, useHistory, useParams } from "react-router-dom";
import axios from '../../axios';

function Createpro() {
    const history = useHistory();
    const param = useParams();
    const initialState = {
        product_id: '',
        cat_id: '',
        product_name: '',
        product_price: '',
        product_description: '',
        product_images: Object,
    }
    const [product, setProduct] = useState(initialState);
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState(false);
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        axios.get("/api/products").then(response => {
            setProducts(response.data);
        });
    }, []);

    useEffect(() => {
        if (param.id) {
            setOnEdit(true);
            products.map(pro => {
                if (pro._id === String(param.id)) {
                    setProduct(pro);
                    setImages(pro.product_images);
                }
            })
        } else {
            setOnEdit(false);
            setProduct(initialState);
            setImages(false);
        }
    }, [param.id, products])

    const onChangeInput = e => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }


    const createProduct = async e => {
        e.preventDefault()
        try {
            if (!images) return alert("No image uploaded")

            if (onEdit) {
                await axios.put(`/api/products/${product._id}`, { ...product, product_images: images });
                alert("Product Successfuly Updated!");
            } else {
                axios.post('/api/products', { ...product, product_images: images });
                setImages(false);
                setProduct(initialState);
                alert("Product Successfuly created!!");

            }
            history.push("/product");
        } catch (err) {
            console.log(err.response.data.msg);
        }
    }
    const handleUpload = async e => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            if (!file) return alert("File not exist");

            if (file.size > 1024 * 1024) return alert("Size too large");

            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.size !== 'image/jpg')
                return alert("file formate is not supported");

            let formData = new FormData();
            formData.append('file', file);

            const res = await axios.post('/api/upload', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            });
            setImages(res.data)
        } catch (err) {
            alert(err.response.data.msg)
        }

    }

    return (

        <div className='login'>
            <h3>{onEdit ? "Update Product" : "Add Product"}</h3>
            <div className="card">
                <div className="card-body">

                    <div className="form-group">
                        <label for="exampleFormControlFile1">Select image</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="exampleFormControlFile1"
                            name="file"
                            onChange={handleUpload}
                        />

                    </div>
                    <form >

                        <div className="form-group">
                            <label for="exampleInputPassword1">Product id</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Product id"
                                name="product_id"
                                value={product.product_id}
                                onChange={onChangeInput}
                                disabled={onEdit}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Category id</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Category id"
                                name="cat_id"
                                value={product.cat_id}
                                onChange={onChangeInput}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Product name"
                                name="product_name"
                                value={product.product_name}
                                onChange={onChangeInput}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Product Price</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Product Price"
                                name="product_price"
                                value={product.product_price}
                                onChange={onChangeInput}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Product description</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Product description"
                                name="product_description"
                                value={product.product_description}
                                onChange={onChangeInput}
                            ></input>
                        </div>

                        <Link to={"/product"}><button type="submit" className="btn btn-dark" onClick={createProduct}>{onEdit ? "Update" : "Create"}</button></Link>
                       
                        <Link to={"/product"}><button type="submit" className="btn btn-dark">Cancel</button></Link>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default Createpro