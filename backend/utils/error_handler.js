function errorHandler(error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    return response.status(401).json({ error: 'unauthorised access' });
  }
  if (error.name === 'ValidationError') {
    return response.status(404).json({ error });
  }
}

export default errorHandler;
