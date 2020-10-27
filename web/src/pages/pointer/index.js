import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';
import api from './../../services/api';
import L from 'leaflet';

import Sidebar from './../../components/Sidebar/index';
import MapaMarkerImg from './../../assets/mapa-marker.svg';

import './style.css';

const happyMapIcon = L.icon({
    iconUrl: MapaMarkerImg,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
  })

export default function Pointer(){
    const [ point, setPoint ] = useState('');
    const params = useParams()
  
    useEffect(() => {
        api.get(`/point/${params.id}`).then(response => {
            setPoint(response.data.result[0]);
        });
    },[params.id])
  
    console.log(point);
    if(!point){
      return <span>Carregando...</span>
    }

    return(
        <div id="page-orphanage">
            <Sidebar />

            <main>
                <div className="orphanage-details">
                <img src={`http://apibusqueaqui.devce.com.br/public${point.path}`} alt={point.name} />
                
                <div className="orphanage-details-content">
                    <h1>{point.name}</h1>
                    <p>{point.about}</p>

                    <div className="map-container">
                    <Map 
                        center={[point.latitude,point.longitude]} 
                        zoom={16} 
                        style={{ width: '100%', height: 280 }}
                        dragging={false}
                        touchZoom={false}
                        zoomControl={false}
                        scrollWheelZoom={false}
                        doubleClickZoom={false}
                    >
                        <TileLayer 
                            url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGlpZWdvcGFpaXZhMTkiLCJhIjoiY2tnNzRlOXF2MDNxMDJxcGJ4a3hjd214aiJ9.wPqlFTHU3Z2QWChA85Qo6g"
                        />
                        <Marker interactive={false} icon={happyMapIcon} position={[point.latitude,point.longitude]} />
                    </Map>

                    <footer>
                        <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}`}>Ver rotas no Google Maps</a>
                    </footer>
                    </div>

                    <hr />

                    <a href={`https://wa.me/55${point.contact}?text=Ola%20Gostaria%20de%20mais%20informacoes`} rel="noopener noreferrer" target="_blank" className="contact-button">
                    <FaWhatsapp size={20} color="#FFF" />
                        Entrar em contato
                    </a>
                </div>
                </div>
            </main>
        </div>
    );
}