import React, { useState } from "react";
import PostCard from "../../components/postCard/PostCard";
import "./Feed.css";
import SearchBar from "../../components/searchBar/SearchBar";

function Feed(props) {
  const [postCards, setPostCards] = useState([]);

  return (
    <>
      <div className="pagePostCard">
        <div className="feedTitle"><img className="imageWhatWouldYou" src="images\WhatWouldYou.png" alt="" /></div>

        <SearchBar postCards={postCards} setPostCards={setPostCards} />
        <div className="feedContainer">
          <PostCard postCards={postCards} setPostCards={setPostCards} />
        </div>
      </div>
    </>
  );
}

export default Feed;
