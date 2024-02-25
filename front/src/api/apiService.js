import axios from 'axios';
import { toast } from 'react-toastify';

import { store } from 'store';
import i18n from 'translations';

const apiBaseUrl = process.env.REACT_APP_API_URL;
const token = store.getState().user.token;
const messages = i18n.options.resources;

/**
 * A object to gather all API request methods, to be called to make requests to API
 */
export const apiService = {
  /* A method to construct an API object with its base url and base headers */
  setApi: () => {
    return axios.create({
      baseURL: `${apiBaseUrl}/api/v1`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  /* A method to add a token to the request */
  addToken: (request) => {
    if (!token) return;
    request.headers = {
      ...request.headers,
      Authorization: token
    };
  },
  /* A method to handle request errors and call the proper error toast */
  handleError: (error) => {
    const errorStatus = error?.response?.status ?? error?.message.replace(' ', '_').toLowerCase();
    apiService.displayToast(errorStatus);
    return Promise.reject(error);
  },
  /* A method to dispaly the proper error toast */
  displayToast: (errorStatus) => {
    if (messages && errorStatus !== undefined && errorStatus !== 'canceled') {
      const message = i18n.exists(`requestErrors.${errorStatus}`)
        ? i18n.getResource(i18n.resolvedLanguage, 'translation', `requestErrors.${errorStatus}`)
        : i18n.getResource(i18n.resolvedLanguage, 'translation', 'requestErrors.default');

      toast.error(message);
    }
  }
};
