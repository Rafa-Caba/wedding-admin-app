import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { ContextoInvitados } from '../contexts/contextoInvitados';

const ConfirmacionDecision = ({ codigo, opcionElegida }) => {
    const { familiaFiltradaPorCodigo, confimarAssistenciaIndividual, confirmarFamilia } = useContext(ContextoInvitados);
    const [confimacionIdInvitadoAConfirmar, cambiarConfirmacionIdInvitadoAConfirmar] = useState({});
    const [trigger, cambiarTrigger] = useState(0);
    const [irADespedida, cambiarIrADespedida] = useState(false);

    

    const settingTrigger = (confirmacion) => {
        if (confirmacion) {
            cambiarTrigger(trigger + 1);
        } else if (!confirmacion && trigger > 0) {
            cambiarTrigger(trigger - 1);
        } else {
            cambiarTrigger(0);
        }
   }

    const actualizarFamilia = (e) => {
        e.preventDefault();

        if (opcionElegida === "Familia completa" || opcionElegida === "Single") {
            confirmarFamilia(true);
        } else if (opcionElegida === "rechazado") {
            confirmarFamilia(false);
        }     
    }

    useEffect(() => {
        familiaFiltradaPorCodigo.forEach((invitado) => {
            if (invitado.confirmStatus === "Confirmado") {
                cambiarTrigger(1);
                return;
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        confimarAssistenciaIndividual(confimacionIdInvitadoAConfirmar.id, confimacionIdInvitadoAConfirmar.confirmacion);
        settingTrigger(confimacionIdInvitadoAConfirmar.confirmacion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confimacionIdInvitadoAConfirmar]);
    
    return (
        <>
            { irADespedida && <Navigate replace to={`/despedida/${codigo}/${opcionElegida === "Familia completa" || opcionElegida === "Single" ? 1 : trigger}`} /> }
            <FormDecision action="">
                    { opcionElegida === "Single" &&
                        <ConfDesicionBtn 
                            type="submit" 
                            onClick={(e) => {
                                actualizarFamilia(e);
                                cambiarIrADespedida(!irADespedida);
                            }}
                        >
                            Confirma tu Asistencia
                        </ConfDesicionBtn>
                    }
                    
                    { opcionElegida === "rechazado" &&
                        <ConfDesicionBtn 
                            type="submit" 
                            onClick={(e) => {
                                actualizarFamilia(e);
                                cambiarIrADespedida(!irADespedida);
                            }}
                        >
                            Enviar Respuesta
                        </ConfDesicionBtn>
                    }

                    { opcionElegida === "Familia completa" &&
                        <ConfDesicionBtn 
                            type="submit" 
                            onClick={(e) => {
                                actualizarFamilia(e);
                                cambiarIrADespedida(!irADespedida);
                            }}
                        >
                            Confirmar a tu Familia
                        </ConfDesicionBtn>
                    }
            </FormDecision>
            
            { opcionElegida === "Individualmente" &&
                <ContenedorConfirmacionDesicion>
                    <FormDecision action="">
                            <ContenedorConfirmacionIndividual>
                            <MiembrosFamiliaTitulo>
                                Por favor selecciona a quienes seran parte de nuestra Boda
                            </MiembrosFamiliaTitulo>
                            <ContenedorMiembrosFamilia>
                                {
                                    familiaFiltradaPorCodigo.map(({ id, nombre, confirmStatus }) => {
                                        return (
                                            <MiembrosDiv key={id}>
                                                {confirmStatus === "Confirmado" ?
                                                    <IndividualCheckbox 
                                                        type="checkbox"
                                                        id={id}
                                                        value={nombre}
                                                        checked={confirmStatus === "Confirmado" && true}
                                                        onChange={(e) => {
                                                            cambiarConfirmacionIdInvitadoAConfirmar({ 
                                                                confirmacion: e.target.checked, 
                                                                id
                                                            });                                                    
                                                        }}
                                                    />
                                                :
                                                    <IndividualCheckbox 
                                                        type="checkbox"
                                                        id={id}
                                                        value={nombre}
                                                        checked={confirmStatus === "Confirmado" && true}
                                                        onChange={(e) => {
                                                            cambiarConfirmacionIdInvitadoAConfirmar({ 
                                                                confirmacion: e.target.checked, 
                                                                id
                                                            });
                                                        }}
                                                    />
                                                }
                                                <IndividualLabel htmlFor={id}>
                                                    <strong>{nombre}</strong>  -  <i>{confirmStatus}</i>
                                                </IndividualLabel>
                                            </MiembrosDiv>
                                        );
                                    })
                                }
                            </ContenedorMiembrosFamilia>

                            <ConfDesicionBtn 
                                type="submit" 
                                onClick={(e) => {
                                    actualizarFamilia(e);
                                    cambiarIrADespedida(!irADespedida);
                                }}
                            >
                                Confirmar
                            </ConfDesicionBtn>
                        </ContenedorConfirmacionIndividual>
                    </FormDecision>
                </ContenedorConfirmacionDesicion>
            }
        </>
    );
}

const ContenedorConfirmacionDesicion = styled.div`
    background-color: rgba(161, 104, 253, 0.657);
    box-shadow: 0.3em 0.3em 8px rgb(136, 66, 248), -0.3em -0.3em 8px rgb(136, 66, 248); 
    backdrop-filter: blur(5px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 1.5em;
    margin: auto;
    padding: 0.5em;
    text-align: center;
`;

const FormDecision = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

// eslint-disable-next-line no-unused-vars
const ContenedorConfirmacionFamiliar = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1em 3em 0 3em;
`;

const ContenedorConfirmacionIndividual = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 1em 1em 0 1em;
`;

const MiembrosFamiliaTitulo = styled.p`
    font-size: 1em;
    padding-bottom: 1em;
    @media (max-width: 900px) {
        font-size: 0.9em;
	}
`;

const ContenedorMiembrosFamilia = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.3em;
`;

const ConfDesicionBtn = styled.button`
    cursor: pointer;
    color: black;
    font-size: 1.5em;
    margin-top: 1em;
    margin-bottom: 0.7em;
    width: 100%;
    padding: 0.5em 0.7em;
    background: rgb(197, 127, 250);
    border-radius: 10px;
    border: rgb(212, 158, 253);

    &:hover {
        background: rgb(186, 106, 248);
    }

    @media (max-width: 900px) {
        font-size: 1em;
        padding: 1em 1.5em;
	}
`;

const MiembrosDiv = styled.div`
    gap: 0.3em;
    display: flex;
    align-content: center;
    justify-content: center;
`;

const IndividualCheckbox = styled.input`
    cursor: pointer;
    padding: 1.3rem;
    margin: auto;
    height: 1.5rem;
    width: 1.5rem;
    margin-top: 0.8rem;

    @media (max-width: 500px) {
        font-size: 1.1em;
        height: 1.1em;
        width: 1.1em;
        margin-top: 0.3em;
	}
`;

const IndividualLabel = styled.label`
    font-size: 1.3em;
    cursor: pointer;
    margin-left: 0.5em;
    text-align: left;
    margin-top: 0.3em;

    @media (max-width: 900px) {
        font-size: 1.4em;
	}
`;
 
export default ConfirmacionDecision;
