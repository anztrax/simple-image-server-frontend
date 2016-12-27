import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MainPage from './Template/MainPage';
import IndexPage from './pages/page/IndexPage';
import ImagePage from './pages/page/ImagesPage';
import EditorPage from './pages/page/EditorPage';

export default (
  <Route path='/' component={MainPage}>
    <IndexRoute component={IndexPage} />
    <Route path='/images' component={ImagePage} />
    <Route path='/editor' components={EditorPage} />
  </Route>
);