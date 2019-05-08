import React from 'react';
import styled from 'styled-components';

const Kard = styled.div`
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 1rem;
`;

const CustomCard = ({ children }) => (
  <Kard>
    {children}
  </Kard>
);

export default CustomCard;
