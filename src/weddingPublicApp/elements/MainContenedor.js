import styled from 'styled-components';

const MainContenedor = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-shadow: 3px 3px 2px black;
	  margin: auto;
    width: 100%;

    @media (max-width: 900px) {
      font-size: 1em;
    }
`;

export default MainContenedor;