import React from 'react';
import {
  Grid,
  Header,
  Table,
  Button,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatUSD from 'format-usd';

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
            : (
              items.docs.map(DOC => (
                <Link
                  to={`/items/${DOC._id}`}
                  key={DOC._id}
                >
                  <DishCard doc={DOC} />
                </Link>
              ))
            )
        }
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

DishesSection.propTypes = {
  items: PropTypes.shape().isRequired,
};

export default DishesSection;
