import React, { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SignIn from "../signIn/SignIn";
import SignUp from "../signUp/SignUp";
import { UserContext } from "../../context/UserContext";
import { ThemeContext } from "../../context/Theme";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  const auth = getAuth();
  const { toggleTheme, selectedTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const controlNavbar = () => {
    if (window.scrollY > 250) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const themeClass =
    selectedTheme.backgroundImage === "url('darkened.png')"
      ? "darkMode"
      : "lightMode";

  const changeSunMoon =
    selectedTheme.backgroundImage === "url('darkened.png')" ? "sun" : "moon";

  const [signInModalOpen, setSignInModalOpen] = useState(false);

  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const handleSignInOpen = () => {
    setSignInModalOpen(true);
  };

  const handleSignInClose = () => {
    setSignInModalOpen(false);
  };

  const handleSignUpOpen = () => {
    setSignUpModalOpen(true);
  };

  const handleSignUpClose = () => {
    setSignUpModalOpen(false);
  };
  console.log(user);

  return (
    <div>
      <Navbar
        expand="lg"
        className={` NavBarDiv activeNav ${show && "hidden"}`}
      >
        <Container className={isNavOpen ? "navOpenBackground" : ""}>
          <Navbar.Brand href="/home">
            <img src="../../images/ResQeat-removebg-preview.png" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleNavToggle}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto navbar-light">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/feed">Feed</Nav.Link>
              <Nav.Link href="/addPost">Add Post</Nav.Link>
              <Nav.Link href="/Maps">Map</Nav.Link>

            </Nav>
            <Nav className="ml-auto">
              <div className='AuthDivNav'>
                {user ? (
                  <div className="DivForSignOutBtn">
                    <Link to={"/profile"} >
                    <i className="fa-regular fa-circle-user"></i>
                    </Link>
                    <button
                      className={`SignOutBtn ${themeClass}`}
                      onClick={() => signOut(auth)}
                    >
                      Sign Out
                    </button>
                    <button className={`MoonSun ${themeClass}`} onClick={toggleTheme}>
                      <i className={`fa-solid fa-${changeSunMoon}`}></i>
                    </button>
                  </div>
                ) : (
                  <div className="DivForAuthDisplay">
                    <Button onClick={handleSignInOpen}>Sign In</Button>
                    <Modal
                      open={signInModalOpen}
                      onClose={handleSignInClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      disablePortal
                      keepMounted
                    >
                      <SignIn isOpen={signInModalOpen} onClose={handleSignInClose} />
                    </Modal>

                    <Button onClick={handleSignUpOpen}>Sign Up</Button>
                    <Modal
                      open={signUpModalOpen}
                      onClose={handleSignUpClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <SignUp isOpen={signUpModalOpen} onClose={handleSignUpClose} />
                    </Modal>
                  </div>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
