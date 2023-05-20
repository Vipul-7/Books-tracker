import { useState } from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  const [showDesc, setShowDesc] = useState(false);
  const showDescHandler = () => {
    setShowDesc(!showDesc);
  };

  return (
    <div>
      <div className={classes["card-box"]}>
        <section className={classes.img}>
          <img src={props.image} alt={props.image_alt} />
        </section>
        <section className={classes.data}>
          <div className={classes.title}>
            <h2>{props.title}</h2>
          </div>
          <div className={classes.author}>
            <h4>
              <span style={{ fontSize: "24px" }}>By</span>{" "}
              {props.authors.map((author, index) =>
                index !== props.authors.length - 1 ? `${author}, ` : `${author}`
              )}
            </h4>
          </div>
          <section className={classes.additional}>
            <div>
              Categorie(s) -{" "}
              {props.categories.map((cate, index) =>
                index !== props.categories.length - 1 ? `${cate}, ` : `${cate}`
              )}
            </div>
            <div>Language - {props.language}</div>
            <div>Pages - {props.pages}</div>
          </section>
        </section>
      </div>
      {showDesc && <p className={classes.description}>{props.description}</p>}
      <section className={classes.buttons}>
        {!showDesc && (
          <button onClick={showDescHandler} type="button">
            Show description
          </button>
        )}
        {showDesc && (
          <button onClick={showDescHandler} type="button">
            Hide description
          </button>
        )}
      </section>
    </div>
  );
};

export default Card;
