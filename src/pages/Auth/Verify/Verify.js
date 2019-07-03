import React, { Component } from 'react';
import {
  Grid,
  Image,
  Form,
  Message,
  Header,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

// utils
import fadeIn from '../../../anime/fadeIn';
import PrimaryButton from '../../../components/PrimaryButton';

// images
import Logo from '../../../images/logo.png';
import WaiterService from '../../../images/waiter-service.png';

const Wrapper = styled.div`
  background-color: #eee;
  padding-top: 2rem;
  min-height: 100%;
  animation: ${fadeIn} 1s ease;
`;

class Verify extends Component {
  state = {
    loading: false,
    email: '',
    verificationCode: '',
    errorMsg: null,
  }

  setValue = ({ name, value }) => this.setState(prevState => ({
    ...prevState,
    [name]: value,
  }));

  submit = () => {
    const { history } = this.props;
    const {
      email,
      verificationCode,
    } = this.state;

    this.setState(prevState => ({
      ...prevState,
      loading: true,
    }), () => {
      Auth.confirmSignUp(
        email,
        verificationCode,
      )
        .then(() => {
          toast.success(`Verified ${email}`);
          history.push('/');
        })
        .catch(({ message }) => {
          this.setState(prevState => ({
            ...prevState,
            loading: false,
            errorMsg: message,
          }));
        });
    });
  }

  render() {
    const {
      email,
      verificationCode,
      loading,
      errorMsg,
    } = this.state;

    return (
      <Wrapper>
        <Grid>
          <Grid.Column
            computer="8"
            tablet="8"
            mobile="16"
            style={{
              padding: '4rem',
            }}
          >
            <Image
              src={Logo}
              size="small"
              style={{
                marginBottom: '3rem',
              }}
            />

            <Header as="h1">
              Thanks for signing up to be a Zatiq Partner
            </Header>

            <p>
              A confirmation code has been sent to your email.
            </p>

            {
              errorMsg
                ? (
                  <Message error>
                    {errorMsg}
                  </Message>
                )
                : null
            }

            <Form>
              <Form.Input
                label="Email"
                type="email"
                value={email}
                required
                name="email"
                onChange={(event, data) => this.setValue(data)}
                placeholder="hello@gmail.com"
              />

              <Form.Input
                label="Verification Code"
                type="text"
                value={verificationCode}
                required
                name="verificationCode"
                onChange={(event, data) => this.setValue(data)}
                placeholder="413231"
              />

              <PrimaryButton
                primary
                onClick={this.submit}
                loading={loading}
                style={{ marginBottom: '6rem' }}
              >
                Submit
              </PrimaryButton>

              <Form.Field>
                Already a member? Log in
                <Link to="/">
                  &nbsp;here
                </Link>
              </Form.Field>
            </Form>
          </Grid.Column>

          <Grid.Column
            computer="8"
            tablet="8"
            mobile="16"
          >
            <Image
              src={WaiterService}
              size="huge"
            />
          </Grid.Column>
        </Grid>
      </Wrapper>
    );
  }
}

Verify.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(Verify);
