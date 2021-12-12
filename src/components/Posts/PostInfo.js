import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import classes from "./PostInfo.module.css";

const PostInfo = ({ data }) => {
  return (
    <div>
      <h4 className={classes.post__date}>
        {new Date(data.updatedAt).toLocaleDateString("en-Us", {
          month: "short",
          day: "numeric",
          weekday: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </h4>
      <h3 className={classes.post__title}>{data.title}</h3>
      <div className={classes.post__body}>
        <div className={classes["post__body-info"]}>
          <p className={classes.post__description}>{data.description}</p>
          <p className={classes.post__price}>
            <span>Price:</span> {data.price}
          </p>
          <p className={classes.post__seller}>
            <span>Seller:</span> {data.author.username}
          </p>
          <p className={classes.post__location}>
            <span>Location: </span> {data.location}
          </p>
        </div>
        <div
          className={
            data.willDeliver
              ? classes["post__body-delivery"]
              : classes["post__body-delivery--none"]
          }
        >
          <h4>Will delivered?</h4>
          {data.willDeliver ? <CheckCircleIcon /> : <BlockIcon />}
        </div>
      </div>
    </div>
  );
};

export default PostInfo;
