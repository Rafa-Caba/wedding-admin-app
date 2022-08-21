import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import db from '../firebase/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

const ListaDeConfirmados = () => {
    const [invitados, cambiarInvitados] = useState([]);
    
    useEffect(() => {
        onSnapshot(
            collection(db, 'wedding-invitados'),
            (snapshot) => {
                const arregloInvitados = snapshot.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id }
                });

                cambiarInvitados(arregloInvitados);
            },
            (error) => {
                console.log(error)
            }
        );
    }, []);

    invitados.sort((a, b) => {
        return a.codigoFamilia - b.codigoFamilia;
    });

    return (
        invitados.length > 0 &&
        <ContenedorConfirmados>
            <Lista>Lista de Invitados Confirmados</Lista>

            <Tabla>
                <tbody>
                    <tr>
                        <RowTitle>Numero</RowTitle>
                        <RowTitle>Nombre</RowTitle>
                        <RowTitle>Apellido</RowTitle>
                    </tr>
                    
                    {// eslint-disable-next-line array-callback-return
                    invitados.map((invitado, index) => {
                        if (invitado.confirmStatus === 'Confirmado') {
                            return (
                                <tr key={invitado.id}>
                                    <TablaData>{index}</TablaData>
                                    <TablaData>{invitado.nombre}</TablaData>
                                    <TablaData>{invitado.apellido}</TablaData>
                                </tr>
                            );
                        }
                    })}     
                </tbody>
        </Tabla>
        </ContenedorConfirmados>
    )
};

const RowTitle = styled.td`
    font-size: 1.8em;
    padding .5em;
    background-color: #b16be3;
    text-align: center;
    font-weight: bold;

    @media (max-width: 600px) {
        font-size: 15px;
	}
`;

const TablaData = styled.td`
    padding: .2em 0 .2em .2em;
    margin: 0;
    white-space: wrap;
    background-color: #b676e3;
    font-size: 1.5em;

    @media (max-width: 600px) {
        font-size: 15px;
	}
`;

const Tabla = styled.table`
    margin: 0;
    text-align: left;
    padding: .5em;
`;

const Lista = styled.h2`
    color: #000;
    font-size: 2.5em;
    text-shadow: 3px 3px 4px white;
    margin: 0.5em 0;
    text-align: center;

    @media (max-width: 600px) {
        font-size: 23px;
	}
`;

const ContenedorConfirmados = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2em auto;
    backdrop-filter: blur(15px);
    color: #fff;
    width: 80%;

    @media (max-width: 600px) {
        font-size: 17px;
        width: 95%;
	}
`;

export default ListaDeConfirmados;