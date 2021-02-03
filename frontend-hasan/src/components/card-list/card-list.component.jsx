import React from 'react';

import { Card } from '../card/card.component';

import './card-list.styles.css';

export const CardList = props => (
  <div className='card-list'>
    {props.doctors.map(doctor => (
      <Card key={doctor.id} doctor={doctor} />
    ))}
  </div>
);
