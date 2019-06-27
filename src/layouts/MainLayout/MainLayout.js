import React, { useState } from 'react';
import {
  Menu,
  Sidebar,
  Icon,
} from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  APP_NAME,
} from '../../constants';

// Containers
import AuthContainer from '../../containers/AuthContainer';
import UserContainer from '../../containers/UserContainer';
import RestaurantContainer from '../../containers/RestaurantContainer';
import MenusContainer from '../../containers/MenusContainer';
import ItemsContainer from '../../containers/ItemsContainer';

// Components
import Navbar from '../../components/Navbar';
import AnimatedHamburger from '../../components/AnimatedHamburger';

// utils
import fadeIn from '../../anime/fadeIn';

const Wrapper = styled.div`
  height: 100%;
  animation: ${fadeIn} 1s ease;
  background-color: green;
`;

const Section = styled.section``;

const MainLayout = ({ history, children }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!visible);

  return (
    <AuthContainer>
      <UserContainer>
        <RestaurantContainer>
          <MenusContainer>
            <ItemsContainer>
              <Wrapper>
                <Sidebar.Pushable>
                  <Sidebar
                    as={Menu}
                    animation="push"
                    icon="labeled"
                    inverted
                    vertical
                    visible={visible}
                    width="thin"
                  >
                    <Menu.Item
                      as="a"
                      onClick={() => history.push('/dashboard')}
                      style={{ fontSize: '1.75rem' }}
                    >
                      {APP_NAME}
                    </Menu.Item>

                    <Menu.Item
                      as="a"
                      onClick={() => history.push('/reservations')}
                    >
                      <Icon name="hourglass outline" />
                      Reservations
                    </Menu.Item>

                    <Menu.Item
                      as="a"
                      onClick={() => history.push('/items')}
                    >
                      <Icon name="coffee" />
                      Dishes
                    </Menu.Item>

                    <Menu.Item
                      as="a"
                      onClick={() => history.push('/restaurant')}
                    >
                      <Icon name="building outline" />
                      Restaurant
                    </Menu.Item>
                  </Sidebar>

                  <Sidebar.Pusher
                    dimmed={visible}
                    onClick={visible ? toggleVisible : null}
                  >
                    <Section>
                      <Navbar
                        toggleMenu={toggleVisible}
                        menuButton={(
                          <AnimatedHamburger open={visible} />
                        )}
                      />
                      {children}
                      {/* <Footer /> */}
                    </Section>
                  </Sidebar.Pusher>
                </Sidebar.Pushable>
              </Wrapper>
            </ItemsContainer>
          </MenusContainer>
        </RestaurantContainer>
      </UserContainer>
    </AuthContainer>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape().isRequired,
};

MainLayout.defaultProps = {};

export default connect(
  ({ userReducer }) => ({ user: userReducer.user }),
)(withRouter(MainLayout));
