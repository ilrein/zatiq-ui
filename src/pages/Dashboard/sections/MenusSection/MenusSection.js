import React from 'react';
import {
  Grid,
  Header,
  Card,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenusSection = ({
  menus,
}) => (
  <Grid>
    <Grid.Row columns="1">
      <Grid.Column>
        <Header>
          <Link to="/menus">
            Menus ({menus.totalDocs})
          </Link>
        </Header>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={3}>
      {
        menus.totalDocs > 0
          ? menus.docs.map(MENU => (
            <Grid.Column>
              <Card
                header={MENU.name}
                description={`${MENU.startTime} - ${MENU.endTime}`}
              />
            </Grid.Column>
          ))
          : (
            <Grid.Column>
              <p>
                No menus found.
              </p>
            </Grid.Column>
          )
      }
    </Grid.Row>
  </Grid>
);

MenusSection.propTypes = {
  menus: PropTypes.shape().isRequired,
};

export default MenusSection;
