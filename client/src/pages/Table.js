import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  td,
  th {
    text-align: left;
    padding: 0.5rem;
  }

  tbody > tr:nth-child(odd) {
    background-color: #f4f4f4;
  }
`;

export default Table;
