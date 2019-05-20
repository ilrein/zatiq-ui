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
  API_MENUS,
  CAPTURE_MENUS,
} from '../../constants';

const MenusContainer = ({
  children,
  userReducer,
  captureMenus,
  // location,
}) => {
  const { user, cognitoUser } = userReducer;
  const { companyId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  /**
   * Check for company
   * @param { sub } String
   */
  const getMenusByCompanyId = async () => {
    if (!isNil(companyId)) {
      try {
        const get = await fetch(`${API_MENUS}?companyId=${companyId}`, {
          headers: {
            'Content-Type': 'application/json',
            'jwt-token': jwtToken,
          },
        });

        const result = await get.json();
        captureMenus(result);
      } catch (error) {
        console.log(error); // eslint-disable-line
      }
    }
  };

  useEffect(() => {
    getMenusByCompanyId();
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
  captureMenus: PropTypes.func.isRequired,
  // location: PropTypes.shape().isRequired,
  // company: PropTypes.shape().isRequired,
};

const mapDispatchToProps = dispatch => ({
  captureMenus: payload => dispatch({
    type: CAPTURE_MENUS,
    payload,
  }),
});

export default connect(
  ({ userReducer, company }) => ({ userReducer, company }),
  mapDispatchToProps,
)(withRouter(MenusContainer));
