import { Fragment, useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';

import useHttp from '../hooks/hooks/use-http';
import { getSingleQuote } from '../lib/api';

import Comments from '../components/comments/Comments';
import HightlightedQuote from '../components/quotes/HighlightedQuote';
import NotFound from './NotFound';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const { quoteID } = params;

  // prettier-ignore
  const { sendRequest, status, data: quote, error } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);

  // prettier-ignore
  if (status === 'pending') return <div className='centered'><LoadingSpinner/></div>;

  if (error) return <p className="centered">{error}</p>;

  if (!quote.text) return <NotFound />;

  return (
    <Fragment>
      <HightlightedQuote
        author={quote.author}
        id={quote.id}
        text={quote.text}
      />
      <Route path={match.path} exact>
        <div className="centered">
          <Link to={`${match.url}/comments`} className="btn--flat">
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
