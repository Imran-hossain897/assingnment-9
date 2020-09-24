import React from 'react';
import { Figure } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TravelPlace.css'

const TravelPlace = (props) => {
    const { name, image, id } = props.placeName;
    const { handleDescription } = props;
    
    return (
        <div className='d-inline-flex  ml-4 positon-design'>

            <Figure >
                <Link>
                    <Figure.Image className='hover-design' onClick={() => handleDescription(id)}
                        width={171}
                        height={180}
                        src={image}
                    />
                    </Link>
                    <h3 className='design-position text-light'>{name} </h3>
                
            </Figure>



        </div>



    );
};

export default TravelPlace;