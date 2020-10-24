import React, { useEffect, useState, useMemo } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import L  from 'leaflet';
import { useHistory } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";

import mapMarkerImg from './../../assets/mapa-marker.svg';

import './style.css';
import Sidebar from "./../../components/Sidebar";
import api from './../../services/api';


const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function CreatePoint() {

  const history = useHistory();

  useEffect(() => {
    api.get('/segments').then(response => {
      setSegments(response.data.result);
    })
  },[])


  const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 });
  const [ segments, setSegments ] = useState([]);
  const [ segmentSelected, setSelectedSegment ] = useState(1);
  const [ name, setName ] = useState('');
  const [ contato, setContato ] = useState('');
  const [ about, setAbout ] = useState('');
  const [ image, setImage ] = useState(null);
  
  const previewImage = useMemo( () => {
    return image ? URL.createObjectURL(image) : null
  },[image]);



  function handleMapClick(e){

    const { lat, lng } = e.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    });
  }


  async function handleSubmit(e){
    e.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('segment_id', segmentSelected);
    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('contact', contato);
    data.append('image', image);
    
    try{
      await api.post('/pointers', data);

      alert('Cadastro efetuado com sucesso!');
  
      history.push('/');
    } catch(error){
      alert(`Cadastro não efetuado, tente novamente mais tarde ${error}`)
    }


  }

  return (
    <div id="page-create-orphanage">
      
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-3.7419126,-38.5375255]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
               url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGlpZWdvcGFpaXZhMTkiLCJhIjoiY2tnNzRlOXF2MDNxMDJxcGJ4a3hjd214aiJ9.wPqlFTHU3Z2QWChA85Qo6g"
              />

              <Marker interactive={false} icon={happyMapIcon} position={[position.latitude, position.longitude]} />
            </Map>

            <div className="input-block">
              <label htmlFor="segments" >Segmento</label>
              <select onChange={e => setSelectedSegment(e.target.value)}>
                    {
                        segments.map(segment => {
                            return(
                                <option key={segment.id} value={segment.id}>{segment.segment.substring(0,1).toUpperCase().concat(segment.segment.substring(1))}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="name">Contato</label>
              <input 
                id="name"
                value={contato}
                onChange={e => setContato(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                <img src={previewImage} alt="Foto" />
                <label htmlFor="image" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input type="file" id="image" onChange={e => setImage(e.target.files[0])} />
            </div>
          </fieldset>

          

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
