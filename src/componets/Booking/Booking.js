import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../../fakeData/fakadata'
import Room from '../Room/Room';
import './Booking.css'


const Booking = () => {
    const {bookingName} = useParams()
    const [rooms, setRooms] = useState(data);
    return (
        <div className='row container background-color d-flex-inline'>
            <div className='col-md-8'>
            <p>252 stays september 29-20 3 guests</p>
            <h4>Stay in {bookingName}</h4>
            {
                rooms.map(room=> <Room room={room}></Room>)
            }
            </div>
            <div className='col-md-4'>
            </div>
        </div>
    );
};

export default Booking;