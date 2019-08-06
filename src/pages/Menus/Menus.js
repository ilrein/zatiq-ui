import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Button,
  Header,
  Icon,
  Breadcrumb,
  Message,
  Table,
  Label,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import isNil from 'ramda/src/isNil';
import { toast } from 'react-toastify';

import fadeIn from '../../anime/fadeIn';
import { API_MENUS, API_DISHES } from '../../constants';

// components
import NewMenuModal from '../../components/NewMenuModal';
import UpdateMenuModal from '../../components/UpdateMenuModal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';

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

const Menus = ({
  userReducer,
  menus,
  captureMenu,
  captureMenus,
}) => {
  const { user, cognitoUser } = userReducer;
  const { restaurantId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  const [loadingDishes, setLoadingDishes] = useState(false);
  const [newMenuModalIsOpen, setNewMenuModalIsOpen] = useState(false);
  const [savingNewMenu, setSavingNewMenu] = useState(false);

  const [fullDishList, setFullDishList] = useState([]);

  // delete state
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [menuIdToDelete, setMenuIdToDelete] = useState(null);

  // update modal
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [menuToUpdate, setMenuToUpdate] = useState(null);
  const [updatingMenu, setUpdatingMenu] = useState(false);

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

  const getMenusByrestaurantId = async () => {
    if (!isNil(restaurantId)) {
      try {
        const get = await fetch(`${API_MENUS}?restaurantId=${restaurantId}&limit=10&page=1`, {
          headers: {
            'Content-Type': 'application/json',
            'jwt-token': jwtToken,
          },
        });

        const result = await get.json();
        captureMenus(result);
      } catch (error) {
        console.log(error); // eslint-disable-line
      }
    }
  };

  const deleteMenu = async () => {
    setDeleting(true);

    try {
      const remove = await fetch(`${API_MENUS}/${menuIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      await remove.json();
      getMenusByrestaurantId();
      toast.success('Deleted menu');
    } catch (error) {
      console.log(error) // eslint-disable-line
    }

    setDeleting(false);
    setDeleteModalIsOpen(false);
  };

  const updateMenu = async () => {};

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

        <ConfirmDeleteModal
          open={deleteModalIsOpen}
          onDelete={deleteMenu}
          loading={deleting}
          onClose={() => setDeleteModalIsOpen(false)}
        />

        {
          menuToUpdate
            ? (
              <UpdateMenuModal
                open={updateModalIsOpen}
                loading={updatingMenu}
                onClose={() => setUpdateModalIsOpen(false)}
                menu={menuToUpdate}
                dishes={fullDishList}
              />
            )
            : null
        }
  
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
                <Table.HeaderCell float="right">
                  Actions
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
                      <Table.Cell collapsing>
                        <Button.Group>
                          <Button
                            icon="edit"
                            color="blue"
                            onClick={() => {
                              setUpdateModalIsOpen(true);
                              setMenuToUpdate(doc);
                            }}
                          />
                          <Button
                            icon="remove"
                            color="red"
                            onClick={() => {
                              setDeleteModalIsOpen(true);
                              setMenuIdToDelete(doc._id);
                            }}
                          />
                        </Button.Group>
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
  captureMenus: PropTypes.func.isRequired,
  userReducer: PropTypes.shape().isRequired,
};

export default Menus;
