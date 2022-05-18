import { useRef, useEffect } from 'react';

import useHttp from '../../hooks/hooks/use-http';
import { addComment } from '../../lib/api';

import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './NewCommentForm.module.css';

const NewCommentForm = props => {
  const { sendRequest, status, error } = useHttp(addComment);
  const { onAddedComment } = props;

  useEffect(() => {
    if (status === 'completed' && !error) onAddedComment();

    if (error) return <p className="centered">{error}</p>;
  }, [status, error, onAddedComment]);

  const commentTextRef = useRef();

  const submitFormHandler = event => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;

    // optional: Could validate here

    // send comment to server
    sendRequest({ commentData: { text: enteredText }, quoteID: props.quoteID });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {
        //prettier-ignore
        status === 'pending' && <div className='centered'><LoadingSpinner /></div>
      }
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
