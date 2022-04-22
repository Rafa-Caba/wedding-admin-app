import React from 'react';
import styled from 'styled-components';
import Contenedor from '../elements/Contenedor';
import salon from './../../images/terraza-vista.jpeg';
import parroquia from './../../images/parroquia.jpg';
import love from './../../images/novios2-megaidea.png';
import { ReactComponent as Church } from './../../images/church.svg';
import { ReactComponent as Event } from './../../images/event.svg';

const Invitacion = () => {
  return (
    <Contenedor>
      <ContenedorMain>
        <ContenedorDate>
          <Texto>
            Tenemos el Honor de invitarles a nuestro 
            Matrimonio que se celebrará el día:
          </Texto>
          <HrLine/>
          <TextoDate>
            Sábado, 10 de Septiembre
          </TextoDate>
          <HrLine/>
        </ContenedorDate>
        <ContenedorLinks>
          <ContenedorLink>
            <Church />
            <Texto>
              La ceremomia se llevará acabo a las 14:00 en la Parroquia:
              <br /><strong>Ntra. Señora de Guadalupe</strong>
            </Texto>
            <Imagen src={parroquia} alt="Boda Icon" />
            <Link target="_blank" href="https://www.google.com.mx/maps/place/Parroquia+Nuestra+Se%C3%B1ora+de+Guadalupe/@20.7201475,-103.3009444,17z/data=!4m5!3m4!1s0x8428b0e339c83483:0x86ad3ab4ef35e65!8m2!3d20.7201476!4d-103.299785"
            >
              Dirección de Parroquia
            </Link>
            <HrLine/>
          </ContenedorLink>
          <ContenedorLink>
            <Event />
            <Texto>
              El evento donde brindaremos por tan hermoso regalo de 
              Dios será en el Salón de eventos<br /><strong>"Terraza Vista Encantada"</strong>
            </Texto>
            <Imagen src={salon} alt="Boda Icon" />
            <Link target="_blank" href="https://www.google.com.mx/maps/place/Terraza+Vista+Encantada/@20.717566,-103.2906266,21z/data=!4m5!3m4!1s0x8428b0e019df21ad:0xd1f33a8319773535!8m2!3d20.717566!4d-103.2904898"
            >
              Dirección del evento
            </Link>
            <HrLine/>
          </ContenedorLink>
        </ContenedorLinks>
      </ContenedorMain>
      <MensajeFinal>
        <TextoFinal>
          "A donde tu vayas, iré yo; y donde tu vivas, viviré yo; tu 
          pueblo será mi pueblo y tu Dios será mi Dios"
          <br />
          <br />
          - Rut 1,16
        </TextoFinal>
      </MensajeFinal>
      <img style={{width: "40%"}} alt='love' src={love} />
    </Contenedor>
  );
}

const HrLine = styled.hr`
  width: 85%;
  margin-top: 1em;
  border: solid 1px;
  filter: blur(1px);
`;

const MensajeFinal = styled.footer`
  margin: 3rem 0.5rem;
`;

const TextoFinal = styled.p`
  font-size: 2rem;
  text-align: center;
  font-size: 2.5rem;

  @media (max-width: 500px) {
    font-size: 1.4rem;
	}
`;

const Texto = styled.p`
  font-size: 2.2rem;
  text-align: center;
  font-style: italic;
  color: #fff;
  margin: 1rem 0;

  @media (max-width: 500px) {
    font-size: 1rem;
	}
`;

const TextoDate = styled.p`
  @import url('https://fonts.googleapis.com/css2?family=Ms+Madi&display=swap');
  font-family: 'Ms Madi', cursive;
  font-size: 2.7rem;
  text-align: center;
  color: #fff;
  padding: 1.2rem 0 1.2rem;

  @media (max-width: 500px) {
    font-size: 1.8rem;
	}
`;

const Link = styled.a`
  @import url('https://fonts.googleapis.com/css2?family=Square+Peg&display=swap');
  text-decoration: none;
  display: block;
  text-align: center;
  /* background: rgb(215, 140, 260); */
  background: rgb(197, 127, 250);
  border: rgb(212, 158, 253);
  border-radius: 10px;
	font-size: 1.3rem;
  color: #fff;
  padding: 0.8em 1.2em;
  width: 75%;
  margin: 1rem 0;
  cursor: pointer;
  font-family: 'Square Peg', cursive;

  &:hover {
    background: rgb(186, 106, 248);
    cursor: pointer;
  }

  @media (max-width: 500px) {
    width: 90%;
    padding: 1rem 0;
    font-size: 1.4rem;
	}
`;

const Imagen = styled.img`
  width: 75%;
  margin-top: 1rem;
  border-radius: 3rem;

  @media (max-width: 500px) {
    width: 90%;
	}
`;

const ContenedorDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-buttom: 2rem;
  width: 100%;
  align-items: center;
`;

const ContenedorLink = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-buttom: 2rem;
  width: 90%;
  align-items: center;
`;

const ContenedorLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  margin-top: 2rem;
  flex-direction: column;
  width: 100%;

  @media (max-width: 700px) {
    display: flex;
    margin-buttom: 2rem;
	}
`;

const ContenedorMain = styled.main`
  margin: 1rem 0 2rem 0;
  width: 100%;
`;

export default Invitacion;

