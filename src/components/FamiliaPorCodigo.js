import React, { useState } from 'react';
import styled from 'styled-components';
import Invitado from './Invitado';

const FamiliaPorCodigo = ({ invitados, apellido, codigoFamilia }) => {
    const [visible, cambiarVisible] = useState(false);

    return (
        <ContenedorFamilia>
            {visible ?
                <>
                    <Boton onClick={() => cambiarVisible(!visible)}>Esconder Familia {apellido}</Boton>
                    {// eslint-disable-next-line array-callback-return
                    invitados.map((invitado) => {
                        if (invitado.codigoFamilia === codigoFamilia) {
                            return <Invitado 
                                key={invitado.id}
                                id={invitado.id}
                                nombre={invitado.nombre}
                                apellido={invitado.apellido}
                                codigoFamilia={invitado.codigoFamilia}
                                confirmStatus={invitado.confirmStatus}
                            />
                        }   
                    })}
                </>
            :   
                <Boton onClick={() => cambiarVisible(!visible)}>Ver Familia {apellido}</Boton>}
        </ContenedorFamilia>
    );
}
 
const ContenedorFamilia = styled.div`
	padding: 0.5em 2em;
    margin: 0 auto;
    width: 90%;

    @media (max-width: 600px) {
        font-size: 12px;
        width: 100%;
	}
`;

const Boton = styled.button`
    padding: 1em 2em;
	border: none;
	cursor: pointer;
	border-radius: 3px;
	margin: 0px 2px;
	transition: .3s ease all;
	outline: none;
	color: #fff;
	font-size: 1em;
    border-bottom: 2px solid rgba(0,0,0,.2);
	background: #982bff;

	&:hover {
		background: #955EFF;
	}

    @media (max-width: 600px) {
        font-size: 1.1em;
        width: 90%;
	}
`;

export default FamiliaPorCodigo;
