import React from "react"
import { compose, withProps, withHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Polyline } from "react-google-maps"
import { Markers } from './Markers'

const GoogleMapComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBwCOCQz1iTe1H8WPym6pHbw93MVlRp8tE&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withHandlers(() => {
        const refs = {
          map: undefined,
        }
    
        return {
          onMapMounted: () => ref => {
            refs.map = ref
          },
          onZoomChanged: ({ onZoomChange }) => () => {
                //console.log(refs.map.getZoom())
          },
          onCenterChanged: () => () => {
              const center = refs.map.getCenter()
              return center
          }
        }
      }),
    withGoogleMap,
  )((props) =>
    <GoogleMap
        defaultZoom={11}
        ref={props.onMapMounted}
        onZoomChanged={props.onZoomChanged}
        onCenterChanged={(event) => {
            const center = props.onCenterChanged()
            props.onChangeCenter(center)
        }}
        defaultCenter={{ lat: -41.253, lng: 174.751 }}
    >
      <Polyline path={[{ lat: -41.28, lng: 174.69 }, { lat: -41.24, lng: 174.74 } ]}/>
      <Markers points={props.points} />
    </GoogleMap>
)

// Пример https://jsbin.com/molerasebo/2/edit?js,console,output

export function MapView({ points, onChangeMapCenter }) {   
    return (
        <GoogleMapComponent
            isMarkerShown={true}
            onMarkerClick={(event) => { console.log(event)}}
            onChangeCenter={onChangeMapCenter}
            points={points}
        />
    )
}

export default MapView