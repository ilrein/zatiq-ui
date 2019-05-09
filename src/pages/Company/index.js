import { connect } from 'react-redux'

import Company from './Company';

export default connect(
  ({ company }) => ({ company }),
)(Company);
