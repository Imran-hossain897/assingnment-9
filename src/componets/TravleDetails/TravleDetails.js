import React from 'react';
import { Button, FormControl} from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import data from '../../fakeData/fakeaData'
import './TravelDetails.css'

const TravleDetails = () => {
    const { travelId } = useParams();
    const samePlace = data.find(pt => pt.id == travelId)
    const { name, details} = samePlace;

    const history = useHistory()
    const handleBooking = (bookingName) =>{
            history.push(`/booking/${bookingName}`)
    }

    return (
        <div className="row container d-inline-flex">
            <div className='text-light col-md-6 ml-3'>
                <h1>{name}</h1>
                <p>{details}</p>
            </div>

            <div className=' col-md-5 '>
                <div className=' form-label'>
                    <form action="submit">
                        <h6>Orgin</h6>
                            <div className="full">
                            <FormControl
                                required
                            />
                            <h6>Destination</h6>
                            <FormControl
                                value={name}
                                required
                            />
                            </div>
                            <div className="flex">
                           <div className="position">
                           <small>From</small>
                          <FormControl
                                aria-label="Large"
                                aria-describedby="inputGroup-sizing-sm"
                                type="date"
                                required
                            />
                           </div>
                           <div className="position">
                           <small>To</small>
                           <FormControl
                                type="date"
                                required
                            />
                           </div>
                             </div>
                             <Button type='submit' onClick={()=>handleBooking(name)} className="btn-lg top btn-warning">Start Booking</Button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default TravleDetails;