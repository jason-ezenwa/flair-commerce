// Tests that the method returns all products when no filter is applied
it('test_returns_all_products', async () => {
  const request = { query: {} };
  const response = {
    status(statusCode) {
      assert.strictEqual(statusCode, 200);
      return this;
    },
    send(data) {
      assert.strictEqual(data.length, 3);
      assert.strictEqual(data[0].name, 'product1');
      assert.strictEqual(data[1].name, 'product2');
      assert.strictEqual(data[2].name, 'product3');
    },
  };
  await ProductsController.getAllProducts(request, response);
});

// Tests that the method returns products filtered by category when category query parameter is provided
it('test_returns_filtered_products', async () => {
  const request = { query: { categories: 'category1' } };
  const response = {
    status(statusCode) {
      assert.strictEqual(statusCode, 200);
      return this;
    },
    send(data) {
      assert.strictEqual(data.length, 2);
      assert.strictEqual(data[0].name, 'product1');
      assert.strictEqual(data[1].name, 'product3');
    },
  };
  await ProductsController.getAllProducts(request, response);
});

// Tests that the method returns an empty array when no products are found
it('test_returns_empty_array', async () => {
  const request = { query: { categories: 'category4' } };
  const response = {
    status(statusCode) {
      assert.strictEqual(statusCode, 200);
      return this;
    },
    send(data) {
      assert.strictEqual(data.length, 0);
    },
  };
  await ProductsController.getAllProducts(request, response);
});

// Tests that the method returns a 500 error when there is a server error
it('test_returns_500_error', async () => {
  const request = { query: {} };
  const response = {
    status(statusCode) {
      assert.strictEqual(statusCode, 500);
      return this;
    },
    send(data) {
      assert.strictEqual(data.error.includes('Server error'), true);
    },
  };
  await ProductsController.getAllProducts(request, response);
});

// Tests that the method handles multiple categories in the category query parameter
it('test_handles_multiple_categories', async () => {
  const request = { query: { categories: 'category1,category2' } };
  const response = {
    status(statusCode) {
      assert.strictEqual(statusCode, 200);
      return this;
    },
    send(data) {
      assert.strictEqual(data.length, 3);
      assert.strictEqual(data[0].name, 'product1');
      assert.strictEqual(data[1].name, 'product2');
      assert.strictEqual(data[2].name, 'product3');
    },
  };
  await ProductsController.getAllProducts(request, response);
});

// Tests that the method returns a 404 error when category in query parameter does not exist
it('test_returns_404_error', async () => {
  const request = { query: { categories: 'category5' } };
  const response = {
    status(statusCode) {
      assert.strictEqual(statusCode, 404);
      return this;
    },
    json(data) {
      assert.strictEqual(data.error.includes('not found'), true);
    },
  };
  await ProductsController.getAllProducts(request, response);
});

// Tests that getProduct returns a product with valid id
it('test_get_product_by_valid_id', async () => {
  const request = { params: { id: 'valid_id' } };
  const response = {
    status(statusCode) {
      assert.strictEqual(statusCode, 200);
      return this;
    },
    send(product) {
      assert.strictEqual(product.id, 'valid_id');
    },
  };
  await ProductsController.getProduct(request, response);
});

// Tests that getProduct returns a product with populated category
it('test_get_product_with_populated_category', async () => {
  const request = { params: { id: 'valid_id' } };
  const response = {
    status(statusCode) {
      assert.strictEqual(statusCode, 200);
      return this;
    },
    send(product) {
      assert.strictEqual(product.category.name, 'valid_category_name');
    },
  };
  await ProductsController.getProduct(request, response);
});

// Tests that getProduct returns an error message when given an invalid id
it('test_get_product_by_invalid_id', async () => {
  const request = { params: { id: 'invalid_id' } };
  const response = {
    status(statusCode) {
      assert.strictEqual(statusCode, 404);
      return this;
    },
    json(error) {
      assert.strictEqual(error.error, 'Product with id invalid_id not found. Please check the ID and try again.');
    },
  };
  await ProductsController.getProduct(request, response);
});

