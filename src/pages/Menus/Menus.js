import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Button,
  Header,
  Icon,
  Grid,
  Breadcrumb,
  Message,
  // Pagination,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import fetch from 'isomorphic-fetch';

import fadeIn from '../../anime/fadeIn';
import NewMenuModal from '../../components/NewMenuModal';
import { API_DISHES } from '../../constants'

import { copy } from './copy.json';

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
  userReducer,
  menus,
}) => {
  const { user, cognitoUser } = userReducer;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  const [loadingDishes, setLoadingDishes] = useState(false);
  const [newMenuModalIsOpen, setNewMenuModalIsOpen] = useState(false);
  const [savingNewMenu, setSavingNewMenu] = useState(false);

  const [fullDishList, setFullDishList] = useState([]);

  const submitNewMenu = (params) => {
    console.log(params);
  };

  const getAllDishes = async () => {
    setLoadingDishes(true);

    try {
      const get = await fetch(`${API_DISHES}?restaurantId=${user.restaurantId}&limit=500`, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });
      
      const result = await get.json();
      setFullDishList(result);
      console.log(result);
    } catch (error) {
      console.log(error) // eslint-disable-line
    }
    setLoadingDishes(false);
  };

  useEffect(() => {
    getAllDishes();
  }, []);

  return (
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
  
        <NewMenuModal
          open={newMenuModalIsOpen}
          onSubmit={submitNewMenu}
          loading={savingNewMenu}
          onClose={() => setNewMenuModalIsOpen(false)}
          // dishes={fullDishList}
        />
  
        <SpreadHeader>
          <Header style={{ margin: 0 }}>
            Menus ({menus.totalDocs})
          </Header>
  
          <Button
            primary
            icon
            labelPosition="left"
            onClick={() => setNewMenuModalIsOpen(true)}
            loading={loadingDishes}
          >
            <Icon name="plus" />
            New Menu
          </Button>
        </SpreadHeader>
        <>
          <Message
            info
            header="Menus are optional"
            content={copy.information}
          />
          <p>
            body
          </p>
        </>
      </InnerWrapper>
    </Wrapper>
  );
};

Menus.propTypes = {
  menus: PropTypes.shape().isRequired,
};

export default Menus;
