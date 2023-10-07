import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const Styles = styled.div`
  margin-bottom: 1rem;
  input {
    border: 0.1rem solid #ccc;
    width: 100%;
    padding: 1rem;
    outline-color: #dc3545;
  }
`;

const Input = ({
  placeholder = '',
  value,
  update,
  type = 'text',
  max,
  min,
}) => {
  const onChangeHandler = (event) => {
    if (update) {
      update(event.target.value);
    }
  };

  return (
    <Styles>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        max={max}
        min={min}
      />
    </Styles>
  );
};

export default Input;
