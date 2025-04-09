'use client'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';

export default function Appheader() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Check if user data exists in localStorage
        
        // const userData = localStorage.getItem('user');
        const userData = sessionStorage.getItem('user');
        if (userData) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        // localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = '/';
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/" className='navbar-brand'>Todo_list</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className='nav-link'>Home</Nav.Link>
                        {!isLoggedIn ? (
                            <>
                                <Nav.Link href="/signin" className='nav-link'>Signin</Nav.Link>
                                <Nav.Link href="/signup" className='nav-link'>Signup</Nav.Link>
                            </>
                        ) : (
                            <NavDropdown
                                title={<FaUser />}
                                id="basic-nav-dropdown"
                                className='nav-link'
                            >
                                <NavDropdown.Item>{user?.email}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
