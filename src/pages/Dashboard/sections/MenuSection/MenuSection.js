import React from 'react';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MenuSection = () => (
  <>
    <Grid.Row columns="1">
      <Grid.Column>
        <Link to="/menus">
          <Header>
            Menus
          </Header>
        </Link>
      </Grid.Column>
    </Grid.Row>
  </>
);

export default MenuSection;
