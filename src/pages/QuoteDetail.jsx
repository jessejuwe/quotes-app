import { Fragment, useEffect } from 'react';

import { useParams, Outlet } from 'react-router-dom';

import useHttp from '../hooks/hooks/use-http';
import { getSingleQuote } from '../lib/api';

import HightlightedQuote from '../components/quotes/HighlightedQuote';
import NotFound from './NotFound';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const QuoteDetail = () => {
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
      <HightlightedQuote author={quote.author} text={quote.text} />
      <Outlet />
    </Fragment>
  );
};

export default QuoteDetail;
