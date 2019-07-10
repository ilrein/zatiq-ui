import React from 'react';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import DishCard from '../../../../components/DishCard';

const DishesSection = ({
  dishes,
}) => (
  <Grid>
    <Grid.Row columns="1">
      <Grid.Column>
        <Header>
          Dishes
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

    <Grid.Row>
      {
        dishes.totalDocs > 0
          ? (
            dishes.docs.map(DOC => (
              <>
                <Grid.Column
                  key={DOC._id}
                  mobile={16}
                  tablet={8}
                  computer={4}
                >
                  <DishCard doc={DOC} />
                </Grid.Column>
              </>
            ))
          )
          : null
      }
    </Grid.Row>
  </Grid>
);

DishesSection.propTypes = {
  dishes: PropTypes.shape().isRequired,
};

export default DishesSection;
