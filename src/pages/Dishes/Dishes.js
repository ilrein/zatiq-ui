import React, { useState } from 'react';
import {
  Button,
  Header,
  Icon,
  Grid,
} from 'semantic-ui-react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Storage } from 'aws-amplify';
import uuidv4 from 'uuid/v4';

import fadeIn from '../../anime/fadeIn';
import {
  API_DISHES,
} from '../../constants';
import NewDishModal from '../../components/NewDishModal';
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

const SpreadHeader = styled.div`
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
  align-dishes: center;
  margin: 1rem 0 2rem 0;
`;

const Items = ({
  userReducer,
  dishes,
  captureItems,
}) => {
  const { cognitoUser, user } = userReducer;
  const { restaurantId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  // new dish states
  const [newItemModalIsOpen, setNewItemModalOpen] = useState(false);
  const [savingNewItem, setSavingNewItem] = useState(false);

  const createNewDish = async (name, description, price, image) => {
    try {
      setSavingNewItem(true);

      // create the dish first
      const DISH_POST = await fetch(API_DISHES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: JSON.stringify({
          dish: {
            restaurantId,
            name,
            description,
            image: null,
            price,
          },
        }),
      });

      const NEW_DISH = await DISH_POST.json();

      // if there is an image as well
      // upload it, then update the dish with it
      if (image.name) {
        /**
         * removes any whitespace while generating a unique ID
         */
        const PUT = await Storage.put(
          (`${restaurantId}/dishes/${uuidv4()}-${image.name}`).replace(/\s/g, ''),
          image,
          { level: 'public' },
        );

        const { key } = PUT;

        // update the dish with the image
        await fetch(`${API_DISHES}/${NEW_DISH._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'jwt-token': jwtToken,
          },
          body: JSON.stringify({
            dish: {
              image: key,
            },
          }),
        });
      }

      // query for dishes again now that a new insert was made
      const getItems = await fetch(API_DISHES, {
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
        <SpreadHeader>
          <Header style={{ margin: 0 }}>
            Dishes
          </Header>

          <Button
            primary
            icon
            labelPosition="left"
            onClick={() => setNewItemModalOpen(true)}
          >
            <Icon name="plus" />
            New Dish
          </Button>
        </SpreadHeader>
        {
          dishes.totalDocs === 0
            ? (
              <>
                <p>
                  No dishes found.
                  Add your first one now.
                </p>
              </>
            )
            : (
              <Grid
                columns={4}
                divided
                stackable
              >
                {
                  dishes.docs.map(DOC => (
                    <DishCard
                      key={DOC._id}
                      doc={DOC}
                    />
                  ))
                }
              </Grid>
            )
        }
        <NewDishModal
          open={newItemModalIsOpen}
          onClose={() => setNewItemModalOpen(false)}
          loading={savingNewItem}
          onSubmit={createNewDish}
        />
      </InnerWrapper>
    </Wrapper>
  );
};

Items.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  dishes: PropTypes.shape().isRequired,
  captureItems: PropTypes.func.isRequired,
};

export default Items;
