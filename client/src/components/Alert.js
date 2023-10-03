import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  color: #fff;
  background: ${(props) => (props.$type === 'danger' ? 'red' : 'lime')};
  z-index: 200;
  text-align: center;
  padding: 2rem;
`;

const Alert = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1000); // Set a timeout of 3000 milliseconds (3 seconds)

    return () => {
      clearTimeout(timer); // Clear the timeout if the component unmounts
      Array.from(document.querySelectorAll('alert')).forEach((el) => {
        el.remove();
      });
    };
  }, []);

  return visible ? (
    <Styles $type={type}>
      <div>{message}</div>
    </Styles>
  ) : null;
};

export default Alert;
