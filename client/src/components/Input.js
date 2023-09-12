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

const Input = ({ placeholder = '', value, update, type = 'text' }) => {
  return (
    <Styles>
      <input type={type} placeholder={placeholder} value={value} />
    </Styles>
  );
};

export default Input;
