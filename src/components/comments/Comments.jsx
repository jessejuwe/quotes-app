import { useState, useEffect, useCallback } from 'react';

import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/hooks/use-http';
import { getAllComments } from '../../lib/api';

import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm';

import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './Comments.module.css';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const params = useParams();
  const { quoteID } = params;

  // prettier-ignore
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  // prettier-ignor
  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteID);
    setIsAddingComment(false);
  }, [sendRequest, quoteID]);

  let comments;

  // prettier-ignore
  if (status === 'pending') comments = <div className='centered'><LoadingSpinner/></div>;

  if (status === 'completed' && loadedComments && loadedComments.length > 0)
    comments = <CommentsList comments={loadedComments} />;

  // prettier-ignore
  if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) 
    comments = <p className="centered">No comments were added...yet</p>;

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteID={quoteID}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
