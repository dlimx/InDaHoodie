import React, { useState } from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

import './ProductAdd.css';
import api from '../../api/api';

export default function ProductAdd() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [designer, setDesigner] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [error, setError] = useState('');

  const validate = (data) => {
    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string(),
      designer: yup.string(),
      category: yup.string(),
      price: yup.number().required(),
    });
    return schema.validate(data);
  };

  const onNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const onPriceChange = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };
  const onDescriptionChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };
  const onDesignerChange = (e) => {
    e.preventDefault();
    setDesigner(e.target.value);
  };
  const onCategoryChange = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      description,
      designer,
      category,
      price,
    };
    validate(data)
      .then((validatedData) => {
        api.post('/product', validatedData).then((apiData) => {
          setError('');
          history.push('/');
        });
      })
      .catch((invalidMessage) => {
        setError(invalidMessage.message);
      });
  };

  return (
    <div className="ProductAddForm">
      <h1>Add Product</h1>
      <div className="form-group">
        <input
          type="text"
          className="form-control ProductAddFormInput"
          placeholder="Name"
          value={name}
          onChange={onNameChange}
        />
        <textarea
          type="text"
          className="form-control ProductAddFormInput ProductAddFormInputArea"
          placeholder="Description"
          value={description}
          onChange={onDescriptionChange}
        />
        <div className="Row">
          <span className="ProductAddFormInputLabel">Price:</span>
          <input
            type="number"
            className="form-control ProductAddFormInput"
            placeholder="Price"
            value={price}
            onChange={onPriceChange}
          />
        </div>
        <input
          type="text"
          className="form-control ProductAddFormInput"
          placeholder="Designer"
          value={designer}
          onChange={onDesignerChange}
        />
        <input
          type="text"
          className="form-control ProductAddFormInput"
          placeholder="Category(s)"
          value={category}
          onChange={onCategoryChange}
        />
        {error ? <p className="text-danger">{error}</p> : null}
      </div>
      <button
        type="submit"
        className="btn btn-primary ProductAddButton"
        onClick={onSubmit}
      >
        Add Product
      </button>
    </div>
  );
}
