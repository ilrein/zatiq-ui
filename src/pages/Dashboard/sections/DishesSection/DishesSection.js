import React, { useState } from 'react';
import {
  Grid,
  Header,
  Pagination,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';

import DishCard from '../../../../components/DishCard';

import {
  API_DISHES,
} from '../../../../constants';

const PaginationRow = styled(Grid.Row)`
  flex-direction: row-reverse !important;
  margin: 0 1rem !important;
`;

const DishesSection = ({
  dishes,
  userReducer,
  captureItems,
}) => {
  const { user, cognitoUser } = userReducer;
  const { restaurantId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  const [loading, setLoading] = useState(false);

  const getPageOfDishes = async (pageNumber) => {
    setLoading(true);
    try {
      const get = await fetch(`${API_DISHES}?restaurantId=${restaurantId}&limit=10&page=${pageNumber}`, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
      });

      const result = await get.json();
      captureItems(result);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
    setLoading(false);
  };

  return (
    <Grid>
      <Grid.Row columns="1">
        <Grid.Column>
          <Header>
            <Link to="/dishes">
              Dishes ({`${dishes.totalDocs}`})
            </Link>
          </Header>
          
          {
            dishes.totalDocs === 0
              ? (
                <Link to="/dishes">
                  <div>
                    Add your first dish now.
                  </div>
                </Link>
              )
              : null
          }
        </Grid.Column>
      </Grid.Row>

      {
        loading 
          ? (
            <>loading...</>
          )
          : (
            <Grid.Row>
              {
                dishes.totalDocs > 0
                  ? (
                    dishes.docs.map(DOC => (
                      <Grid.Column
                        key={DOC._id}
                        mobile={16}
                        tablet={8}
                        computer={4}
                      >
                        <DishCard doc={DOC} />
                      </Grid.Column>
                    ))
                  )
                  : null
              }
            </Grid.Row>
          )
      }
  
      {
        dishes.totalDocs > 0
          ? (
            <PaginationRow>
              <Pagination
                boundaryRange={0}
                defaultActivePage={dishes.page}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={dishes.totalPages}
                page={dishes.page}
                onPageChange={(event, { activePage }) => getPageOfDishes(activePage)}
              />
            </PaginationRow>
          )
          : null
      }
    </Grid>
  );
};

DishesSection.propTypes = {
  dishes: PropTypes.shape().isRequired,
  userReducer: PropTypes.shape().isRequired,
  captureItems: PropTypes.func.isRequired,
};

export default DishesSection;
