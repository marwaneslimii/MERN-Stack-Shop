import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import SignInScreen from './screens/signInScreen';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SignupScreen from './screens/SignupScreen';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProfileScreen from './screens/ProfileScreen';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        {' '}
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="light" data-bs-theme="secondary">
            <Container>
              <Navbar.Brand>
                <img src="../images/iPhone14.jpg" height="60" alt="" />
                <span class="text-uppercase font-weight-bold">Zone</span>
              </Navbar.Brand>
              <LinkContainer to="/">
                <Navbar.Brand>Home</Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/">
                <Navbar.Brand>About Us</Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/">
                <Navbar.Brand>Services</Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/">
                <Navbar.Brand>Pricing</Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/">
                <Navbar.Brand>Contact Us</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
          <br />
          <Navbar bg="primary" data-bs-theme="dark">
            <Container>
              <Nav className="me-auto">
                <NavDropdown title="Categories" id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>SmartPhone</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>PC</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </Nav>
              {/*<Form className="me-auto d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 bg-light"
                  aria-label="Search"
                />
                <Button variant="light">Search</Button>
      </Form>*/}
              <SearchBox />

              <Nav className="ml-auto">
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container classname="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />{' '}
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved © 2023</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
