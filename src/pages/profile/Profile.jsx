import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { dataBase } from "../../Config/firebaseConfig";
import { useDropzone } from "react-dropzone";
import Avatar from "@mui/material/Avatar";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [avatarUrl, setAvatarUrl] = useState(
    localStorage.getItem("avatarUrl") || user?.avatarUrl || ""
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      try {
        if (user) {
          const usersCollectionRef = collection(dataBase, "users");
          const userQuery = query(
            usersCollectionRef,
            where("uid", "==", user.uid)
          );
          const userDocs = await getDocs(userQuery);

          if (userDocs.size === 1) {
            const userDoc = userDocs.docs[0];

            await updateDoc(doc(dataBase, "users", userDoc.id), {
              avatarUrl: reader.result,
            });

            localStorage.setItem("avatarUrl", reader.result);
            setAvatarUrl(reader.result);

            // Fetch user details again after updating the avatar
            const updatedUserDocs = await getDocs(userQuery);
            if (updatedUserDocs.size === 1) {
              const updatedUserData = updatedUserDocs.docs[0].data();

              setFirstName(updatedUserData.firstName);
              setLastName(updatedUserData.lastName);
              setEmail(updatedUserData.email);
            } else {
              console.error(
                "User document not found or multiple documents found."
              );
            }
          } else {
            console.error(
              "User document not found or multiple documents found."
            );
          }
        }
      } catch (error) {
        console.error("Error updating document:", error);
      }
    };
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    // Fetch avatar URL from local storage
    const storedAvatarUrl = localStorage.getItem("avatarUrl");

    // If avatar URL is present in local storage, set it to state
    if (storedAvatarUrl) {
      setAvatarUrl(storedAvatarUrl);
    }

    return () => {
      // Clean up: remove avatar URL from local storage when component unmounts
      localStorage.removeItem("avatarUrl");
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersCollectionRef = collection(dataBase, "users");
        const userQuery = query(
          usersCollectionRef,
          where("uid", "==", user.uid)
        );
        const userDocs = await getDocs(userQuery);

        if (userDocs.size === 1) {
          const userData = userDocs.docs[0].data();

          // Set the avatar URL to state and local storage
          setAvatarUrl(userData.avatarUrl);
          localStorage.setItem("avatarUrl", userData.avatarUrl);

          // Set other user details to state
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setEmail(userData.email);
        } else {
          console.error("User document not found or multiple documents found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <div className="profileDiv">
      <div className="profileContainer">
        <div
          className="avatarContainer"
          {...getRootProps()}
          style={{ cursor: "pointer" }}
        >
          <Avatar src={avatarUrl} alt="Avatar" />
          <div className="avatarOverlay">
            <p>Click or drag an image here to upload</p>
          </div>
        </div>
        <div className="ProfileDetailsDiv">
          <h3>
            {firstName} {lastName}  {email}
          </h3>
        </div>
      </div>
      <div className="MoreDetailsContainer">
        <div className="MoreDetails">
          {/* <h2>{email}</h2> */}
          <img className="workIn" src="images\workInProgress.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
