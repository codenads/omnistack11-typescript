import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import logoImg from '../../assets/logo.svg'
import './styles.css'

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory();

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        const data = { name, email, whatsapp, city, uf };
        
        try {
            const response = await api.post('/ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');
        }
        catch(err) {
            alert("Houve um erro no seu cadastro");
        }

    }

    return (
        <div className="registerContainer">
            <div className="content">
                <section>
                    <img src={ logoImg } alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="backLink" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Página Inicial
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                        <input 
                            type="text" 
                            placeholder="Nome da ONG"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="WhatsApp"
                            value={whatsapp}
                            onChange={event => setWhatsapp(event.target.value)}
                        />

                        <div className="inputGroup">
                            <input 
                                type="text" 
                                placeholder="Cidade"
                                value={city}
                                onChange={event => setCity(event.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="UF" 
                                style={{ width: '80px'}}
                                value={uf}
                                onChange={event => setUf(event.target.value)}
                            />
                        </div>

                        <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Register;