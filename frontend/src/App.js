import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import SignInScreen from './screens/signInScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SignupScreen from './screens/SignupScreen';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
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
              <Form className="me-auto d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 bg-light"
                  aria-label="Search"
                />
                <Button variant="light">Search</Button>
              </Form>

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
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container classname="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
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
