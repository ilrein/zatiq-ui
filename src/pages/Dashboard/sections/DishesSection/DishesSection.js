import React from 'react';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import DishCard from '../../../../components/DishCard';

const DishesSection = ({
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
            : null
        }
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={4} stackable>
      {
        items.totalDocs > 0
          ? (
            items.docs.map(DOC => (
              <Grid.Column key={DOC._id}>
                <DishCard doc={DOC} />
              </Grid.Column>
            ))
          )
          : null
      }
    </Grid.Row>
  </Grid>
);

DishesSection.propTypes = {
  items: PropTypes.shape().isRequired,
};

export default DishesSection;
