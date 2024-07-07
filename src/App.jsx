import { useState, useContext } from 'react'
// import './App.css'
import NavBar from './Components/navBar/NavBar';
import SignIn from './Components/signIn/SignIn';
import SignUp from './Components/signUp/SignUp';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { ThemeContext } from "./context/Theme";
import Home from "./pages/home/Home";
import Feed from "./pages/feed/Feed";
import Profile from "./pages/profile/Profile";
import AddPost from "./pages/addPost/AddPost";
import Footer from './components/footer/Footer';
import Maps from './pages/maps/Maps';

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const { selectedTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  const [image, setImage] = useState();

  const handleToggleSignIn = () => {
    setShowSignIn((prev) => !prev);
  };

  return (
    <div style={{...selectedTheme}}>
         <BrowserRouter>

      <div >
      <NavBar />
      </div>
      {showSignIn && <SignIn onClose={handleToggleSignIn} />}

       {user ? (
          <Routes>
            <Route
              path="/home"
              element={
                <Home  />
              }
            />
            <Route
              path="/addPost"
              element={
                <AddPost image={image} setImage={setImage} />
              }
            />
                  <Route
              path="/profile"
              element={
                <Profile />
              }
              />
              <Route
          path="/Maps"
          element={
            <Maps />
          }
            />      
            <Route
            path="/feed"
            element={
              <Feed image={image} setImage={setImage} />
            }
          />
                  <Route
              path="/"
              element={
                <Home />
              }
            />
                <Route
              path="/signUp"
              element={
                <SignUp />
              }
            />
                <Route
              path="/signIn"
              element={
                <SignIn />
              }
            />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        ) : (
          <Routes>
           <Route
              path="/home"
              element={
                <Home  />
              }
            />

            <Route
              path="/"
              element={
                <Home />
              }
            />

<Route
              path="/addPost"
              element={
                <AddPost image={image} setImage={setImage} />
              }
            />
                  <Route
          path="/Maps"
          element={
            <Maps />
          } />
                  <Route
              path="/profile"
              element={
                <Profile />
              }
            />      
            <Route
            path="/feed"
            element={
              <Feed image={image} setImage={setImage}/>
            }
          />
          </Routes>
        )}
      </BrowserRouter>
   <Footer />  </div>
 
     
   
  );
};

export default App;

