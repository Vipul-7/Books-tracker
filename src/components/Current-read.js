import ProgressBar from "@ramonak/react-progress-bar";
import { useRef, useState } from "react";
import classes from "./Current-read.module.css";

const CurrentRead = (props) => {
  const [completedProgressBar, setCompletedProgressBar] = useState(0);
  const readPagesInput = useRef();

  const addToProgessBarHandler = () => {
    const inputValue = readPagesInput.current.value;

    if (inputValue > props.Totalpages) {
      setCompletedProgressBar(100);
    } else if (inputValue < props.Totalpages) {
      setCompletedProgressBar(0);
    } else {
      setCompletedProgressBar(
        Math.floor((inputValue * 100) / props.Totalpages)
      );
    }
  };

  return (
    <div className={classes["book-card"]}>
      <section className={classes.Info}>
        <section className={classes.image_sec}>
          <img src={props.image} alt={props.image_alt} />
        </section>
        <section className={classes.texts}>
          <div className={classes.title}>
            <h1>{props.title}</h1>
          </div>
          <div className={classes.author}>
            <h4>
              {" "}
              <span>Written By </span>
              {props.authors.map((author) => `${author}      `)}
            </h4>
          </div>
          <div className={classes.extra}>
            <section className={classes.cate}>
              <h5>
                Categorie(s) - {props.categories.map((cate) => `${cate}`)}
              </h5>
            </section>
            <section className={classes.tp}>
              <h5>Total Pages - {props.Totalpages}</h5>
            </section>
          </div>
        </section>
      </section>
      <section className={classes.progress}>
        <section className={classes.progressBar}>
          <ProgressBar
            completed={completedProgressBar}
            className={classes.wrapper}
          />
        </section>
        <section className={classes["comp-pages"]}>
          Read{" "}
          {
            <input
              type="number"
              ref={readPagesInput}
              onBlur={addToProgessBarHandler}
            />
          }{" "}
          pages
        </section>
      </section>
    </div>
  );
};

export default CurrentRead;
