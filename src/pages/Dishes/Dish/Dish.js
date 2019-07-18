import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Header,
  Image,
  Segment,
  Button,
  Icon,
  Divider,
  Table,
  Breadcrumb,
  Label,
  List,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Storage } from 'aws-amplify';
import formatUSD from 'format-usd';
import fetch from 'isomorphic-fetch';
import uuidv4 from 'uuid/v4';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import fadeIn from '../../../anime/fadeIn';
import UpdateDishModal from '../../../components/UpdateDishModal';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import {
  API_DISHES,
} from '../../../constants';

const find = require('ramda/src/find');
const propEq = require('ramda/src/propEq');

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 1s ease;
`;

const InnerWrapper = styled.div`
  margin: 0.25rem 1rem;
`;

const SpreadHeader = styled.div`
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
  align-dishes: center;
  margin-top: 1rem;
`;

const Dish = ({
  userReducer,
  dishes,
  match,
  captureItems,
  history,
}) => {
  const { user, cognitoUser } = userReducer;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  const { restaurantId } = user;

  const { params } = match;
  const { id } = params;

  // grab the dish from redux array rather than another request
  const ITEM = find(propEq('_id', id))(dishes.docs);

  // update
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  // delete
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // loading image
  const [fetchingImage, setFetchingImage] = useState(false);
  const [image, setImage] = useState(null);

  const getImage = async (dishItem) => {
    setFetchingImage(true);
    try {
      const picture = await Storage.get(dishItem.image);
      setImage(picture);
      setFetchingImage(false);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  useEffect(() => {
    if (
      ITEM
      && ITEM.image !== null
    ) getImage(ITEM);
  }, []);

  const updateItem = async (name, description, price, picture) => {
    try {
      setUpdating(true);
      if (
        ITEM.image
        && picture !== undefined
      ) {
        await Storage.remove(ITEM.image);
      }

      let IMAGE_URI = '';
      if (
        picture !== null
        && picture !== undefined
        && picture.name
      ) {
        const PUT = await Storage.put(
          (`${uuidv4()}-${picture.name}`).replace(/\s/g, ''),
          picture,
          { level: 'public' },
        );

        const { key } = PUT;
        IMAGE_URI = key;
      }

      const updatedDishItem = await fetch(`${API_DISHES}/${ITEM._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: JSON.stringify({
          dish: {
            name,
            description,
            price,
            image: IMAGE_URI.length > 0 ? IMAGE_URI : null,
          },
        }),
      });

      const updatedDishItemPayload = await updatedDishItem.json();

      const getItemsAgain = await fetch(`${API_DISHES}?restaurantId=${restaurantId}&limit=50`, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      const updatedItems = await getItemsAgain.json();
      captureItems(updatedItems);
      setUpdating(false);
      setOpen(false);
      getImage(updatedDishItemPayload);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  const deleteItem = async () => {
    /**
     * 1. remove the image from the bucket
     * 2. delete the item object in Mongo
     */
    try {
      setDeleting(true);
      await Storage.remove(ITEM.image);

      await fetch(`${API_DISHES}/${ITEM._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      const getItemsAgain = await fetch(API_DISHES, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      const updatedItems = await getItemsAgain.json();
      captureItems(updatedItems);

      setDeleting(false);
      setDeleteModalOpen(false);
      history.push('/dishes');
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  return (
    <Wrapper>
      {
        user._id
        && ITEM
          ? (
            <InnerWrapper>
              <Breadcrumb>
                <Link to="/dashboard">
                  <Breadcrumb.Section>
                    Dashboard
                  </Breadcrumb.Section>
                </Link>
                <Breadcrumb.Divider icon="right chevron" />
                <Link to="/dishes">
                  <Breadcrumb.Section>
                    Dishes
                  </Breadcrumb.Section>
                </Link>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section active>
                  Dish
                </Breadcrumb.Section>
              </Breadcrumb>
              <SpreadHeader>
                <Header style={{ margin: 0 }}>
                  {ITEM.name}
                </Header>

                <div>
                  <Button
                    primary
                    icon
                    labelPosition="left"
                    onClick={() => setOpen(true)}
                    size="small"
                  >
                    <Icon name="edit" />
                    Update
                  </Button>
                  <Button
                    color="red"
                    icon
                    labelPosition="left"
                    onClick={() => setDeleteModalOpen(true)}
                    size="small"
                  >
                    <Icon name="remove" />
                    Delete
                  </Button>
                </div>
              </SpreadHeader>
              <Divider />
              {
                ITEM.image
                  ? (
                    <Segment
                      basic
                      loading={fetchingImage}
                      style={{ padding: 0 }}
                    >
                      <Image
                        src={image}
                        size="medium"
                      />
                    </Segment>
                  )
                  : null
              }

              <Table
                celled
                striped
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan="2">
                      Details
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row colSpan="2">
                    <Table.Cell>
                      Description
                    </Table.Cell>
                    <Table.Cell>
                      {
                        ITEM.description || 'null'
                      }
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row colSpan="2">
                    <Table.Cell>
                      Base Price
                    </Table.Cell>
                    <Table.Cell>
                      {
                        ITEM.price
                          ? formatUSD({ amount: Object.values(ITEM.price)[0] })
                          : null
                      }
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row colSpan="2">
                    <Table.Cell>
                      Variations
                    </Table.Cell>
                    <Table.Cell>
                      {
                        ITEM.variations.length > 0
                          ? ITEM.variations.map(variation => (
                            <List
                              divided
                              key={variation.name}
                            >
                              <List.Item>
                                <Label horizontal>
                                  {variation.name}
                                </Label>
                                {formatUSD({ amount: Object.values(variation.price) })}
                              </List.Item>
                            </List>
                          ))
                          : null
                      }
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row colSpan="2">
                    <Table.Cell>
                      Dietary Categories
                    </Table.Cell>
                    <Table.Cell>
                      {
                        ITEM.dietaryCategories.length > 0
                          ? ITEM.dietaryCategories.map(category => (
                            <Label
                              key={category}
                            >
                              {category}
                            </Label>
                          ))
                          : null
                      }
                    </Table.Cell>
                  </Table.Row>

                  {/* {
                    ITEM.variations
                  } */}

                  <Table.Row colSpan="2">
                    <Table.Cell>
                      Created On
                    </Table.Cell>
                    <Table.Cell>
                      {dayjs(ITEM.createdOn).format('ddd, MMMM YY h:MM A')}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row colSpan="2">
                    <Table.Cell>
                      Updated On
                    </Table.Cell>
                    <Table.Cell>
                      {dayjs(ITEM.updatedOn).format('ddd, MMMM YY h:MM A')}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </InnerWrapper>
          )
          : null
      }
      {
        ITEM
        && ITEM.name
          ? (
            <UpdateDishModal
              open={open}
              onClose={() => setOpen(false)}
              onSubmit={updateItem}
              loading={updating}
              dish={ITEM}
              image={image}
            />
          )
          : null
      }

      {
        ITEM
        && ITEM.name
          ? (
            <ConfirmDeleteModal
              heading={`Delete ${ITEM.name}`}
              open={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              onDelete={deleteItem}
              loading={deleting}
            />
          )
          : null
      }
    </Wrapper>
  );
};

Dish.propTypes = {
  dishes: PropTypes.shape().isRequired,
  userReducer: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  captureItems: PropTypes.func.isRequired,
};

export default Dish;
