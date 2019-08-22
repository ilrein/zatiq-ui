import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Segment,
  Header,
  Button,
} from 'semantic-ui-react';

import { CAPTURE_COGNITO_USER } from '../../constants';

const Wrapper = styled.div`
  height: 100%;
`;

class AuthContainer extends Component {
  state = {
    loading: true,
    err: false,
  }

  componentDidMount() {
    const {
      history,
      captureUser,
    } = this.props;

    Auth.currentAuthenticatedUser({
      bypassCache: true,
    })
      .then((user) => {
        captureUser(user);
        this.setState(prevState => ({
          ...prevState,
          loading: false,
        }));
      })
      .catch((err) => {
        this.setState(prevState => ({
          ...prevState,
          err,
          loading: false,
        }), () => history.push('/login'));
      });
  }

  render() {
    const {
      err,
      loading,
    } = this.state;
    
    const {
      children,
      history,
    } = this.props;

    return (
      err || loading
        ? (
          <Segment
            loading={loading}
            placeholder
          >
            <Header>
              {err}
            </Header>
            <Button
              onClick={() => history.push('/')}
            >
              Return to Login
            </Button>
          </Segment>
        )
        : (
          <Wrapper>
            {children}
          </Wrapper>
        )
    );
  }
}

const mapDispatchToProps = dispatch => ({
  captureUser: payload => dispatch({
    type: CAPTURE_COGNITO_USER,
    payload,
  }),
});

AuthContainer.propTypes = {
  captureUser: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(AuthContainer));
