import React, { useContext, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { dataBase } from "../../Config/firebaseConfig";
import { UserContext } from "../../context/UserContext";
import dayjs from 'dayjs';
import "./AddPost.css";

const amount = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 4,
    label: "3",
  },
  {
    value: 5,
    label: "4",
  },
];

const category = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "FastFood",
    label: "Fast Food",
  },
  {
    value: "Italian",
    label: "Italian",
  },
  {
    value: "Asian",
    label: "Asian",
  },
  {
    value: "Vegan",
    label: "Vegan",
  },
  {
    value: "Vegetarian",
    label: "Vegetarian",
  },
  {
    value: "Carnivore",
    label: "Carnivore",
  },
];

function AddPost(props) {
  const { user } = useContext(UserContext);
  const [postCard, setPostCard] = useState({});
  const [ErrMsg, setErrMsg] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [postSubmitted, setPostSubmitted] = useState(false);
  const { image, setImage } = props;

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          console.log("User location:", { latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const postCardCollectionRef = collection(dataBase, "PostCollection");

  // const changeHandler = (e) => {
  //   postCard[e.target.name] = e.target.value;
  //   console.log(postCard);
  //   setPostCard({ ...postCard });
  // };

  const changeHandler = (e) => {
    setPostCard({
      ...postCard,
      [e.target.name]: e.target.value,
    });
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const postCardDoc = await addDoc(postCardCollectionRef, {
        ...postCard,
        date: new Date().toString(),
        user: user.uid,
        image: image,
        userName: user.email,
      });
      console.log({ postCardDoc });

      // Get the new document
      const postRef = doc(dataBase, "PostCollection", postCardDoc.id);
      const newDoc = await getDoc(postRef);
      setPostCard({ ...newDoc.data(), id: newDoc.id });
      setPostSubmitted(true);
    } catch (error) {
      setErrMsg("Something went wrong");
    }
  };


  const handleTimeChange = (newValue) => {
    setSelectedDate(newValue);
    const formattedTime = dayjs(newValue).format();
    setPostCard({ ...postCard, pickupTime: formattedTime });
  };


  const preset_key = "ml_default";
  const cloud_name = "djmlunvsl";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    !formData.append("upload_preset", preset_key);

    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    fetch(apiUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.secure_url) {
          setImage(data.secure_url);
        } else {
          console.error("Error uploading image to Cloudinary");
        }
      })
      .catch((err) => console.error(err));
  };

  console.log("postCard:", postCard);




  return (
    <div className="page">
      <div className="addPostTitle">
        <img className="addPostImageTitle" src="images\Add post.png" alt="" />
      </div>

      {!postSubmitted && ( // Show form if post is not submitted
        <form onChange={changeHandler}>
          <div className="containerAddPost">
            <TextField
              id="standard-basic"
              label="dish name"
              name="dishName"
              variant="standard"
            />
            {/* <TextField
            id="standard-basic"
            label="pickup time"
            name="pickupTime"
            variant="standard"
          /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker']}>
                <TimePicker
                  label="pickup time"
                  value={selectedDate}
                  onChange={handleTimeChange}
                />
              </DemoContainer>
            </LocalizationProvider>

            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="selectContainer">
                <TextField
                  onChange={changeHandler}
                  name="amount"
                  id="standard-select-currency"
                  select
                  label="amount by dishes"
                  defaultValue="1"
                  helperText="Please select amount"
                  variant="standard"
                >
                  {amount.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  onChange={changeHandler}
                  name="category"
                  id="standard-select-currency"
                  select
                  label="category"
                  defaultValue="All"
                  helperText="Please select your category"
                  variant="standard"
                >
                  {category.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <TextField fullWidth label="notes" name="notes" id="fullWidth" />
            </Box>

            <button type="button" onClick={getLocation}>
              Get GPS Location
            </button>
            {userLocation && (
              <p>
                Latitude: {userLocation.latitude}, Longitude:{" "}
                {userLocation.longitude}
              </p>
            )}

            <div className="input-group">
              <label htmlFor="image"></label>
              <br />
              <input
                type="file"
                accept="image/*"
                id="image"
                name="image"
                onChange={handleFileChange}
              />
              <label htmlFor="image" className="fileLabel">
                <div className="imageInputDiv">
                  <img
                    className="image"
                    src="https://cdn.pixabay.com/photo/2017/11/10/04/47/image-2935360_640.png"
                    alt=""
                    srcset=""
                  />
                  {/* <span className='imageInputText'>Upload Picture</span> */}
                </div>
              </label>
            </div>
            <img className="addPostImg" src={image} alt="" />
          </div>
          <div className="BtnForPostDiv">
            <button className="BtnForPost" onClick={submitHandler} type="submit">
              post
            </button>
          </div>
        </form>
      )}
      {postSubmitted && (
        <>
        <h2>Post submitted successfully!</h2>
        <div className="summaryScreen">    
          <h2>Post Summary:</h2>
          <div>
          <p>Dish Name: {postCard.dishName}</p>
          <p>Pickup Time: {dayjs(postCard.pickupTime).format('YYYY-MM-DD HH:mm')}</p>
          <p>Amount: {postCard.amount}</p>
          <p>Category: {postCard.category}</p>
          <p>Notes: {postCard.notes}</p>
          </div>
          <p><img className="imageSummary" src={postCard.image} alt="Post Image" /></p>


        </div>
                  <button className="BtnForPost" onClick={() => setPostSubmitted(false)}>
            New post 
          </button>
          </>
      )}
    </div>
  );
}

export default AddPost;





