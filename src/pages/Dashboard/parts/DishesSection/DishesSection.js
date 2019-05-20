import React from 'react';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const DishesSection = () => (
  <>
    <Grid.Row columns="1">
      <Grid.Column>
        <Link to="/items">
          <Header>
            Dishes
          </Header>
        </Link>
      </Grid.Column>
    </Grid.Row>
  </>
);

export default DishesSection;
