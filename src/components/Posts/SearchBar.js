import { useState, useEffect } from "react";

import classes from "./SearchBar.module.css";

const SearchBar = ({ posts, setFilteredPosts }) => {
  const [searchInput, setSearchInput] = useState("");

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
  }, [searchInput, posts]);

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
