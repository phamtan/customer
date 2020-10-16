import styled from 'styled-components';

const CompanyLayout = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .mainPage {
    width: calc(100% - 300px);
    min-height: 100vh;
    @media screen and (max-width: 769px) {
      width: 100%;
    }
  }
`;

export default CompanyLayout;
