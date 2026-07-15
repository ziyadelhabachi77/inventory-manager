const formatValidationError = (err) => {
  return Object.keys(err.errors).reduce((acc, key) => {
    acc[key] = err.errors[key].message;
    return acc;
  }, {});
};

module.exports = { formatValidationError };
