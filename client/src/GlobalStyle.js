import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {
--primary-color: var()
--secondary-color: var()
}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}

html {
  overflow-x: hidden;
  width: 100%;
  font: normal 1.5rem/1.5 'Roboto', sans-serif;
  font-size: 10px;
}

body {
  font: normal 1.5rem/1.5 'Roboto', sans-serif;
  background-color: #f3f3f3;
  color: #222
}


a {
  color: #1e1e1e;
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
}

img {
  width: 100%;
  height: 100%;
}


.container {
  max-width: 130rem;
  width: 95%;
  margin: 0 auto;
}


.flex {
  display: flex;
}


.jc-sb {
  justify-content: space-between;
}

.align-items-center {
  align-items: center;
}

.text-center {
  text-align: center;
}
.text-primary {
  color: #dc3545;
}
.text-grey {
  color: #757575;
}
.text-light {
  color: #ddd
}
.text-gold {
  color: gold
}


.mb-0 {
  margin-bottom: 0;
}
.mb-1 {
  margin-bottom: 1rem
}


fieldset {
  border: none
}

.bg-grey {
  background-color: #f4f4f4 !important;
  color: #1e1e1e !important
}

`;

export default GlobalStyle;
