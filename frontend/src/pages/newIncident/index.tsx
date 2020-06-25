import React, { useState } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'
import logoImg from '../../assets/logo.svg'

const NewIncident = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e: any) {
        e.preventDefault();
        console.log(ongId)
        try {
                await api.post('/incidents', {
                    title,
                    description,
                    value,
                }, {
                    headers: {
                        Authorization: ongId,
                    }
                })
                history.push('/profile')
        } catch(err) {
            alert('Não foi possível cadastrar o seu caso')
        }

    }

    return (
        <div className="newIncident">
            <div className="content">
                <section>
                    <img src={ logoImg } alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="backLink" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Página do Usuário
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título do Caso"
                     />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    <input 
                        type="text" 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        />
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default NewIncident;