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
  API_COMPANY,
  CAPTURE_COMPANY,
} from '../../constants';

const CompanyContainer = ({
  children,
  userReducer,
  captureCompany,
  // location,
  company,
}) => {
  const { user, cognitoUser } = userReducer;
  const { companyId } = user;
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);
  /**
   * Check for company
   * @param { sub } String
   */
  const getCompany = async () => {
    if (!isNil(companyId) && isNil(company._id)) {
      try {
        const get = await fetch(`${API_COMPANY}/${companyId}`, {
          headers: {
            'Content-Type': 'application/json',
            'jwt-token': jwtToken,
          },
        });

        const result = await get.json();
        captureCompany(result);
      } catch (error) {
        console.log(error); // eslint-disable-line
      }
    } else {
      captureCompany({ _id: null });
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <>
      {children}
    </>
  );
};

CompanyContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape()),
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  userReducer: PropTypes.shape().isRequired,
  captureCompany: PropTypes.func.isRequired,
  // location: PropTypes.shape().isRequired,
  company: PropTypes.shape().isRequired,
};

const mapDispatchToProps = dispatch => ({
  captureCompany: payload => dispatch({
    type: CAPTURE_COMPANY,
    payload,
  }),
});

export default connect(
  ({ userReducer, company }) => ({ userReducer, company }),
  mapDispatchToProps,
)(withRouter(CompanyContainer));
