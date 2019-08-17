import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import PointListContainer from './components/pointList/PointListContainer'
import CreatePointFormContainer from './components/pointForm/cratePointForm/CreatePointFormContainer'
import MapContainer from './components/map/MapContainer'
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <div className="main-container">
        <div className="main-container__points-column">
          <CreatePointFormContainer />
          <PointListContainer />
        </div>
        <div className="main-container__map-column">
          {/* <MapContainer /> */}
        </div>
      </div>
    </Provider>
  )
}

export default App
