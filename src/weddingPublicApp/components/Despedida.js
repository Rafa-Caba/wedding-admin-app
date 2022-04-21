import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import MainContenedor from '../elements/MainContenedor';
import { Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ContextoInvitados } from '../contexts/contextoInvitados';

const Despedida = () => {
    const { familiaFiltradaPorCodigo, invitadoInfo } = useContext(ContextoInvitados);
    const [finalizar, cambiarFinalizar] = useState(false);
    const { codigo, trigger } = useParams();

    useEffect(() => {}, [finalizar])

    return (
        <>
            { invitadoInfo.apellido && invitadoInfo.codigoFamilia ? 
                <MainContenedor>
                    <Header />
                    <ContenedorDespedida>
                        {
                            parseInt(trigger) > 0 ?
                            <>
                                <DespedidaMsg>
                                    ¡Muchas gracias:
                                </DespedidaMsg>
                                { familiaFiltradaPorCodigo.length <= 1 ?
                                        <DespedidaTitulo>
                                        '{`${invitadoInfo.nombre} ${invitadoInfo.apellido}`}'
                                        </DespedidaTitulo>
                                    :
                                        <DespedidaTitulo>
                                            'Familia {invitadoInfo.apellido}'
                                        </DespedidaTitulo>
                                }
                                <DespedidaMsg>
                                    Por confirmar tu asistencia a nuestra Boda!
                                </DespedidaMsg>
                                <DespedidaMsg>
                                    ¡Te esperamos el dia 10 de Septiembre!
                                </DespedidaMsg>
                                <Boton onClick={() => cambiarFinalizar(!finalizar)}>
                                    Finalizar
                                </Boton>
                                { finalizar && 
                                    <Navigate replace to={`/${invitadoInfo.codigoFamilia}`} />
                                }
                            </>
                        :
                            <>
                                <DespedidaTitulo>
                                    ¡Lamentamos mucho
                                    que no puedan acompañarnos a nuestra Boda! :(
                                </DespedidaTitulo>
                                <Boton onClick={() => cambiarFinalizar(!finalizar)}>
                                    Finalizar
                                </Boton>
                                { finalizar && 
                                    <Navigate replace to={`/${invitadoInfo.codigoFamilia}`} />
                                }
                            </>
                        }
                    </ContenedorDespedida>
                </MainContenedor>
                :
                <Navigate replace to={`/${codigo}`} />
            }
        </>
    );
}

const ContenedorDespedida = styled.section`
    background-color: rgba(161, 104, 253, 0.657);
    box-shadow: 0.3em 0.3em 8px rgb(136, 66, 248), -0.3em -0.3em 8px rgb(136, 66, 248);
    backdrop-filter: blur(5px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1.5em 1em;
    margin: auto;
    margin-top: 1em;
    font-size: 2.5em;
`;

const DespedidaTitulo = styled.h2`
    padding: 0.5em 0.2em;
    text-align: center;
    margin: 0.3em
`;

const DespedidaMsg = styled.p`
    text-align: center;
    font-size: 1em;
    margin-top: 0.4em;
`;

const Boton = styled.button`
    display: flex;
    justify-content: center;
    margin: auto;
    background: rgb(197, 127, 250);
	font-size: 0.8em;
    border-radius: 10px;
    border: rgb(212, 158, 253);
    padding: 0.5em 1.5em;
    margin: 1em auto;
    cursor: pointer;

    &:hover {
        background: rgb(186, 106, 248);
        cursor: pointer;
    }
`;
 
export default Despedida;
