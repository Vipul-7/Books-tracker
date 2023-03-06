import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={classes["card-box"]}>
      <section>
        <img src={props.image} alt={props.image_alt} />
      </section>
      <section className={classes.data}>
        <div className={classes.title}>
          <h2>{props.title}</h2>
        </div>
        <div className={classes.author}>
          <h4>By {props.authors.map((author) => `${author}      `)}</h4>
        </div>
        <section className={classes.additional}>
          <div>{props.categories.map((cate) => `${cate}`)}</div>
          <div>{props.language}</div>
          <div>{props.pages}</div>
        </section>
      </section>
    </div>
  );
};

export default Card;
