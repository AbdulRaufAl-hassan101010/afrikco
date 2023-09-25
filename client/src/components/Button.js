import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const Styles = styled.div`
  margin-bottom: 1rem;
  a,
  button {
    background-color: ${(props) => (props.$bg ? props.$bg : '#dc3545')};
    border: none;
    padding: 1rem 1.6rem;
    cursor: pointer;
    width: ${(props) => (props.display === 'block' ? '100%' : null)};
    color: #fff;
    font-family: 'Roboto', sans-serif;
  }

  a:hover,
  button:hover {
    opacity: 0.7;
  }
`;

const Wrapper = ({
  isButton,
  children,
  onClick,
  type,
  disabled,
  className,
}) => {
  return isButton ? (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <Link>{children}</Link>
  );
};

const Button = ({
  isButton = 'true',
  children,
  display,
  className,
  onClick,
  type = 'button',
  disabled = false,
}) => {
  return (
    <Styles display={display}>
      <Wrapper
        className={className}
        isButton={isButton}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {children}
      </Wrapper>
    </Styles>
  );
};

export default Button;
