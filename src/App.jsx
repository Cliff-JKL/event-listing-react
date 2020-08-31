import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import EventPage from './EventPage';
import MainPage from './MainPage';
import base from './scss/base.scss';

const App = () => (
  <div className={base.content}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/events/:id/:name">
          <EventPage />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);

export default hot(App);
