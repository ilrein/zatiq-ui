import React from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { darken } from 'polished';

import { ORANGE } from '../../constants';

const Btn = styled(Button)`
  background-color: ${ORANGE} !important;
  color: white !important;
  padding: 1rem 3rem !important;

  &:hover {
    background-color: ${darken(0.2, ORANGE)} !important;
  }
`;

const PurpleButton = ({ children, ...restProps }) => (
  <Btn {...restProps}>
    {children}
  </Btn>
);

export default PurpleButton;
