import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './App.css';

const GlobalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        padding:0;
        font-family: 'Montserrat', sans-serif;

    }

    h1{
        font-size: 1.875rem;
        
    }
    
    
`;

export default GlobalStyles;
