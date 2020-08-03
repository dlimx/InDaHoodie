import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.css';

export default function Loading() {
  return (
    <div className="Loading">
      <ReactLoading type="bars" color="#007bff" />
    </div>
  );
}
