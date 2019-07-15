import React, { useState, useEffect } from 'react';
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
import DishesContainer from '../../containers/DishesContainer';

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

  const pushAndToggle = (path) => {
    setVisible(!visible);
    history.push(path);
  };

  const handleKeyPress = (e) => {
    console.log(visible);
    if (e.code === 'KeyQ') {
      setVisible(!visible);
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, []); // eslint-disable-line

  return (
    <AuthContainer>
      <UserContainer>
        <RestaurantContainer>
          <DishesContainer>
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
                    onClick={() => pushAndToggle('/dashboard')}
                    style={{ fontSize: '1.75rem' }}
                  >
                    {APP_NAME}
                  </Menu.Item>

                  <Menu.Item
                    as="a"
                    onClick={() => pushAndToggle('/reservations')}
                  >
                    <Icon name="hourglass outline" />
                    Reservations
                  </Menu.Item>

                  <Menu.Item
                    as="a"
                    onClick={() => pushAndToggle('/dishes')}
                  >
                    <Icon name="coffee" />
                    Dishes
                  </Menu.Item>

                  <Menu.Item
                    as="a"
                    onClick={() => pushAndToggle('/restaurant')}
                  >
                    <Icon name="building outline" />
                    Restaurant
                  </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher
                  // dimmed={visible}
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
          </DishesContainer>
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
