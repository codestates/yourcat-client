import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import TutorialsPage from './pages/TutorialsPage/TutorialsPage';
import Community from './pages/CommunityPage/CommunityPage';
import DetailPage from './pages/CommunityPage/Sections/DetailContents';
import Tutorials from './pages/TutorialsPage/Sections/Tutorials';
import PhotoPage from './pages/PhotoPage/PhotoPage';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage';
import GlobalStyles from './GlobalStyles';
import MainModal from './pages/MultiStepForm/MainModal';
import NavBar from './pages/LandingPage/Sections/NavBar';
import PhotoUploadForm from './pages/PhotoPage/Sections/PhotoUploadForm';
import CommunityCreate from './pages/CommunityPage/Sections/CreateContent';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <div className="App">
          <NavBar />
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
              <Community />
            </Route>
            <Route exact path="/community/create">
              <CommunityCreate />
            </Route>
            <Route exact path="/community/detail/:contentId">
              <DetailPage />
            </Route>
            <Route exact path="/photo">
              <PhotoPage />
            </Route>
            <Route exact path="/photoupload">
              <PhotoUploadForm />
            </Route>
            <Route exact path="/calculator">
              <CalculatorPage />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
      <MainModal />
    </>
  );
}

export default App;
