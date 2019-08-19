import React, { useState } from "react"
import PropTypes, { number, string, func } from 'prop-types'
import { GoogleMap, LoadScript, useGoogleMap } from '@react-google-maps/api'
import Route from './Route/Route'
import PointMarkers from './PointMarkers/PointMarkers'
import PointInfo from './PointInfo/PointInfo'
                            
const DEFAULT_CENTER = { lat: -41.253, lng: 174.751 }
const DEFAULT_ZOOM = 12

function MapWithHook(props) {
    const map = useGoogleMap()

    React.useEffect(
        function effect() {
            map.addListener('center_changed', () => {
                const lat = map.center.lat()
                const lng = map.center.lng()

                props.setLat(lat)
                props.setLng(lng)
            })
        },
        [map, props]
    );

    return (<></>)
}

const MemoizedMapWithHook = React.memo(MapWithHook);

export function MapView({ points, onChangeMapCenter, changePointCoordinate }) {
    const [lat, setLat] = useState(DEFAULT_CENTER.lat);
    const [lng, setLng] = useState(DEFAULT_CENTER.lng);
    const [isInfoOpen, setIsInfoOpen] = useState(true)
    const [infoPoint, setInfoPoint] = useState()

    const onMarkerClickHundler = (pointId) => {
        if (pointId) {
            setInfoPoint(points.find(point => point.id === pointId))
            setIsInfoOpen(true)
        }
    }

    const onInfoWindowCloseHundler = () => {
        setIsInfoOpen(false)
    }

    const onMapClickHundler = () => {
        setIsInfoOpen(false)
    }

    return (
        <LoadScript
            id="script-loader"            
            googleMapsApiKey="YOUR_API_KEY"
        >
            <GoogleMap
                id="map"
                onCenterChanged={() => onChangeMapCenter({ lat, lng })}
                mapContainerStyle={{
                    height: "100%",
                    width: "100%"
                }}
                zoom={DEFAULT_ZOOM}
                center={{lat, lng}}
                onClick={onMapClickHundler}
            >
                <PointMarkers
                    points={points}
                    changePointCoordinate={changePointCoordinate}
                    onClick={onMarkerClickHundler}
                />
                <Route 
                    points={points} 
                />
                {isInfoOpen && infoPoint ? (
                        <PointInfo point={infoPoint} onClose={onInfoWindowCloseHundler}/>
                    ) : (<></>)
                }
                <MemoizedMapWithHook 
                    setLat={setLat} 
                    setLng={setLng} 
                />
            </GoogleMap>
        </LoadScript>
    )
}

MapView.propTypes = {
    points: PropTypes.arrayOf(PropTypes.shape({
		id: number,
        index: number,
        coordinates: PropTypes.shape({
            lat: number,
            lng: number,
        }),
        name: string,
    })),
    onChangeMapCenter: func,
    changePointCoordinate: func,
}

export default MapView