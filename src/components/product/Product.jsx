/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import Header from '../header/Header';

// Reducer
import { useStateValue } from '../../context/StateProvider';

// Firebase
import { getProduct } from '../../server/actions/actionsProducts';

export default function Product(props) {
  const [dataProduct, setDataProduct] = useState(false);

  const [state, dispatch] = useStateValue();

  const addToBasket = (e) => {

    const item = {
      id: dataProduct.id,
      title: dataProduct.name,
      description: dataProduct.description,
      price: parseFloat(dataProduct.price),
      rating: parseFloat(dataProduct.rating),
      image: dataProduct.image,
    }

    dispatch({
      type: 'ADD_ITEM_BASKET',
      item,
    });

    if (JSON.parse(localStorage.getItem('basket')) === null) {
      localStorage.setItem('basket', JSON.stringify([item]));
    } else {
      let localStorageCart = JSON.parse(localStorage.getItem('basket'));
      localStorageCart = [...localStorageCart, item];
      localStorage.setItem('basket', JSON.stringify(localStorageCart));
    }
  };

  useEffect(() => {
    const { id } = props.match.params;

    const resp = getProduct(id);

    resp.then((res) => {
      setDataProduct(res.data());
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  // console.log(id, name, description, image, price, rating);

  return (
    <div style={{ backgroundColor: 'white', height: '100vh', width: 'auto' }}>
      <Header />
      {(dataProduct)
        ? (
          <div className="container-fluid" style={{ marginTop: '30px' }}>
            <div className="row" style={{ paddingRight: '15px', backgroundColor: 'white' }}>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 mt-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={dataProduct.image} alt={dataProduct.name} style={{ height: '400px', width: '250px' }} />
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-3">
                <h3 className="lead">{dataProduct.description}</h3>
                <hr style={{ color: 'black', height: 'auto', width: '100%' }} />
                <ReactStars
                  value={dataProduct.rating}
                  size={24}
                  isHalf
                  edit={false}
                  activeColor="#ffd700"
                />
                <p style={{ fontSize: '0.9rem', marginTop: '20px' }}>
                  <strong></strong>

                  
                </p>
              </div>
              <div
                className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 mt-3"
                style={{
                  border: '1px solid #d6d6d6', borderRadius: '2px', padding: '15px',
                }}
              >
                <h4 style={{ color: '#B22A07', fontSize: '1.1rem' }}>
                  $
                  {dataProduct.price}
                </h4>
                <p style={{ color: '#DD0052', fontSize: '0.9rem' }}></p>
                <h3 style={{ color: 'green', fontSize: '1.1rem' }}>.</h3>
                <div style={{
                  height: 'auto',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '50px',
                }}
                >
                  <button
                    style={{
                      backgroundColor: '#F1C65B',
                      border: '1px solid grey',
                      height: '35px',
                      width: '200px',
                      borderRadius: '3px',
                      backgroundColor: '#f0c14b',
  borderRadius: '2px',
  width: '100%',
  height: '30px',
  border: '1px solid',
  marginTop: '10px',
  borderColor: '#a88734 #9c7e31 #846a29',
  color: '#111',
                    }}
                    type="button"
                    onClick={addToBasket}
                  >
                    <span className="lead" style={{ fontSize: '15px' }}>Add To Basket</span>
                  </button>
                </div>

                <div style={{
                  height: 'auto',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
                >
                  <button
                    style={{
                      
                      
                      backgroundColor: '#f0c14b',
  borderRadius: '2px',
  width: '100%',
  height: '30px',
  border: '1px solid',
  marginTop: '10px',
  borderColor: '#a88734 #9c7e31 #846a29',
  color: '#111',
 
                    }}
                  >
                    <span className="lead" style={{ fontSize: '15px' }}>Compra directa</span>
                  </button>
                </div>
                <hr style={{ color: 'black', height: 'auto', width: '100%' }} />
                <div style={{
                  height: 'auto', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '25px',
                }}
                >
                  <p style={{ marginBottom: '0px' }}>Add to Basket</p>
                </div>
                <hr style={{ color: 'black', height: 'auto', width: '100%' }} />
              </div>
            </div>
          </div>
        )
        : <h1></h1>}
    </div>
  );
}
