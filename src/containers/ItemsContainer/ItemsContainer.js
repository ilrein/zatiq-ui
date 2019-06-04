import React, {
  useState,
  useEffect,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import isNil from 'ramda/src/isNil';
import { withRouter } from 'react-router-dom';

import {
  API_ITEMS,
  CAPTURE_ITEMS,
} from '../../constants';

const MenusContainer = ({
  children,
  userReducer,
  captureItems,
  // location,
}) => {
  const { user, cognitoUser } = userReducer;
  const { companyId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  /**
   * Check for company
   * @param { sub } String
   */
  const getItemsByCompanyId = async () => {
    if (!isNil(companyId)) {
      try {
        const get = await fetch(`${API_ITEMS}?companyId=${companyId}&limit=50`, {
          headers: {
            'Content-Type': 'application/json',
            'jwt-token': jwtToken,
          },
        });

        const result = await get.json();
        captureItems(result);
      } catch (error) {
        console.log(error); // eslint-disable-line
      }
    }
  };

  useEffect(() => {
    getItemsByCompanyId();
  }, [companyId]);

  return (
    <>
      {children}
    </>
  );
};

MenusContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape()),
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  userReducer: PropTypes.shape().isRequired,
  captureItems: PropTypes.func.isRequired,
  // location: PropTypes.shape().isRequired,
  // company: PropTypes.shape().isRequired,
};

const mapDispatchToProps = dispatch => ({
  captureItems: payload => dispatch({
    type: CAPTURE_ITEMS,
    payload,
  }),
});

export default connect(
  ({ userReducer, company }) => ({ userReducer, company }),
  mapDispatchToProps,
)(withRouter(MenusContainer));
