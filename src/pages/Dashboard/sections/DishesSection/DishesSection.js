import React from 'react';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DishesSection = ({
  // userReducer,
  items,
}) => (
  <Grid>
    <Grid.Row columns="1">
      <Grid.Column>
        <Link to="/items">
          <Header>
            Dishes
          </Header>
        </Link>
        {
          items.totalDocs === 0
            ? (
              <Link to="/items">
                <div>
                  Add your first dish now.
                </div>
              </Link>
            )
            : (
              <div>
                list of dishes here...
              </div>
            )
        }
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

DishesSection.propTypes = {
  // userReducer: PropTypes.shape().isRequired,
  items: PropTypes.shape().isRequired,
};

export default DishesSection;
