import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import MapaMarkerImg from './../../assets/mapa-marker.svg';
import api from './../../services/api';

import leaflet from 'leaflet';
import './style.css';
import 'leaflet/dist/leaflet.css'; 

const mapIcon = leaflet.icon({
    iconUrl: MapaMarkerImg,

    iconSize: [58, 68],
    iconAnchor:[29, 68],
    popupAnchor:[170, 2]
});

export default function Points(){
    const [ points, setPoints ] = useState([]);
    const params = useParams();

    useEffect(() => {
        api.get(`/pointers/${params.id}`).then(response => {
            setPoints(response.data.result);
        })
    },[]);


    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={MapaMarkerImg} alt="Procure seu Role"/>

                    <h2>Escolha o lugar ideal para o seu rolê</h2>
                    <p> :)</p>
                </header>

                <footer>
                    <strong>Fortaleza</strong>
                    <span>Ceará</span>
                </footer>

            </aside>
            <Map 
                    center={[-3.7419126, -38.5375255]}
                    zoom={15}
                    style={{ width: '100%', height: '100%' }}
            >
                <TileLayer 
                  url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGlpZWdvcGFpaXZhMTkiLCJhIjoiY2tnNzRlOXF2MDNxMDJxcGJ4a3hjd214aiJ9.wPqlFTHU3Z2QWChA85Qo6g"
                />

                {
                    points.map(point => {
                        return (
                            <Marker 
                                position={[point.latitude, point.longitude]}
                                icon={mapIcon}
                                key={point.id}
                            >
                                <Popup
                                    closeButton={false} minWidth={240} maxWidth={240} className="map-popup"
                                >
                                    {point.name}
                                    <Link to={`/selected-point/${point.id}`} >
                                        <FiArrowRight size={20} color="#fff" />
                                    </Link>
                                </Popup>               
                            </Marker>
                        )
                    })
                }

            </Map>

            <Link to="/point-create" className="create-orphanate">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    );
}