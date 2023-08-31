export const handleError = (status, message) => {
  const error = new Error(); // Create a new Error object
  error.status = status; // Set the HTTP status code for the error
  error.message = message; // Set the error message
  return error;
};
