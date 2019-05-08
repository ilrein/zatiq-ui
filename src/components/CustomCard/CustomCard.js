import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

CustomCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomCard;
