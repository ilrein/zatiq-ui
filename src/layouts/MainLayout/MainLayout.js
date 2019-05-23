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
import AuthContainer from '../../containers/AuthContainer';
import UserContainer from '../../containers/UserContainer';
import CompanyContainer from '../../containers/CompanyContainer';
import LocationsContainer from '../../containers/LocationsContainer';
import MenusContainer from '../../containers/MenusContainer';
import ItemsContainer from '../../containers/ItemsContainer';
import Footer from '../../components/Footer';

import Navbar from '../../components/Navbar';

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
        <CompanyContainer>
          <LocationsContainer>
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
                        onClick={() => history.push('/locations')}
                      >
                        <Icon name="building" />
                        Locations
                      </Menu.Item>

                      {/* <Menu.Item
                        as="a"
                        onClick={() => history.push('/menus')}
                      >
                        <Icon name="book" />
                        Menus
                      </Menu.Item> */}

                      <Menu.Item
                        as="a"
                        onClick={() => history.push('/items')}
                      >
                        <Icon name="coffee" />
                        Dishes
                      </Menu.Item>

                      <Menu.Item
                        as="a"
                        onClick={() => history.push('/company')}
                      >
                        <Icon name="building outline" />
                        Company
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
                            <Icon
                              name="sidebar"
                            />
                          )}
                        />
                        {children}
                        <Footer />
                      </Section>
                    </Sidebar.Pusher>
                  </Sidebar.Pushable>
                </Wrapper>
              </ItemsContainer>
            </MenusContainer>
          </LocationsContainer>
        </CompanyContainer>
      </UserContainer>
    </AuthContainer>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape().isRequired,
  // user: PropTypes.shape(),
  // clearUser: PropTypes.func.isRequired,
};

// MainLayout.defaultProps = {
//   user: {},
// };

export default connect(
  ({ userReducer }) => ({ user: userReducer.user }),
)(withRouter(MainLayout));
