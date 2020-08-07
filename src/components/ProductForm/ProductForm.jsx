import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { getPrice } from '../../util/util';
import api from '../../api/api';

export default function ProductForm({
  onSubmit: onSubmitProp,
  initialValues,
  onCancel: onCancelProp,
  submitText,
}) {
  const history = useHistory();
  const [name, setName] = useState(initialValues?.name ?? '');
  const [description, setDescription] = useState(
    initialValues?.description ?? '',
  );
  // const [designer, setDesigner] = useState(initialValues?.designer?.name ?? '');
  const [category, setCategory] = useState(() =>
    initialValues?.categories
      ?.map((initialCategory) => initialCategory.name)
      .join(', '),
  );
  const [image, setImage] = useState(initialValues?.image ?? '');
  const [price, setPrice] = useState(
    initialValues?.price ? getPrice(initialValues.price) : '',
  );
  const [error, setError] = useState('');
  const [designers, setDesigners] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // maybe I can ditched this GET request and utilize designer and setDesigner (initialValues)
    api.get('/designer').then(({ data }) => {
      setDesigners(data);
      setLoading(false); // not sure if needed, copied from users example in OrderCart.jsx
    });
  }, []);

  const validate = (data) => {
    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string(),
      designer_id: yup.number(), // need to be updated to designer_id?
      category: yup.string(),
      image: yup.string(),
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
  const onCategoryChange = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };
  const onImageChange = (e) => {
    e.preventDefault();
    setImage(e.target.value);
  };

  const onCancel = (e) => {
    e.preventDefault();
    if (onCancelProp) {
      onCancelProp();
    } else {
      history.goBack();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      description,
      designer_id: selectedDesigner,
      category,
      price,
    };
    validate(data)
      .then(onSubmitProp)
      .catch((invalidMessage) => {
        setError(invalidMessage.message);
      });
  };

  return (
    <div className="AddForm">
      <div className="form-group">
        <input
          type="text"
          className="form-control AddFormInput"
          placeholder="Name"
          value={name}
          onChange={onNameChange}
        />
        <textarea
          type="text"
          className="form-control AddFormInput AddFormInputArea"
          placeholder="Description"
          value={description}
          onChange={onDescriptionChange}
        />
        <div className="Row">
          <span className="AddFormInputLabel">Price:</span>
          <input
            type="number"
            className="form-control AddFormInput"
            placeholder="Price"
            value={price}
            onChange={onPriceChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="designer">Designer</label>
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select
            className="form-control"
            id="designer"
            value={selectedDesigner}
            onChange={(e) => setSelectedDesigner(e.target.value)}
          >
            <option />
            {designers.map((designer) => (
              <option key={designer.id} value={designer.id}>
                {designer.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          className="form-control AddFormInput"
          placeholder="Category(s)"
          value={category}
          onChange={onCategoryChange}
        />
        <input
          type="text"
          className="form-control AddFormInput"
          placeholder="Image"
          value={image}
          onChange={onImageChange}
        />
        {error ? <p className="text-danger">{error}</p> : null}
      </div>
      <div className="Row AddButton">
        <button type="submit" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          {submitText ?? 'Add Product'}
        </button>
      </div>
    </div>
  );
}

ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    designer: PropTypes.object, // does this need to be updated?
    categories: PropTypes.array,
  }),
  onCancel: PropTypes.func,
  submitText: PropTypes.string,
};
