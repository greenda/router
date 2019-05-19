import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.scss';
import PointList from './components/pointList/PointList'
import CreatePointForm from './components/pointForm/cratePointForm/createPointForm'
import MapContainer from './components/map/MapContainer'
import { DragDropContext } from 'react-beautiful-dnd'


function App() {
  return (
    <Provider store={store}>
      <div className="main-container">
        <div className="main-container__points-column">
        <CreatePointForm />
        <DragDropContext>
          <PointList />
        </DragDropContext>
        </div>
        <div className="main-container__map-column">
          <MapContainer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
