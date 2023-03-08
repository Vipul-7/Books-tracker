import classes from "./Current-read.module.css";

const CurrentRead = (props) => {
  return (
    <div className={classes["book-card"]}>
      <section className={classes.Info}>
        <section className={classes.image_sec}>
          <img src={props.image} alt={props.image_alt} />
        </section>
        <section className={classes.texts}>
          <div>
            <h1>{props.title}</h1>
          </div>
          <div>
            <h4> By {props.authors.map((author) => `${author}      `)}</h4>
          </div>
          <div>
            <h5>{props.categories.map((cate) => `${cate}`)}</h5>
            <h5>{props.Totalpages}</h5>
          </div>
        </section>
      </section>
      <section className={classes.progress}>
        <section className={classes["progress-bar"]}></section>
        <section className={classes["comp-pages"]}></section>
      </section>
    </div>
  );
};

export default CurrentRead;
