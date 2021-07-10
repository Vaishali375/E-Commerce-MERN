import React, { useEffect, useState } from 'react'
import './Createcat.css';
import { Link, useHistory, useParams } from "react-router-dom";
import axios from '../../axios';

function Createcat() {
    const history = useHistory();
    const param = useParams();
    const initialState = {
        cat_id: '',
        cat_name: '',
        cat_images: Object

    }
    const [category, setCategory] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState(false);
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        axios.get("/api/category").then(response => {
            setCategories(response.data);
        });
    }, []);

    useEffect(() => {
        if (param.id) {
            setOnEdit(true);
            categories.map(cat => {
                if (cat._id === String(param.id)) {
                    setCategory(cat);
                    setImages(cat.cat_images);
                }
            })
        } else {
            setOnEdit(false);
            setCategory(initialState);
            setImages(false);
        }
    }, [param.id, categories])

    const onChangeInput = e => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    }


    const createCategory = async e => {
        e.preventDefault()
        try {
            if (!images) return alert("No image uploaded")

            if (onEdit) {
                await axios.put(`/api/category/${category._id}`, { ...category, cat_images: images });
                alert("Category Successfuly updated!!");
            } else {
                axios.post('/api/category', { ...category, cat_images: images });
                setImages(false);
                setCategory(initialState);
                alert("Category Successfuly created!!");

            }
            history.push("/category");
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
            alert(err.response.data.msg);
        }

    }


    return (

        <div className='login'>
            <h3>{onEdit ? "Update Category" : "Add Category"}</h3>
            <div className="card cardd">
                <div className="card-body cordBodyy">

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
                            <label for="exampleInputPassword1">Category id</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Category id"
                                name="cat_id"
                                value={category.cat_id}
                                onChange={onChangeInput}
                                disabled={onEdit}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Category name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Category name"
                                name="cat_name"
                                value={category.cat_name}
                                onChange={onChangeInput}
                            ></input>
                        </div>

                        <Link to={"/category"}><button type="submit" className="btn btn-dark" onClick={createCategory}>{onEdit ? "Update" : "Create"}</button></Link>
                        <Link to={"/category"}><button type="submit" className="btn btn-dark">Cancel</button></Link>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default Createcat