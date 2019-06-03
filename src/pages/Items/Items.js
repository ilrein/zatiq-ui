import React, { useState } from 'react';
import {
  Button,
  Header,
  Icon,
} from 'semantic-ui-react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Storage } from 'aws-amplify';
import uuidv4 from 'uuid/v4';

import fadeIn from '../../anime/fadeIn';
import {
  API_ITEMS,
} from '../../constants';
import NewItemModal from '../../components/NewItemModal';
import DishCard from '../../components/DishCard';

const Wrapper = styled.div`
  display: flex;
  animation: ${fadeIn} 1s ease;
  height: 100%;
`;

const InnerWrapper = styled.div`
  margin: 0.25rem 1rem;
  width: 100%;
`;

const Items = ({
  userReducer,
  items,
  captureItems,
}) => {
  const { cognitoUser, user } = userReducer;
  const { companyId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  // new dish states
  const [newItemModalIsOpen, setNewItemModalOpen] = useState(false);
  const [savingNewItem, setSavingNewItem] = useState(false);

  const createNewDish = async (name, description, price, image) => {
    try {
      setSavingNewItem(true);

      const PUT = await Storage.put(
        (`${uuidv4()}-${image.name}`).replace(/\s/g, ''),
        image,
        { level: 'public' },
      );

      const { key } = PUT;
      
      await fetch(API_ITEMS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: JSON.stringify({
          item: {
            companyId,
            name,
            description,
            image: key,
            price,
          },
        }),
      });

      const getItems = await fetch(API_ITEMS, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      const freshItems = await getItems.json();
      captureItems(freshItems);
      toast.success(`Successfully created ${name}`);
      setNewItemModalOpen(false);
      setSavingNewItem(false);
    } catch (error) {
      console.log(error) // eslint-disable-line
    }
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Header>
          Dishes
        </Header>
        {
          items.totalDocs === 0
            ? (
              <>
                <p>
                  No dishes found.
                  Add your first one now.
                </p>
                <Button
                  primary
                  icon
                  labelPosition="left"
                  onClick={() => setNewItemModalOpen(true)}
                >
                  <Icon name="plus" />
                  New Item
                </Button>
                <NewItemModal
                  open={newItemModalIsOpen}
                  onClose={() => setNewItemModalOpen(false)}
                  loading={savingNewItem}
                  onSubmit={createNewDish}
                />
              </>
            )
            : (
              <>
                {
                  items.docs.map(DOC => (
                    <DishCard
                      key={DOC._id}
                      dish={DOC}
                    />
                  ))
                }
              </>
            )
        }
      </InnerWrapper>
    </Wrapper>
  );
};

Items.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  items: PropTypes.shape().isRequired,
  captureItems: PropTypes.func.isRequired,
};

export default Items;
