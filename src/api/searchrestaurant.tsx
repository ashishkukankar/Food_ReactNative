import axios from 'axios';

export default axios.create({
  baseURL: 'https://developers.zomato.com/api/v2.1/',
  headers: {
    'user-key': 'b4f1b55a1cd1b392ee95d323a068912d',
  },
});
