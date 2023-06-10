import { useState } from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  const [showDesc, setShowDesc] = useState(false);

  const showDescHandler = () => {
    setShowDesc(!showDesc);
  };

  return (
    <>
      <div className={classes.card}>
        <section className={classes["section-one"]}>
          <div className={classes.image}>
            <img src={props.image} alt={props.image_alt} />
          </div>
          <div className={classes.preview}>
            <button>
              <a className={classes["preview-link"]} href={props.previewLink}>
                Preview
              </a>
            </button>
          </div>
        </section>
        <section className={classes["section-two"]}>
          <div className={classes["title-details"]}>
            <h2>{props.title}</h2>
            <p>
              <span>Written by</span>
              {props.authors.join(", ")}
            </p>
          </div>
          <hr />
          <div className={classes["meta-details"]}>
            <ul>
              <li>{props.categories.join(", ")}</li>
              <span className={classes["middle-point"]}>.</span>
              <li>Pages ~ {props.pages}</li>
              <span className={classes["middle-point"]}>.</span>
              <li>{props.language}</li>
            </ul>
            <div className={classes.textSnippet}>
              <p>{props.textSnippet}</p>
            </div>
            <div className={classes["description__button"]}>
              <button onClick={showDescHandler}>
                {!showDesc ? "Show Description" : "Hide Description"}
              </button>
            </div>
          </div>
        </section>
      </div>
      {showDesc && (
        <div className={classes["description"]}>
          <p>{props.description}</p>
        </div>
      )}
    </>
  );
};

export default Card;
