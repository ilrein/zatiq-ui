import { Auth } from 'aws-amplify';

const refreshSession = () => Auth.currentSession()
  .then(data => data)
  .catch(err => err);  

export default refreshSession;
