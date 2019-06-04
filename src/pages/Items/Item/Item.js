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
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Storage } from 'aws-amplify';
import formatUSD from 'format-usd';
import fetch from 'isomorphic-fetch';
// import uuidv4 from 'uuid/v4';

import fadeIn from '../../../anime/fadeIn';
import UpdateItemModal from '../../../components/UpdateItemModal';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import {
  API_ITEMS,
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
  align-items: center;
`;

const Item = ({
  userReducer,
  items,
  // company,
  match,
  // captureCompany,
  captureItems,
  history,
}) => {
  const { user, cognitoUser } = userReducer;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  const { companyId } = user;

  const { params } = match;
  const { id } = params;

  // grab the location from redux array rather than another request
  const ITEM = find(propEq('_id', id))(items.docs);

  // update
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  // delete
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // loading image
  const [fetchingImage, setFetchingImage] = useState(true);
  const [image, setImage] = useState(null);

  const getImage = async () => {
    try {
      const picture = await Storage.get(ITEM.image);
      setFetchingImage(false);
      setImage(picture);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  const updateItem = async (name) => {
    // try {
    //   setUpdating(true);
    //   await Storage.remove(LOCATION.image);

    //   const PUT = await Storage.put(
    //     (`${uuidv4()}-${updatedImage.name}`).replace(/\s/g, ''),
    //     updatedImage,
    //     { level: 'public' },
    //   );

    //   const { key } = PUT;

    //   await fetch(`${API_LOCATIONS}/${LOCATION._id}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'jwt-token': jwtToken,
    //     },
    //     body: JSON.stringify({
    //       location: {
    //         ...LOCATION,
    //         address: updatedAddress.formatted_address,
    //         image: key,
    //       },
    //     }),
    //   });

    //   const getLocationsAgain = await fetch(`${API_LOCATIONS}?companyId=${companyId}`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'jwt-token': jwtToken,
    //     },
    //   });

    //   const updatedLocations = await getLocationsAgain.json();
    //   captureLocations(updatedLocations);
    //   setUpdating(false);
    //   setOpen(false);
    //   history.push(`/locations/${LOCATION._id}`);
    // } catch (error) {
    //   console.log(error); // eslint-disable-line
    // }
  };

  const deleteItem = async () => {
    /**
     * 1. remove the image from the bucket
     * 2. delete the item object in Mongo
     */
    try {
      setDeleting(true);
      await Storage.remove(ITEM.image);

      await fetch(`${API_ITEMS}/${ITEM._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      const getItemsAgain = await fetch(API_ITEMS, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      const updatedItems = await getItemsAgain.json();
      captureItems(updatedItems);

      setDeleting(false);
      setDeleteModalOpen(false);
      history.push('/items');
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

              <Table
                basic="very"
                celled
                collapsing
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      Description
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Price
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      {ITEM.description}
                    </Table.Cell>
                    <Table.Cell>
                      {formatUSD({ amount: Object.values(ITEM.price)[0] })}
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
            <UpdateItemModal
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

Item.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  captureItems: PropTypes.func.isRequired,
};

export default Item;
