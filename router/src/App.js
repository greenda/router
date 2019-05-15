import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.scss';
import PointList from './components/pointList/PointList'
import CreatePointForm from './components/pointForm/cratePointForm/createPointForm'
import { DragDropContext } from 'react-beautiful-dnd'


function App() {
  return (
    <Provider store={store}>
      <CreatePointForm />
      <DragDropContext>
        <PointList />
      </DragDropContext>
    </Provider>
  );
}

export default App;
