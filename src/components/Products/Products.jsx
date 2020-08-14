import React, { useEffect, useState, useMemo } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as qs from 'query-string';
import { useDebounce } from 'use-debounce';

import api from '../../api/api';
import ProductCard from '../shared/ProductCard';
import './Products.css';
import Icon from '../shared/Icon';
import Loading from '../shared/Loading';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText] = useDebounce(searchText, 250);

  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = '/product';

    // parse inside as this changes constantly
    const queryParams = qs.parse(location?.search);

    const params = {
      ...queryParams,
    };
    if (debouncedSearchText) {
      params.search = debouncedSearchText;
    }

    const queryString = qs.stringify(params);
    if (queryString) {
      url += `?${queryString}`;
    }

    api.get(url).then(({ data }) => {
      setProducts(data);
      setLoading(false);
    });
  }, [location.search, debouncedSearchText, location]);

  useEffect(() => {
    api.get(`/category`).then(({ data }) => {
      setCategories(data);
    });

    api.get(`/designer`).then(({ data }) => {
      setDesigners(data);
    });
  }, []);

  const onClickAdd = (e) => {
    e.preventDefault();
    history.push('/product/add');
  };

  const onKeyDownAdd = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      history.push('/product/add');
    }
  };

  const renderParams = qs.parse(location?.search, { parseNumbers: true });

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <Helmet>
        <title>InDaHoodie | Products</title>
      </Helmet>
      <div className="ProductsSearchContainer input-group input-group-lg">
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          style={{ width: '50px' }}
          placeholder="Search Products"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="ProductsCategoryContainer">
          {categories.map((category) => (
            <Link
              key={category.id}
              className={`ProductsFilterItem ${
                renderParams.category === category.id
                  ? 'ProductsFilterItemActive'
                  : ''
              }`}
              to={`/search?category=${category.id}`}
            >
              {category.name}
            </Link>
          ))}
          {designers.map((designer) => (
            <Link
              key={designer.id}
              className={`ProductsFilterItem ${
                renderParams.designer === designer.id
                  ? 'ProductsFilterItemActive'
                  : ''
              }`}
              to={`/search?designer=${designer.id}`}
            >
              {designer.name}
            </Link>
          ))}
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="ProductsContainer">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          <div
            className="ProductCard"
            role="button"
            onClick={onClickAdd}
            onKeyDown={onKeyDownAdd}
            tabIndex={0}
          >
            <div className="card ProductIconContainer ProductAddCard">
              <Icon icon="fa-camera" className="fa-3x" />
            </div>
            <div className="ProductTextContainer ProductAddCardText">
              <h5>Add New Product</h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