// Tests that getProduct returns an error message when given a non-existent category
it('test_get_product_with_non_existent_category', async () => {
  const request = { params: { id: 'valid_id' } };
  const response = {
    status(statusCode) {
      assert.strictEqual(statusCode, 404);
      return this;
    },
    json(error) {
      assert.strictEqual(error.error, 'Product with id valid_id not found. Please check the ID and try again.');
    },
  };
  await ProductsController.getProduct(request, response);
});

// Tests that getProduct returns an error message when given an invalid category id
it('test_get_product_with_invalid_category_id', async () => {
  const request = { params: { id: 'valid_id' } };
  const response = {
    status(statusCode) {
      assert.strictEqual(statusCode, 404);
      return this;
    },
    json(error) {
      assert.strictEqual(error.error, 'Product with id valid_id not found. Please check the ID and try again.');
    },
  };
  await ProductsController.getProduct(request, response);
});

// Tests that getProduct returns an error message when no id is provided
it('test_get_product_with_no_id_provided', async () => {
  const request = { params: {} };
  const response = {
    status(statusCode) {
      assert.strictEqual(statusCode, 404);
      return this;
    },
    json(error) {
      assert.strictEqual(error.error, 'Product with id undefined not found. Please check the ID and try again.');
    },
  };
  await ProductsController.getProduct(request, response);
});

// Tests that all featured products are returned when no count parameter is provided
it('test_no_count_param', async () => {
  const request = { query: {} };
  const response = {
    status(statusCode) {
      expect(statusCode).to.equal(200);
      return this;
    },
    send(data) {
      expect(data).to.be.an('array');
      expect(data.length).to.equal(2);
      expect(data[0]).to.have.property('isFeatured', true);
      expect(data[1]).to.have.property('isFeatured', true);
    },
  };
  await ProductsController.getAllFeaturedProducts(request, response);
});

// Tests that a list of featured products with a count limit is returned when count parameter is provided
it('test_count_param', async () => {
  const request = { params: { count: 1 } };
  const response = {
    status(statusCode) {
      expect(statusCode).to.equal(200);
      return this;
    },
    send(data) {
      expect(data).to.be.an('array');
      expect(data.length).to.equal(1);
      expect(data[0]).to.have.property('isFeatured', true);
    },
  };
  await ProductsController.getAllFeaturedProducts(request, response);
});

// Tests that an empty list is returned when there are no featured products
it('test_empty_list_no_featured_products', async () => {
  const request = { query: {} };
  const response = {
    status(statusCode) {
      expect(statusCode).to.equal(200);
      return this;
    },
    send(data) {
      expect(data).to.be.an('array');
      expect(data.length).to.equal(0);
    },
  };
  await ProductsController.getAllFeaturedProducts(request, response);
});

// Tests that an empty list is returned when count parameter is 0
it('test_empty_list_count_param_zero', async () => {
  const request = { params: { count: 0 } };
  const response = {
    status(statusCode) {
      expect(statusCode).to.equal(200);
      return this;
    },
    send(data) {
      expect(data).to.be.an('array');
      expect(data.length).to.equal(0);
    },
  };
  await ProductsController.getAllFeaturedProducts(request, response);
});

// Tests that an error response is returned when there is a server error
it('test_error_response_server_error', async () => {
  const request = { query: {} };
  const response = {
    status(statusCode) {
      expect(statusCode).to.equal(500);
      return this;
    },
    send(data) {
      expect(data).to.have.property('error');
    },
  };
  await ProductsController.getAllFeaturedProducts(request, response);
});

// Tests that an error response is returned when count parameter is not a number, negative, greater than the number of featured products, or not an integer
it('test_error_response_invalid_count_param', async () => {
  const request = { params: { count: 'invalid' } };
  const response = {
    status(statusCode) {
      expect(statusCode).to.equal(500);
      return this;
    },
    send(data) {
      expect(data).to.have.property('error');
    },
  };
  await ProductsController.getAllFeaturedProducts(request, response);
});
