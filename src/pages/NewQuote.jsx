import { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import useHttp from '../hooks/hooks/use-http';
import { addQuote } from '../lib/api';

import QuoteForm from '../components/quotes/QuoteForm';

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);

  const history = useHistory();

  useEffect(() => {
    // allow users to go back a certain page
    if (status === 'completed') history.push('/quotes');
  }, [status, history]);

  const addQuoteHandler = quoteData => sendRequest(quoteData);

  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
