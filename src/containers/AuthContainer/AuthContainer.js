import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

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
        }), () => history.push('/sign-in'));
      });
  }

  render() {
    const {
      err,
      loading,
    } = this.state;
    const { children } = this.props;

    return (
      err || loading
        ? (
          <Segment
            loading={loading}
          >
            {err}
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
