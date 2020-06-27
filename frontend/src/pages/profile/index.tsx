import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css';
import logoImg from  '../../assets/logo.svg'

interface iIncidents {
    id: number;
    title: string;
    description: string;
    value: number;
    ong_id: string;
    email: string;
    city: string;
    uf: string;
}

const Profile = () => {

    const [incidents, setIncidents] = useState<iIncidents[]>([])
    const [aux, setAux] = useState(0)

    const history = useHistory();
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response =>
            setIncidents(response.data)
        )
    }, [aux, ongId])

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    async function handleDeleteIncident(id: number) {
        try {
            await api.delete(`/incidents/${id}`, { headers: { Authorization: ongId }})
            setAux(aux+1);
        } catch(err) {
            alert('Erro ao deletar caso, tente novamente')
        }
    }

    return (
        <div className="profileContainer">
            <header>
                    <img src={ logoImg } alt="Be the Hero"/>
                    <span>Bem vinda, { ongName } </span>

                    <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                    <button type="button" onClick={handleLogout}>
                        <FiPower size={18} color ="#E02041" />
                    </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
                {
                    incidents.map((incident) =>                       
                            (<li key= {incident.id}>
                                <strong>CASO:</strong>
                                <p>{incident.title}</p>

                                <strong>DESCRIÇÃO</strong>
                                <p>{incident.description}</p>

                                <strong>Valor</strong>
                                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                                <button onClick={() => handleDeleteIncident(incident.id)} type='button'>
                                    <FiTrash2 size={20}/>
                                </button>
                                </li>))
                }
            </ul>
        </div>
    )
}

export default Profile;