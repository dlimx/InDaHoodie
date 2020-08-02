import React, { useState } from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

import api from '../../api/api';

export default function CustomerAdd() {
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthDate] = useState('');
  const [image, setImage] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [error, setError] = useState('');

  const validate = (data) => {
    const schema = yup.object().shape({
      first_name: yup.string().required(),
      last_name: yup.string().required(),
      birthdate: yup.date().nullable().default(null),
      address: yup.string(),
      city: yup.string(),
      zip: yup.string(),
      state: yup.string(),
      image: yup.string(),
    });
    return schema.validate(data);
  };

  const onFirstNameChange = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };
  const onLastNameChange = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
  };
  const onBirthDateChange = (e) => {
    e.preventDefault();
    setBirthDate(e.target.value);
  };
  const onImageChange = (e) => {
    e.preventDefault();
    setImage(e.target.value);
  };
  const onAddressChange = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };
  const onCityChange = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };
  const onZipChange = (e) => {
    e.preventDefault();
    setZip(e.target.value);
  };
  const onStateChange = (e) => {
    e.preventDefault();
    setState(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      city,
      state,
      zip,
      address,
      image,
      birthdate,
    };

    if (!data.birthdate) {
      data.birthdate = undefined;
    }

    validate(data)
      .then((validatedData) => {
        api.post('/customer/create', validatedData).then((apiData) => {
          setError('');
          history.push('/customer');
        });
      })
      .catch((invalidMessage) => {
        setError(invalidMessage.message);
      });
  };

  return (
    <div className="AddForm">
      <h1>Add Customer</h1>
      <div className="form-group">
        <div className="Row">
          <input
            type="text"
            className="form-control AddFormInput"
            placeholder="First Name"
            value={firstName}
            onChange={onFirstNameChange}
          />
          <span className="Separator" />
          <input
            type="text"
            className="form-control AddFormInput"
            placeholder="Last Name"
            value={lastName}
            onChange={onLastNameChange}
          />
        </div>
        <div className="Row">
          <span className="AddFormInputLabel">Birth Date:</span>
          <input
            type="date"
            className="form-control AddFormInput"
            placeholder="Birth Date"
            value={birthdate}
            onChange={onBirthDateChange}
          />
        </div>
        <input
          type="text"
          className="form-control AddFormInput"
          placeholder="Address"
          value={address}
          onChange={onAddressChange}
        />
        <div className="Row">
          <input
            type="text"
            className="form-control AddFormInput"
            placeholder="City"
            value={city}
            onChange={onCityChange}
          />
          <span className="Separator" />
          <input
            type="text"
            className="form-control AddFormInput"
            placeholder="State"
            value={state}
            onChange={onStateChange}
          />
          <span className="Separator" />
          <input
            type="text"
            className="form-control AddFormInput"
            placeholder="Zip"
            value={zip}
            onChange={onZipChange}
          />
        </div>
        <input
          type="text"
          className="form-control AddFormInput"
          placeholder="Image"
          value={image}
          onChange={onImageChange}
        />
        {error ? <p className="text-danger">{error}</p> : null}
      </div>
      <button
        type="submit"
        className="btn btn-primary AddButton"
        onClick={onSubmit}
      >
        Add Customer
      </button>
    </div>
  );
}
