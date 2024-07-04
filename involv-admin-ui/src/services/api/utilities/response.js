export function handleResponse(response) {
    if (response.results) {
      return response.results;
    }
  
    if (response.data) {
      return response.data;
    }
  
    return response;
  }
  
  export function handleError(error) {
    if (error.response) {
      return error.response;
    }
    return error;
  }