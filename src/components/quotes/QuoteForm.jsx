import { useState, useRef, Fragment } from 'react';
import { Prompt } from 'react-router-dom';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = props => {
  const [isEntering, setIsEntering] = useState(false);

  const authorInputRef = useRef();
  const textInputRef = useRef();

  const submitFormHandler = event => {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // TODO: Display error to user if form fields have error

    // Guard Clause
    // prettier-ignore
    if (enteredAuthor.trim().length === 0 || enteredText.trim().length === 0) return;

    props.onAddQuote({ author: enteredAuthor, text: enteredText });

    // TODO: Display a modal to user after validation
  };

  const formFocusedHandler = () => setIsEntering(true);
  const finishEnteringHandler = () => setIsEntering(false);

  // Prompt Message
  const message = location => 'Leave page? Entered Data will be lost!';

  return (
    <Fragment>
      <Prompt when={isEntering} message={message} />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
