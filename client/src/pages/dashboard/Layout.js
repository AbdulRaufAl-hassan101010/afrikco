import Navbar from '../../components/dashboard/Navbar';
import styled from 'styled-components';
import AsideNav from './AsideNav';

const Styles = styled.div`
  main {
    display: grid;
    grid-template-columns: 2fr 10fr;
    grid-gap: 2rem;
    align-items: start;
  }

  @media (max-width: 978px) {
    main {
      grid-template-columns: 1fr;
    }
  }
`;

const Layout = ({ children }) => {
  return (
    <Styles>
      <Navbar />
      <main className="container">
        {/* aside nav */}
        <AsideNav />
        <div>{children}</div>
      </main>
    </Styles>
  );
};

export default Layout;
