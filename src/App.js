import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormularioInvitado from './components/FormularioInvitado';
import ListaFamilias from './components/ListaFamilias';
import Bienvenida from './weddingPublicApp/components/Bienvenida';
import Confirmacion from './weddingPublicApp/components/Confirmacion';
import Despedida from './weddingPublicApp/components/Despedida';

const App = () => {
  return (
	<BrowserRouter>
		<div>
			<Routes>
				<Route path="/:codigo" element={<Bienvenida />} />
				<Route path="/confirmacion/:codigo" element={<Confirmacion />} />
				<Route path="/despedida/:trigger" element={<Despedida />} />
				<Route path="/admin" element={
					<ContenedorAdmin>
						<Titulo>Wedding Admin</Titulo>
						<FormularioInvitado />
						<ListaFamilias />
					</ContenedorAdmin>
				} />
			</Routes>
		</div>
	</BrowserRouter>
  );
}
 
const ContenedorAdmin = styled.div`
	background-color: rgba(200, 150, 255, 0.657);
    box-shadow: 0.4em 0.4em 10px rgb(136, 66, 248), -0.4em -0.4em 10px rgb(136, 66, 248); 
    backdrop-filter: blur(5px);
	margin-top: 2em;
	margin-bottom: 2em;
	width: 50%;
	padding: 2em 0.5em 2em 0.5em;
	border-radius: 5px;
	text-align: center;

	@media (max-width: 900px) {
		width: 90%;
	}
`;

const Titulo = styled.h2`
	font-size: 4em;
	color: #fff;
	margin-bottom: 0.6em;
`;
 
export default App;