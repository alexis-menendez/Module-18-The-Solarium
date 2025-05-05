// Module-18-The-Solarium/client/src/main.tsx

import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.tsx';
import './App.css';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

// Link to GraphQL endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Attach token to each request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// React Router routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      { index: true, element: <SearchBooks /> },
      { path: '/saved', element: <SavedBooks /> }
    ]
  }
]);

// Render App
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);


