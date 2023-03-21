import classes from "./CompletedBookCard.module.css";

const CompletedBookCard = (props) => {
  return (
    <div className={classes.container}>
      <span className={classes["remove-button"]}>
        <button onClick={props.removeFromCompletedHandler}>Remove</button>
      </span>
      <section className={classes["img-section"]}>
        <img src={props.image} alt={props.image_alt} />
      </section>
      <section className={classes.details}>
        <h2>{props.title}</h2>
        <h4>
          <span style={{ fontSize: "26px" }}>By</span>{" "}
          {props.authors.map((author, index) =>
            index !== props.authors.length - 1 ? `${author}, ` : `${author}`
          )}
        </h4>
        <div className={classes["additional-details"]}>
          <h5>
            Categorie(s) :{" "}
            {props.categories.map((cate, index) =>
              index !== props.categories.length - 1 ? `${cate}, ` : `${cate}`
            )}
          </h5>
          <h5>Total pages : {props.pages}</h5>
        </div>
      </section>
    </div>
  );
};

export default CompletedBookCard;
