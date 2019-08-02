import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Button,
  Header,
  Icon,
  Grid,
  Breadcrumb,
  // Pagination,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import fadeIn from '../../anime/fadeIn';

const Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 1s ease;
  height: 100%;
`;

const InnerWrapper = styled.div`
  margin: 0.25rem 1rem;
  width: 100%;
`;

const SpreadHeader = styled.div`
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0 2rem 0;
`;

const PaginationRow = styled(Grid.Row)`
  flex-direction: row-reverse !important;
  margin: 0 1rem !important;
`;

const Menus = ({
  menus,
}) => (
  <Wrapper>
    <InnerWrapper>
      <Breadcrumb>
        <Link to="/dashboard">
          <Breadcrumb.Section>
            Dashboard
          </Breadcrumb.Section>
        </Link>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>
          Menus
        </Breadcrumb.Section>
      </Breadcrumb>

      <SpreadHeader>
        <Header style={{ margin: 0 }}>
          Menus ({menus.totalDocs})
        </Header>

        <Button
          primary
          icon
          labelPosition="left"
          // onClick={() => setNewItemModalOpen(true)}
        >
          <Icon name="plus" />
          New Menu
        </Button>
      </SpreadHeader>
    </InnerWrapper>
  </Wrapper>
);

Menus.propTypes = {
  menus: PropTypes.shape().isRequired,
};

export default Menus;
