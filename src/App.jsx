import React, { Suspense } from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

// Optimization using lazy loading
const Comments = React.lazy(() => import('./components/comments/Comments'));
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));
const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));

const App = () => {
  // prettier-ignore
  const fallbackUI = (<div className='centered'><LoadingSpinner/></div>)

  return (
    <Layout>
      <Suspense fallback={fallbackUI}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/quotes" />} />
          <Route path="/quotes" element={<AllQuotes />} />
          <Route path="/quotes/:quoteID/" element={<QuoteDetail />}>
            <Route
              path=""
              element={
                <div className="centered">
                  <Link to="comments" className="btn--flat">
                    Load Comments
                  </Link>
                </div>
              }
            />
            <Route path="comments" element={<Comments />} />
          </Route>
          <Route path="/new-quote" element={<NewQuote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
