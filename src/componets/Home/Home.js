import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import fakedata from '../../fakeData/fakeaData'
import TravelPlace from '../TravelPlace/TravelPlace';
import './Home.css'

const Home = () => {
    const [travel, setTravel] = useState(fakedata);
    const [description, setDescription] = useState([]);
    const handleDescription =(id)=>{
        const toBeAddedKey= id;
        const sameDescription = fakedata.find(td=>td.id===toBeAddedKey);
        const { button, description, name, key} = sameDescription;
        setDescription({button, description, name, id, key});
    }

    const history = useHistory();
    const handleBooking= (travelId) =>{
        history.push(`/travel/${travelId}`)
    }

    return (
        <div className=" container row">
            <div  className="col-md-5 simple-design text-light">
            <h1 className='font-size'>{description.name}</h1>
            <p>{description.description}</p>
            <div className="po">
            <Button  onClick={()=>handleBooking(description.id)} variant="warning">{description.button}</Button>                

            </div>
            </div>

            <div  className="col-md-7">
                {
                travel.map(pn=> <TravelPlace handleDescription={handleDescription} key={pn.id} placeName={pn}></TravelPlace>)
                }
            </div>
        </div>
    );
};

export default Home;