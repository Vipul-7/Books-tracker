import Card from "./UI/Card";
import classes from './BooksListExplore.module.css';

const BooksList = (props) => {
  return (
    <div >
      <Card
        id={props.id}
        title={props.title}
        authors={props.authors}
        categories={props.categories}
        image={props.image}
        description={props.description}
        language={props.language}
        pages={props.pages}
      />
      <div className={classes.desc}>
        {/* <p>{props.description}</p> */}
      </div>
    </div>
  );
};

export default BooksList;
