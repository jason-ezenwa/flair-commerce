// Tests that the function returns an empty array when no products match the category query parameter
it('test_returns_empty_array_when_no_products_match_category_query_parameter', async () => {
  const request = {
    query: {
      categories: 'non-existent-category',
    },
  };
  const response = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  await ProductsController.getAllProducts(request, response);
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.send).toHaveBeenCalledWith([]);
});

// Tests that a server error response is returned when an error occurs during the database query
it('test_server_error_response', async () => {
  const mockRequest = {
    query: {},
  };
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  const mockError = 'mock error';
  Product.find = jest.fn().mockRejectedValue(mockError);
  await ProductsController.getAllProducts(mockRequest, mockResponse);
  expect(mockResponse.status).toHaveBeenCalledWith(500);
  expect(mockResponse.send).toHaveBeenCalledWith({ error: `Server error, please try again.\n Details: ${mockError}` });
});

// Tests that the getAllProducts function returns a 200 status code for successful requests
it('test_should_return_200_status_code', async () => {
  const request = { query: {} };
  const response = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  await ProductsController.getAllProducts(request, response);
  expect(response.status).toHaveBeenCalledWith(200);
});

// Tests that the getAllProducts function returns a JSON array of products
it('should_return_json_array_of_products', async () => {
  const request = { query: {} };
  const response = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  await ProductsController.getAllProducts(request, response);
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.send).toHaveBeenCalled();
});

// Tests that the getAllProducts function can handle multiple categories in the category query parameter
it('test_multiple_categories', async () => {
  const request = {
    query: {
      categories: 'category1,category2,category3',
    },
  };
  const response = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  await ProductsController.getAllProducts(request, response);
  expect(response.status).toHaveBeenCalledWith(200);
});

// Tests that an error is returned when an invalid category query parameter value is provided
it('should return a 500 status code and an error message', async () => {
  const request = {
    query: {
      categories: 'invalid_category',
    },
  };
  const response = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  await ProductsController.getAllProducts(request, response);
  expect(response.status).toHaveBeenCalledWith(500);
  expect(response.send).toHaveBeenCalledWith({ error: expect.any(String) });
});

// Tests that the function returns all products when the category query parameter is missing
it('test_missing_category_query_parameter', async () => {
  const request = { query: {} };
  const response = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  await ProductsController.getAllProducts(request, response);
  expect(response.status).toHaveBeenCalledWith(200);
});

// Tests that the getAllProducts function returns all products when no query parameters are provided
it('test_returns_all_products_when_no_query_parameters_are_provided', async () => {
  const request = { query: {} };
  const response = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  await ProductsController.getAllProducts(request, response);
  expect(response.status).toHaveBeenCalledWith(200);
});

// Tests that the function returns all products that match the category query parameter
it('test_returns_products_matching_category_query_parameter', async () => {
  const request = {
    query: {
      categories: 'category1,category2',
    },
  };
  const response = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  await ProductsController.getAllProducts(request, response);
  expect(response.status).toHaveBeenCalledWith(200);
});
