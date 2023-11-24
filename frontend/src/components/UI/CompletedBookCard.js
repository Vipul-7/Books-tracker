import classes from "./CompletedBookCard.module.css";

const CompletedBookCard = (props) => {
  return (
    <div className={classes.container}>
      <span className={classes["remove-button"]}>
        <button onClick={props.removeFromCompletedHandler}>
          <span>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <title>trash</title>
              <path d="M6 2l2-2h4l2 2h4v2h-16v-2h4zM3 6h14l-1 14h-12l-1-14zM8 8v10h1v-10h-1zM11 8v10h1v-10h-1z"></path>
            </svg>
          </span>
        </button>
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
