import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TutorialsPage from './pages/TutorialsPage/TutorialsPage';
import Tutorials from './pages/TutorialsPage/Tutorials';
import LandingPage from './pages/LandingPage/LandingPage';
import GlobalStyles from './GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/tutorials">
              <TutorialsPage />
            </Route>
            <Route path="/tutorials/:id">
              <Tutorials />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
