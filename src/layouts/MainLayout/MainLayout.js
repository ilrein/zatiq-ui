import React, { useEffect } from 'react';
import {
  Menu,
  Sidebar,
  Icon,
} from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import later from 'later';
import dayjs from 'dayjs';

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
import refreshSession from '../../utils/refreshSession';

const Wrapper = styled.div`
  height: 100%;
  animation: ${fadeIn} 1s ease;
  background-color: green;
`;

const Section = styled.section``;

const MainLayout = ({
  history,
  children,
  misc,
  toggleSidebar,
}) => {
  const { sidebarIsOpen } = misc;

  const pushAndToggle = (path) => {
    toggleSidebar();
    history.push(path);
  };

  const handleKeyPress = (e) => {
    if (e.code === 'Backquote') {
      toggleSidebar();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    later.setInterval(
      () => {
        console.log('refreshing session', dayjs().format('h:mm:ss a')); // eslint-disable-line
        refreshSession();
      },
      later.parse.text('every 15 min'),
    );
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
                  visible={sidebarIsOpen}
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
                  dimmed={sidebarIsOpen}
                  onClick={sidebarIsOpen ? toggleSidebar : null}
                >
                  <Section>
                    <Navbar
                      toggleMenu={toggleSidebar}
                      menuButton={(
                        <AnimatedHamburger open={sidebarIsOpen} />
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
  misc: PropTypes.shape().isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

MainLayout.defaultProps = {};

export default MainLayout;
