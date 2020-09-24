import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { userContext } from '../../App';
import logo from '../../travel-guru-master/Logo.png'
import './Header.css'



const Header = () => {
    const [userLogIn, setUserLogIn] = useContext(userContext)
    return (
        <Navbar>
              <img className='logoDesign' src={logo} alt=""/>
            <Form inline>
                <FormControl style={{marginLeft:'80px',padding:'17px', marginRight:'80px'}}  type="text"  placeholder="Search your destination" className="ml-sm-2" />
            </Form>
            <Nav className="mr-auto">
                <Nav.Link className='fixed text-light'  href="news">News</Nav.Link>
                <Nav.Link className='fixed text-light' href="destination">Destination</Nav.Link>
                <Nav.Link className='fixed text-light' href="blog">Blog</Nav.Link>
                <Nav.Link className='fixed text-light'  href="home">Contact</Nav.Link>
               { userLogIn.name ?  <Button className='fixed' variant="warning" onClick={()=>setUserLogIn({})}>sign out </Button> : <Button className='fixed'  href="login" variant="warning">Login</Button>}
            </Nav>
        </Navbar>

    );
};

export default Header;