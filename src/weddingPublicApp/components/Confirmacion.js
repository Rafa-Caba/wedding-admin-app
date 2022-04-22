import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import MainContenedor from '../elements/MainContenedor';
import Contenedor from '../elements/Contenedor'
import { ContextoInvitados } from '../contexts/contextoInvitados';
import ConfirmacionDecision from './ConfirmacionDecision';
import { useParams, Navigate } from 'react-router-dom';

const Confirmacion = () => {
    const { codigo } = useParams()
    // Recibimos invitadoInfo del Contexto y tomamos el Apellido 
    const { familiaFiltradaPorCodigo, invitadoInfo } = useContext(ContextoInvitados);
    // Estado para activar componente ´ConfirmacionOpciones´
    const [confirmando, cambiarConfirmando] = useState(false);
    // Estado de la opcion elegida, yas sea 'Familia Completa' o 'Individualmente'
    const [opcionElegida, cambiarOpcionElegida] = useState('');
    // Agregamos a apellido el valor apellido de InvitadoInfo
    const apellido = invitadoInfo.apellido;
    const nombre = invitadoInfo.nombre;

    // Al enviar el Formulario, se activa la opcion de 
    // confirmacion y se cambia su estado a verdadero 'TRUE'
    const opcionSeleccionada = (e) => {
        e.preventDefault();
        cambiarConfirmando(!confirmando);
    }

    return (
        <> {
            !apellido ? <Navigate replace to={`/${codigo}`} />
            :
            <MainContenedor>
                <Header />
                <Contenedor>
                    { familiaFiltradaPorCodigo.length <= 1 ?
                        <>
                            <MsgSingle>
                                Bienvenido <strong>{`${nombre} ${apellido}`}</strong>
                            </MsgSingle>
                            <MsgIndOFam>
                                Por favor confirma tu Asistencia:
                            </MsgIndOFam>

                            <ConfirmacionOpciones>                           
                                <FormularioOpciones onSubmit={opcionSeleccionada}>
                                    <RadioInput 
                                        type="radio" 
                                        name="option" 
                                        id="single" 
                                        value="Single"
                                        onChange={(e) => cambiarOpcionElegida(e.target.value)}
                                    />
                                    <RadioLabel htmlFor="single">
                                        Confirmar Asistencia
                                    </RadioLabel>

                                    <RadioInput 
                                        type="radio" 
                                        name="option" 
                                        id="rechazado" 
                                        value="rechazado" 
                                        onChange={(e) => cambiarOpcionElegida(e.target.value)}
                                    />
                                    <RadioLabel htmlFor="rechazado">
                                        No Asistiré
                                    </RadioLabel>

                                    {!confirmando &&
                                        <SubmitInput 
                                            type="submit" 
                                            value="Continuar" 
                                            disabled={!opcionElegida ? true : false}
                                        />
                                    }
                                </FormularioOpciones>
                            </ConfirmacionOpciones>
                        </>
                        :
                        <>
                            <MsgIndOFam>
                                Bienvenida Familia
                            </MsgIndOFam>
                            <MsgFamilia>
                                <strong>{apellido}</strong>
                            </MsgFamilia>
                            <MsgIndOFam>
                                Por favor confirma a tu <i>"Familia Completa"</i> si asistiran todos o si algunos integrantes de tu Familia
                                no podran asistir, confirma <i>"Individualmente"</i>:
                            </MsgIndOFam>

                            <ConfirmacionOpciones>                           
                                <FormularioOpciones onSubmit={opcionSeleccionada}>
                                    <RadioInput 
                                        type="radio" 
                                        name="option" 
                                        id="familia_completa" 
                                        value="Familia completa"
                                        onChange={(e) => cambiarOpcionElegida(e.target.value)}
                                    />
                                    <RadioLabel htmlFor="familia_completa">
                                        <strong>Familia Completa</strong>
                                    </RadioLabel>

                                    <RadioInput 
                                        type="radio" 
                                        name="option" 
                                        id="individual" 
                                        value="Individualmente" 
                                        onChange={(e) => cambiarOpcionElegida(e.target.value)}
                                    />
                                    <RadioLabel htmlFor="individual">
                                        <strong>Individualmente</strong>
                                    </RadioLabel>

                                    {!confirmando &&
                                        <SubmitInput 
                                            type="submit" 
                                            value="Continuar" 
                                            disabled={!opcionElegida ? true : false}
                                        />
                                    }
                                </FormularioOpciones>
                            </ConfirmacionOpciones>
                        </>
                    }
                    {confirmando && 
                        <ConfirmacionDecision 
                            codigo={codigo}
                            opcionElegida={opcionElegida}
                        />
                    }
                </Contenedor>
            </MainContenedor>
        }
        </>
    );
}

const MsgSingle = styled.p`
    font-size: 3em;
    text-align: center;
    padding: 0 0 1em 0;
    margin: 1em 0 0 0;

    @media (max-width: 900px) {
        font-size: 2.2em;
    }
`;

const MsgFamilia = styled.p`
    font-size: 3.5em;
    text-align: center;
    padding: 0 0 0.7em 0;
    margin: 0;

    @media (max-width: 900px) {
		font-size: 3.2em;
	}
`;

const MsgIndOFam = styled.p`
    font-size: 2.5em;
    text-align: center;
    padding: 0.5em 0.2em 0.8em 0.2em;
    margin: 0;

    @media (max-width: 900px) {
		font-size: 2em;
	}
`;

const ConfirmacionOpciones = styled.div`
    width: 100%;
	margin: auto;
	display: flex;
    padding: 1em 1em 2em 1em;
    align-items: center;
    justify-content: center;
`;

const FormularioOpciones = styled.form`
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    width: 42em;
    gap: 0.8em;
    margin: 0, auto;
    justify-content: center;
    align-items: center;
`;

const RadioLabel = styled.label`
    font-size: 1.5em;
    cursor: pointer;
    text-align: center;
`;

const RadioInput = styled.input`
    cursor: pointer;
    padding: 1em;
    height: 1.5em;
    width: 1.5em;
`;

const SubmitInput = styled.input`
    cursor: pointer;
    font-size: 1.2em;
    color: black;
    margin-top: 0.8em;
    width: 50%;
    padding: 0.7em 0.7em;
    background: rgb(197, 127, 250);
    border-radius: 10px;
    border: rgb(212, 158, 253);

    &:hover {
        background: rgb(186, 106, 248);
    }
`;

 
export default Confirmacion;