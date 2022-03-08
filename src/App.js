import React from 'react';
import styled from 'styled-components';
import FormularioInvitado from './components/FormularioInvitado';
import ListaFamilias from './components/ListaFamilias';

const App = () => {
  return (
    <Contenedor>
      <Titulo>Wedding Admin</Titulo>
	  <FormularioInvitado />
	  <ListaFamilias />
    </Contenedor>
  );
}
 
const Contenedor = styled.div`
	margin-top: 2em;
	width: 50%;
	background: rgb(255,255,255);
	padding: 2em 0.5em 2em 0.5em;
	border-radius: 5px;
	text-align: center;

	@media (max-width: 900px) {
		width: 90%;
	}
`;

const Titulo = styled.h2`
	margin-bottom: 10px;
`;
 
export default App;