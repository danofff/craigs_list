import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./SearchBar.module.css";

const SearchBar = ({ setFilteredPosts }) => {
  const [searchInput, setSearchInput] = useState("");
  const posts = useSelector((state) => state.posts.posts);
  //whenever searchInput updated, check if string chunk exists in post
  useEffect(() => {
    const filteredPosts = posts.filter((post) => {
      return (
        post.author.username
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        post.location.toLowerCase().includes(searchInput.toLowerCase()) ||
        post.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        post.description.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setFilteredPosts(filteredPosts);
  }, [searchInput, posts, setFilteredPosts]);

  const onChangeSearchInputHandler = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <input
      className={classes.search__input}
      type="text"
      value={searchInput}
      onChange={onChangeSearchInputHandler}
      placeholder="Search in posts..."
    />
  );
};

export default SearchBar;
