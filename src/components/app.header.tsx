'use client'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { FaUser, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { 
    setBlogToSearch
} from '@/app/Redux/blogSlice';

export default function Appheader() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();
    const router = useRouter();

    const { 
        blogToSearch
    } = useSelector((state: any) => state.blog);


    useEffect(() => {
        const userData = sessionStorage.getItem('user');
        if (userData) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = '/';
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/blogs?content=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Search failed');
            }
            const data = await response.json();
            setSearchResults(data);
            dispatch(setBlogToSearch(data));
            router.push('/blog')
        } catch (error) {
            console.error('Error searching:', error);
        }
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
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Search content..."
                            className="me-2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-success" type="submit">
                            <FaSearch />
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
