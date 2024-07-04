const createResponse = (success, data = null, message = null, errors = null) => {
    return {
      success,
      data,
      message,
      errors,
    };
  };
  
  const successResponse = (data, message = null) => {
    return createResponse(true, data, message, null);
  };
  
  const errorResponse = (errors, message = null) => {
    return createResponse(false, null, message, errors);
  };
  
  module.exports = {
    successResponse,
    errorResponse,
  };
  