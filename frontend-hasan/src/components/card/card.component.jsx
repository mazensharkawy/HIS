import React from 'react';
import img from './doctor-img2.png';


import './card.styles.css';

export const Card = props => (
  <div className='card-container'>
    <img
      alt=' image of doctor'
      src={img}
      
      className='imagedr'
    />
    <h2> {props.doctor.name} </h2>
    <p> {props.doctor.status} </p>
  </div>
);
