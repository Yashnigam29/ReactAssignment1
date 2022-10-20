import { post, get } from '../authnGateway/authnGateway_helpers';
import { API } from './apiConstants';

const authnGateway = {

  userLogin: data => {
    return post(API.CHECK_LOGIN, data);
  },
  getCommentData: () => {
    return get(API.CHECK_LOGIN);
  },
};

export default authnGateway