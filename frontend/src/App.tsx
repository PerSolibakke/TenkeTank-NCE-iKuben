import React from 'react';
import { Provider } from 'react-redux';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import store from './state/store';
import ErrorModal from './components/atoms/ErrorModal';
import Footer from './components/atoms/Footer';
import Graphpage from './components/pages/Graphpage';
import frontpage from './components/pages/frontpage';
import NotFoundPage from './components/pages/NotFound';

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
          <ErrorModal />
          <Box flex="1">
            <Switch>
            <Route path="/" exact component={frontpage} />
              <Route path="/graphpage" exact component={Graphpage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Box>
          <Footer />
        </Router>
      </Flex>
    </Provider>
  </ChakraProvider>
);

export default App;