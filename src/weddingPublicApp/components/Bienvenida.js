import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Contenedor from './../elements/Contenedor';
import { Navigate, useParams } from 'react-router-dom';
import { ContextoInvitados } from './../contexts/contextoInvitados';
import Header from './Header';
import MainContenedor from './../elements/MainContenedor';
import Invitacion from './Invitacion';

const Bienvenida = () => {
    // Funcion que filtrara los invitados por codigo recibido en useParams
    const { filtrarFamilia } = useContext(ContextoInvitados);
    const [iniciar, cambiarIniciar] = useState(false);
    // Obtenemos el codigo por el parametro en el URL
    const { codigo } = useParams();

    useEffect(() => {}, [iniciar])

    return (
        <MainContenedor>
            <Header />
            <Contenedor>
                <Titulo>
                    ¡Bienvenido a nuestro Registro de Invitados!
                </Titulo>
                <ContenedorBtn>
                    { iniciar && <Navigate replace to={`/confirmacion/${codigo}`} /> }
                    { codigo && !isNaN(codigo) ?
                        <Boton onClick={() => {
                        // Corremos esta funcion al dar click en el boton 
                        // para filtrar los invitados por codigo y actualizar el estado
                        filtrarFamilia(codigo)
                        cambiarIniciar(!iniciar);
                    }}
                    >
                        Iniciar registro
                    </Boton>
                    :
                    <Boton disabled={true}>
                        Iniciar registro
                    </Boton>
                    }
                </ContenedorBtn>
            </Contenedor>
            <Invitacion />
        </MainContenedor>
    );
}

const Titulo = styled.p`
    color: #fff;
    margin: auto;
    padding: 1em 0.5em;
    font-size: 3rem;
    width: 90%;
    text-align: center;

    @media (max-width: 500px) {
    font-size: 1.3rem;
	}
`;

const ContenedorBtn = styled.div`
    display: flex;
    justify-content: center;
`;

const Boton = styled.button`
    display: flex;
    justify-content: center;
    margin: auto;
    background: rgb(197, 127, 250);
    color: black;
	font-size: 1.5em;
    border-radius: 10px;
    border: rgb(212, 158, 253);
    padding: 0.8em 1.5em;
    margin: auto;
    cursor: pointer;

    &:hover {
        background: rgb(186, 106, 248);
        cursor: pointer;
    }
`;

export default Bienvenida;