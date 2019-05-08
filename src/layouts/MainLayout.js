import React, { Component } from 'react'
import {
  Button,
  Menu,
  Segment,
  Sidebar,
  Icon,
} from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  APP_NAME,
} from '../constants';
import AuthContainer from '../containers/AuthContainer';
import UserContainer from '../containers/UserContainer';
import CompanyContainer from '../containers/CompanyContainer';

import Navbar from '../components/Navbar';

import fadeIn from '../anime/fadeIn';

const Wrapper = styled.div`
  height: 100%;
  animation: ${fadeIn} 1s ease;
  background-color: green;
`;

const Brand = styled.div`
  padding: 1rem;
  color: white;
  font-size: 1.1rem;
`;

class MainLayout extends Component {
  state = {
    visible: false,
  }

  toggleVisibility = () => {
    this.setState(prevState => ({
      ...prevState,
      visible: !prevState.visible,
    }));
  }

  render() {
    const {
      visible,
    } = this.state;

    const {
      children,
      // user,
    } = this.props;

    return (
      <AuthContainer>
        <UserContainer>
          <CompanyContainer>
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
                  <Brand>
                    {APP_NAME}
                  </Brand>
                </Sidebar>

                <Sidebar.Pusher
                  dimmed={visible}
                  onClick={visible ? this.toggleVisibility : null}
                >
                  <>
                    <Navbar
                      toggleMenu={this.toggleVisibility}
                      menuButton={(
                        <Icon
                          name="sidebar"
                        />
                      )}
                    />
                    {children}
                  </>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </Wrapper>
          </CompanyContainer>
        </UserContainer>
      </AuthContainer>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  // history: PropTypes.shape().isRequired,
  // user: PropTypes.shape(),
  // clearUser: PropTypes.func.isRequired,
};

// MainLayout.defaultProps = {
//   user: {},
// };

export default connect(
  ({ userReducer }) => ({ user: userReducer.user }),
)(MainLayout);
