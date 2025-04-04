
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './Header/Header';
import Loader from './Loader/Loader';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const Navigation = lazy(() => import('./Navigation/Navigation'));
const MovieCast = lazy(() => import('./MovieCast/MovieCast'));
const MovieDetailsPage = lazy(() =>
  import('../pages/MovieDetailsPage/MovieDetailsPage')
);
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const MovieReviews = lazy(() =>
  import('./MovieReviews/MovieReviews')
);
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));




export default function App() {

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="/movies/:movieId/cast" element={<MovieCast />} />
            <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};