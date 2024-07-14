import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CharacterDetails from './pages/CharacterDetails';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
