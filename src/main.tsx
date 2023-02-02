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
import AdminRoot from './pages/AdminRoot';
import AdminAnimesList, { loader as adminAnimesListLoader } from './pages/AdminAnimesList';
import AdminIndex from './pages/AdminIndex';
import InsertAnimePage, { loader as insertAnimePageLoader, action as insertAnimeAction } from './pages/InsertAnimePage';
import EditAnimePage, { loader as editAnimePageLoader, action as editAnimePageAction } from './pages/EditAnimePage';
import DeleteAnimePage, { loader as deleteAnimePageLoader, action as deleteAnimePageAction } from './pages/DeleteAnimePage';
import AdminCategoriesList, { loader as adminCategoriesListLoader } from './pages/AdminCategoriesList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminCategoryDetails, { loader as adminCategoryDetailsLoader } from './pages/AdminCategoryDetails';

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
          },
          {
            path: 'admin',
            element: <AdminRoot />,
            children: [
              {
                errorElement: <ErrorComponent />,
                children: [
                  {
                    index: true,
                    element: <AdminIndex />
                  },
                  {
                    path: 'animes',
                    element: <AdminAnimesList />,
                    loader: adminAnimesListLoader
                  },
                  {
                    path: 'animes/create',
                    element: <InsertAnimePage />,
                    loader: insertAnimePageLoader,
                    action: insertAnimeAction
                  },
                  {
                    path: 'animes/edit/:id',
                    element: <EditAnimePage />,
                    loader: editAnimePageLoader,
                    action: editAnimePageAction
                  },
                  {
                    path: 'animes/delete/:id',
                    element: <DeleteAnimePage />,
                    loader: deleteAnimePageLoader,
                    action: deleteAnimePageAction
                  },
                  {
                    path: 'categories',
                    element: <AdminCategoriesList />,
                    loader: adminCategoriesListLoader
                  },
                  {
                    path: 'categories/:id',
                    element: <AdminCategoryDetails />,
                    loader: adminCategoryDetailsLoader
                  }
                ]
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
    <ToastContainer />
  </React.StrictMode>,
)
