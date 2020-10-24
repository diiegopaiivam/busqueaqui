import React, { useEffect, useState} from 'react';
import './style.css';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from './../../services/api';

import logo from './../../assets/logo.png';

export default function Home(){

    const [ segments, setSegmentes ] = useState([]);
    const [ selectedSegment, setSelectedSegment ] = useState(1);

    useEffect(() => {
        api.get('/segments').then(response => {
            setSegmentes(response.data.result);
        });
    },[]);

    return(
        <div id="page-landing">
        <div className="content-wrapper">
            <img src={logo} alt="Busque Aqui!"/>

            <main>
            <h1>Salve o seu rolê.</h1>
            <p>Procure o ponto de encontro ideal pro seu rolê</p>
            </main>

            <div className="location">
            <strong>Fortaleza</strong>
            <span>Ceará</span>
            </div>

            <div className="redirect">
                <select forhtml="segments" onChange={e => setSelectedSegment(e.target.value)}>
                    {
                        segments.map(segment => {
                            return(
                                <option key={segment.id} value={segment.id}>{segment.segment.substring(0,1).toUpperCase().concat(segment.segment.substring(1))}</option>
                            )
                        })
                    }
                </select>
                <Link to={`/points/${selectedSegment}`} className="enter-app">
                    <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
                </Link>
            </div>

        </div>
        
        </div>
    );
}