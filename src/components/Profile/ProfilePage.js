import { useState, useEffect } from "react";

import { apiBaseUrl } from "../../util/variables";
import makeheaders from "../../util/makeheaders";
import MessageInfo from "../Messages/MessageInfo";

import classes from "./ProfilePage.module.css";

const ProfilePage = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [userFetched, setUserFetched] = useState({ username: "", id: "" });
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`${apiBaseUrl}users/me`, {
        headers: makeheaders(user),
      });
      const result = await response.json();
      if (result.success) {
        setMessages(result.data.messages);
        setUserFetched({ username: result.data.username, id: result.data._id });
      }
    };
    if (user) {
      fetchMessages();
    }
  }, [user]);

  return (
    <>
      <h1 className={classes.profile__header}>
        PROFILE OF -{userFetched.username}-
      </h1>
      <div className={classes["to-me"]}>
        <h2 className={classes.profile__title}>&#8594;Messages received</h2>
        {messages
          .filter((message) => {
            return message.fromUser._id !== userFetched.id;
          })
          .map((message) => (
            <MessageInfo
              message={message}
              key={message._id}
              asReferenceToPost={true}
            />
          ))}
      </div>
      <div className={classes["from-me"]}>
        <h2 className={classes.profile__title}>Messages sent &#8594;</h2>
        {messages
          .filter((message) => {
            return message.fromUser._id === userFetched.id;
          })
          .map((message) => (
            <MessageInfo
              message={message}
              key={message._id}
              asReferenceToPost={false}
            />
          ))}
      </div>
    </>
  );
};

export default ProfilePage;
