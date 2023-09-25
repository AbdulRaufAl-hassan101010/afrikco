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
        defaultValue={value}
        onChange={onChangeHandler}
      />
    </Styles>
  );
};

export default Input;
