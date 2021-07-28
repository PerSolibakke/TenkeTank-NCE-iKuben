import React from 'react';
import { Provider } from 'react-redux';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import store from './state/store';
import ErrorModal from './components/atoms/ErrorModal';
import Graphpage from './components/pages/Graphpage';
import frontpage from './components/pages/frontpage';
import Aboutpage from './components/pages/Aboutpage';
import NotFoundPage from './components/pages/NotFound';
import Navbar from './components/atoms/NavBar';

const App: React.FC = () => (
  <ChakraProvider>
    <Provider store={store}>
      <Flex
        bg="gray.50"
        m={0}
        minHeight="100vh"
        direction="column"
        overflow="hidden"
        color="gray.800"
      >
        <Router>
        <Navbar/>
          <ErrorModal />
          <Box flex="1">
            <Switch>
            <Route path="/" exact component={frontpage} />
              <Route path="/graphpage" exact component={Graphpage} />
              <Route path="/about" exact component={Aboutpage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Box>
        </Router>
      </Flex>
    </Provider>
  </ChakraProvider>
);

export default App;