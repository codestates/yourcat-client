import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import TutorialsPage from './pages/TutorialsPage/TutorialsPage';
import Tutorials from './pages/TutorialsPage/Tutorials';
import CommunityPage from './pages/CommunityPage/CommunityPage';
import PhotoPage from './pages/PhotoPage/PhotoPage';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage';
import GlobalStyles from './GlobalStyles';
import MultiStepForm from './pages/MultiStepForm/MultiStepForm';

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
            <Route exact path="/community">
              <CommunityPage />
            </Route>
            <Route exact path="/photo">
              <PhotoPage />
            </Route>
            <Route exact path="/calculator">
              <CalculatorPage />
            </Route>
            <Route exact path="/signin">
              <MultiStepForm />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
