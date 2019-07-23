import React, { useState } from 'react';
import {
  Button,
  Header,
  Icon,
  Grid,
  Breadcrumb,
} from 'semantic-ui-react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Storage } from 'aws-amplify';
import uuidv4 from 'uuid/v4';
import { Link } from 'react-router-dom';

import fadeIn from '../../anime/fadeIn';
import {
  API_DISHES,
} from '../../constants';
import NewDishModal from '../../components/NewDishModal';
import DishCard from '../../components/DishCard';

// utils
import refreshSession from '../../utils/refreshSession';

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

const Dishes = ({
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

  // serverside errors
  const [serversideErrors, setServersideErrors] = useState([]);

  const createNewDish = async (
    name,
    description,
    price,
    variations,
    image,
    dietaryCategories,
    freeAddons,
    paidAddons,
  ) => {
    try {
      setSavingNewItem(true);
      
      let IMAGE_URI = null;
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
        IMAGE_URI = key;
      }

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
            image: IMAGE_URI,
            price,
            variations,
            dietaryCategories,
            freeAddons,
            paidAddons,
          },
        }),
      });

      await DISH_POST.json();

      // query for dishes again now that a new insert was made
      const getItems = await fetch(`${API_DISHES}?restaurantId=${restaurantId}&limit=10&page=1`, {
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
      setServersideErrors([]);
    } catch (error) {
      setSavingNewItem(false);
      setServersideErrors(error);
      console.log(error) // eslint-disable-line

      refreshSession();
    }
  };

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
            Dishes
          </Breadcrumb.Section>
        </Breadcrumb>

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
                stackable
              >
                <Grid.Row>
                  {
                    dishes.docs.map(DOC => (
                      <Grid.Column
                        key={DOC._id}
                        mobile={16}
                        tablet={8}
                        computer={4}
                      >
                        <DishCard
                          doc={DOC}
                        />
                      </Grid.Column>
                    ))
                  }
                </Grid.Row>
              </Grid>
            )
        }
        <NewDishModal
          open={newItemModalIsOpen}
          onClose={() => setNewItemModalOpen(false)}
          loading={savingNewItem}
          onSubmit={createNewDish}
          errors={serversideErrors}
        />
      </InnerWrapper>
    </Wrapper>
  );
};

Dishes.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  dishes: PropTypes.shape().isRequired,
  captureItems: PropTypes.func.isRequired,
};

export default Dishes;
