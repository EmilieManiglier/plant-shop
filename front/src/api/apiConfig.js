import { apiService } from 'api/apiService';
import { deepCaseConverter } from 'helpers';

/* Construct api object */
export const apiConfig = apiService.setApi();

/* Add an interceptor to convert request to snake_case */
apiConfig.interceptors.request.use((request) => {
  request.data = deepCaseConverter(request.data, false);
  apiService.addToken(request);
  return request;
});

/* Add an interceptor to convert response to CamelCase */
apiConfig.interceptors.response.use(
  (response) => ({ ...response, data: deepCaseConverter(response.data, true) }),
  (error) => apiService.handleError(error)
);
