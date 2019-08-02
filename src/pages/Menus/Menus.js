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
  Table,
  Label,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import fetch from 'isomorphic-fetch';

import fadeIn from '../../anime/fadeIn';
import NewMenuModal from '../../components/NewMenuModal';
import { API_MENUS, API_DISHES } from '../../constants';

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
  captureMenu,
}) => {
  const { user, cognitoUser } = userReducer;
  const { restaurantId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  const [loadingDishes, setLoadingDishes] = useState(false);
  const [newMenuModalIsOpen, setNewMenuModalIsOpen] = useState(false);
  const [savingNewMenu, setSavingNewMenu] = useState(false);

  const [fullDishList, setFullDishList] = useState([]);

  const submitNewMenu = async (params) => {
    if (restaurantId === undefined) return;

    setSavingNewMenu(true);

    try {
      const post = await fetch(API_MENUS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: JSON.stringify({
          menu: {
            restaurantId,
            ...params,
          },
        }),
      });

      const newMenu = await post.json();
      setNewMenuModalIsOpen(false);
      captureMenu(newMenu);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
    setSavingNewMenu(false);
  };

  const getAllDishes = async () => {
    if (restaurantId === undefined) return;

    setLoadingDishes(true);

    try {
      const get = await fetch(`${API_DISHES}?restaurantId=${restaurantId}&limit=500`, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });
      
      const result = await get.json();
      setFullDishList(result);
      // console.log('t', result);
    } catch (error) {
      console.log(error) // eslint-disable-line
    }
    setLoadingDishes(false);
  };

  useEffect(() => {
    getAllDishes();
  }, [restaurantId]);

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
          dishes={fullDishList}
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
          <Table
            celled
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell collapsing>
                  Name
                </Table.HeaderCell>
                <Table.HeaderCell collapsing>
                  Times
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Dishes
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                menus.totalDocs > 0
                  ? menus.docs.map(doc => (
                    <Table.Row collapsing>
                      <Table.Cell>
                        {doc.name}
                      </Table.Cell>
                      <Table.Cell collapsing>
                        {doc.startTime} - {doc.endTime}
                      </Table.Cell>
                      <Table.Cell>
                        {
                          doc.dishes.map(dish => (
                            <Label>
                              {dish.name}
                            </Label>
                          ))
                        }
                      </Table.Cell>
                    </Table.Row>
                  ))
                  : (
                    <Table.Row>
                      <Table.Cell colSpan="3">
                        No menus found.
                      </Table.Cell>
                    </Table.Row>
                  )
              }
            </Table.Body>
          </Table>
        </>
      </InnerWrapper>
    </Wrapper>
  );
};

Menus.propTypes = {
  menus: PropTypes.shape().isRequired,
  captureMenu: PropTypes.func.isRequired,
  userReducer: PropTypes.shape().isRequired,
};

export default Menus;
