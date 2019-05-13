import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.scss';
import PointList from './components/pointList/PointList'
import { DragDropContext } from 'react-beautiful-dnd'


function App() {
  return (
    <Provider store={store}>
      <DragDropContext>
        <PointList />
      </DragDropContext>
    </Provider>
  );
}

export default App;
