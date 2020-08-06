import React, { useEffect, useState } from 'react';
import './Filters.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import api from '../../api/api';
import { categoryData } from '../../data/categories';
import { designerData } from '../../data/designers';

export default function Filters() {
  const [categories, setCategories] = useState([]);
  const [designers, setDesigners] = useState([]);

  const [categoryName, setCategoryName] = useState('');
  const [designerName, setDesignerName] = useState('');

  useEffect(() => {
    api.get(`/category`).then(({ data }) => {
      // TODO - replace with real data
      setCategories(categoryData);
    });

    api.get(`/designer`).then(({ data }) => {
      // TODO - replace with real data
      setDesigners(data);
    });
  }, []);

  const onCategoryChange = (e) => {
    e.preventDefault();
    setCategoryName(e.target.value);
  };

  const onDesignerChange = (e) => {
    e.preventDefault();
    setDesignerName(e.target.value);
  };

  const onCategorySubmit = (e) => {
    e.preventDefault();
    if (!categoryName || !categoryName.trim()) return;
    api.post('/category/create', { name: categoryName }).then(({ data }) => {
      setCategories([...categories, data]);
      setCategoryName('');
    });
  };

  const onDesignerSubmit = (e) => {
    e.preventDefault();
    if (!designerName || !designerName.trim()) return;
    api.post('/designer/create', { name: designerName }).then(({ data }) => {
      setDesigners([...designers, data]);
      setDesignerName('');
    });
  };

  return (
    <>
      <Helmet>
        <title>InDaHoodie | Product Filters</title>
      </Helmet>
      <div className="FilterSection">
        <h1 className="Header FilterTitle">Categories</h1>
        {categories.map((category) => (
          <Link
            key={category.id}
            className="FilterItem"
            to={`/search?categories=${category.id}`}
          >
            {category.name}
          </Link>
        ))}
        <div className="form-group FilterForm">
          <label htmlFor="categoryForm">New Category</label>
          <div className="FilterRow">
            <input
              type="text"
              className="form-control FilterFormInput"
              id="categoryForm"
              placeholder="Category Name"
              onChange={onCategoryChange}
              value={categoryName}
            />
            <button
              type="submit"
              onClick={onCategorySubmit}
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="FilterSection">
        <h1 className="Header FilterTitle">Designers</h1>
        {designers.map((designer) => (
          <Link
            key={designer.id}
            className="FilterItem"
            to={`/search?designer=${designer.id}`}
          >
            {designer.name}
          </Link>
        ))}
        <div className="form-group FilterForm">
          <label htmlFor="designerForm">New Designer</label>
          <div className="FilterRow">
            <input
              type="text"
              className="form-control FilterFormInput"
              id="designerForm"
              placeholder="Designer Name"
              onChange={onDesignerChange}
              value={designerName}
            />
            <button
              type="submit"
              onClick={onDesignerSubmit}
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
