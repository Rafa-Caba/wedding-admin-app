import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import db from '../firebase/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import FamiliaPorCodigo from './FamiliaPorCodigo';

const ListaFamilias = () => {
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

    const codigos = [];

    return (
        invitados.length > 0 &&
        <ContenedorInvitados>
            {// eslint-disable-next-line array-callback-return
            invitados.map((invitado) => {
                if (!codigos.includes(invitado.codigoFamilia)) {
                    codigos.push(invitado.codigoFamilia);
                    return <FamiliaPorCodigo 
                        key={invitado.codigoFamilia}
                        invitados={invitados}
                        apellido={invitado.apellido}
                        codigoFamilia={invitado.codigoFamilia}
                    />
                }
            })}
        </ContenedorInvitados>
    );
}

const ContenedorInvitados = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
	margin-top: 40px;
    width: 80%;
    @media (max-width: 600px) {
        font-size: 12px;
        width: 100%;
	}
`;
 
export default ListaFamilias;