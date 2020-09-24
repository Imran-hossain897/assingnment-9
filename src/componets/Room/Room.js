import React from 'react';
import './Room.css'
import icon from '../../travel-guru-master/Icon/star_1_.png'
const Room = (props) => {
    const { name, imag, price, roomType, need, review, capacity, } = props.room
    return (
        <div className='row back-container d-inline-flex'>
            <div className='col-md-6'>
                <img className='image-slice' src={imag} alt="" />
            </div>
            <div className='col-md-6 text-slice'>
                <h4>{name}</h4>
                <h6>{capacity}</h6>
                <h6>{roomType}</h6>
                <h6>{need}</h6>
                <p> <img className='icon-fixed' src={icon} alt=""/> 4.9 ({review}) <strong>${price}</strong>/night <small>$167 total</small></p>
            </div>
        </div>
    );
};

export default Room;