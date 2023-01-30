import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import ErrorComponent from './components/ErrorComponent';
import Animes, { loader as animesLoader } from './pages/Animes';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Root from './pages/Root';
import AnimeDetailsPage, { loader as animeDetailsLoader } from './pages/AnimeDetailsPage';
import Auth from './pages/Auth';
import LoginForm, { action as loginAction } from './components/LoginForm';
import UserPage, { loader as userLoader } from './pages/UserPage';

type BaseParams = {
  id: string;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorComponent />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: 'animes',
            element: <Animes />,
            loader: animesLoader
          },
          {
            path: 'animes/:id',
            element: <AnimeDetailsPage />,
            loader: animeDetailsLoader
          },
          {
            path: 'users/:id',
            element: <UserPage />,
            loader: userLoader
          },
          {
            path: 'auth',
            element: <Auth />,
            children: [
              {
                index: true,
                element: <LoginForm />,
                action: loginAction
              }
            ]
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
