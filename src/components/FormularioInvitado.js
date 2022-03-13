import React, { useState } from 'react';
import styled from 'styled-components';
import db from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const FormularioInvitado = () => {
    const [nombre, cambiarNombre] = useState('');
    const [apellido, cambiarApellido] = useState('');
    const [codigoFamilia, cambiarCogidoFamilia] = useState('');
    const [confirmStatus, cambiarConfirmStatus] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'wedding-invitados'), {
                nombre,
                apellido,
                codigoFamilia,
                confirmStatus
            });
        } catch (err) {
            console.log('Hubo algun error al guardar el documento');
            console.log(err);
        }

        cambiarNombre('');
        cambiarApellido('');
        cambiarCogidoFamilia('');
        cambiarConfirmStatus('');
    }

    return (
        <form onSubmit={onSubmit}>
            <ContenedorInput>
                <Input 
                    type="text"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => cambiarNombre(e.target.value)}
                    placeholder="Nombre"
                />
                <Input 
                    type="text"
                    name="apellido"
                    value={apellido}
                    onChange={(e) => cambiarApellido(e.target.value)}
                    placeholder="Apellido"
                />
                <Input 
                    type="text"
                    name="codigoFamilia"
                    value={codigoFamilia}
                    onChange={(e) => cambiarCogidoFamilia(e.target.value)}
                    placeholder="Codigo de Familia"
                />
                <SeleccionConfirmacion 
                    onChange={(e) => cambiarConfirmStatus(e.target.value)}
                    name="Confirmación">
                    <OpcionConfirmacion> - Confirmación -</OpcionConfirmacion>
                    <OpcionConfirmacion
                        value="No Confirmado"
                    >
                        No Confirmado
                    </OpcionConfirmacion>
                    <OpcionConfirmacion
                        value="Confimado"
                    >
                        Confirmado
                    </OpcionConfirmacion>
                </SeleccionConfirmacion>
            </ContenedorInput>

            <Boton type="submit">Agregar Invitado</Boton>
        </form>
    );
}

const ContenedorInput = styled.div`
    display: flex;
    justify-content: space-around;
    margin: auto;
	width: 100%;
	padding: 2em;
	border-radius: 5px;
	text-align: center;
    @media (max-width: 600px) {
		font-size: 2em;
        flex-direction: column;
	}
`;

const SeleccionConfirmacion = styled.select`
    padding: 10px;
    font-size: 1.3em;
	border: 2px solid rgba(152,43,255,.3);
	border-radius: 3px;
	width: 100%;
	margin-bottom: 5px;
    background: #BD78FE;
    margin-left: 0.6em;
	transition: .2s ease all;
	outline: none;
	text-align: center;
    color: #fff;
`;

const OpcionConfirmacion = styled.option`
    padding: 1em;
    font-size: 1em;
    font-weight: bold;
	border: 2px solid rgba(152,43,255,.3);
	border-radius: 3px;
	width: 100%;
	margin: 5px 0;
    background: rgba(152,43,255,.8);
    margin-left: 0.6em;
	transition: .2s ease all;
	outline: none;
	text-align: center;
    color: #fff;
`;

const Input = styled.input`
	padding: 10px;
    font-size: 1em;
    font-weight: bold;
	border: 2px solid rgba(152,43,255,.3);
	border-radius: 3px;
	width: 100%;
	margin-bottom: 5px;
    background: #F3DBFF;
    margin-left: 0.6em;
	transition: .2s ease all;
	outline: none;
	text-align: center;
	
	&:focus {
		border: 2px solid #982bff;
	}
`;

const Boton = styled.button`
	padding: 10px 30px;
	border: none;
	cursor: pointer;
	border-radius: 3px;
	transition: .3s ease all;
	outline: none;
	color: #fff;
	font-size: 12px;
	background: #982bff;

	&:hover {
		background: #955EFF;
	}
`;
 
export default FormularioInvitado;