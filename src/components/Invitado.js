import React, { useState } from 'react';
import styled from 'styled-components';
import db from '../firebase/firebaseConfig';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

const Invitado = ({ nombre, apellido, codigoFamilia, confirmStatus, id }) => {
    const [editandoInvitado, cambiarEditandoInvitado] = useState(false);
    const [nuevoNombre, cambiarNuevoNombre] = useState(nombre);
    const [nuevoApellido, cambiarNuevoApellido] = useState(apellido);
    const [nuevoCodigoFamilia, cambiarNuevoCodigoFamilia] = useState(codigoFamilia);
    const [nuevoConfirmStatus, cambiarNuevoConfirmStatus] = useState(confirmStatus);
    
    const actualizarInvitado = async (e) => {
        e.preventDefault();

        try {
            await updateDoc(doc(db, 'wedding-invitados', id), {
                nombre: nuevoNombre,
                apellido: nuevoApellido,
                codigoFamilia: nuevoCodigoFamilia,
                confirmStatus: nuevoConfirmStatus
            });
        } catch (err) {
            console.log(err);
        }

        cambiarEditandoInvitado(false);
    }

    const eliminarContacto = async () => {
        try {
           await deleteDoc(doc(db, 'wedding-invitados', id));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <ContenedorInvitado>
            { editandoInvitado ? 
                <>
                    <form onSubmit={actualizarInvitado}>
                        <ContenedorInput>
                            <Input 
                                type="text"
                                name="nombre"
                                value={nuevoNombre}
                                onChange={(e) => cambiarNuevoNombre(e.target.value)}
                                placeholder="Nombre"
                            />
                            <Input 
                                type="text"
                                name="apellido"
                                value={nuevoApellido}
                                onChange={(e) => cambiarNuevoApellido(e.target.value)}
                                placeholder="Apellido"
                            />
                            <Input 
                                type="text"
                                name="codigoFamilia"
                                value={nuevoCodigoFamilia}
                                onChange={(e) => cambiarNuevoCodigoFamilia(e.target.value)}
                                placeholder="Codigo de Familia"
                            />
                            <Input 
                                type="text"
                                name="confirmStatus"
                                value={nuevoConfirmStatus}
                                onChange={(e) => cambiarNuevoConfirmStatus(e.target.value)}
                                placeholder="Estado de Confirmacion"
                            />
                        </ContenedorInput>
                        <Boton type="submit">Actualizar</Boton>
                    </form>
                    <Boton onClick={() => cambiarEditandoInvitado(!editandoInvitado)}>Cancelar</Boton>
                </>
            :
                <>
                    <ContenedorNombre>
                        <Nombre>{nombre}</Nombre>
                        <Apellido>{apellido}</Apellido>
                        <ConfirmStatus> - {confirmStatus}</ConfirmStatus>
                    </ContenedorNombre>
                    <Familia>Familia {apellido}</Familia>
                    <ContenedorBotones>
                        <Boton onClick={() => cambiarEditandoInvitado(!editandoInvitado)}>Editar</Boton>
                        <Boton onClick={() => eliminarContacto(id)}>Borrar</Boton>
                    </ContenedorBotones>
                </>
            }

        </ContenedorInvitado>
    );
}
 

const ContenedorInvitado = styled.div`
	padding: 1em 2em;
    width: 100%;
	border-bottom: 2px solid rgba(163,67,253,.3);
    @media (max-width: 600px) {
		font-size: 12px;
	}
`;

const ContenedorNombre = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.6em;
    gap: 0.3em;
    @media (max-width: 600px) {
        font-size: 18px;
		flex-direction: column;
	}
`;

const Nombre = styled.p`
	font-weight: bold;
    text-align: center;
`;

const Familia = styled.p`
	font-weight: bold;
    font-size: 0.9em;
    margin: 0.5em
`;

const Apellido = styled.p`
	font-weight: bold;
`;

const ConfirmStatus = styled.p`
	font-style: italic;
    font-size: 1em;
	color: #EAEAEA;
	margin: 5px 0;
    text-shadow: 0px 0px 0px black;
`;

const Boton = styled.button`
	padding: 5px 20px;
	border: none;
	cursor: pointer;
	border-radius: 3px;
	margin: 7px 2px;
	transition: .3s ease all;
	outline: none;
	color: #fff;
	font-size: 12px;
	background: #982bff;

	&:hover {
		background: #955EFF;
	}

    @media (max-width: 600px) {
        font-size: 14px;
	}
`;

const Input = styled.input`
	padding: 10px;
	border: 2px solid rgba(0,0,0,.2);
	border-radius: 3px;
	width: 100%;
	margin-bottom: 10px;
	transition: .2s ease all;
	outline: none;
	text-align: center;
	
	&:focus {
		border: 2px solid #3D76E9;
	}

    @media (max-width: 600px) {
        font-size: 14px;
		flex-direction: row;
	}
`;

const ContenedorInput = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1em;
`;

const ContenedorBotones = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.6em;
    gap: 0.3em;
    @media (max-width: 600px) {
        font-size: 12px;
		flex-direction: row;
	}
`;

export default Invitado;