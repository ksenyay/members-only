const userValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 3,
        max: 15,
      },
      errorMessage:
        "Username must be at least 3 characters with a max of 15 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string!",
    },
  },
  password: {
    notEmpty: true,
    isLength: {
      options: {
        min: 6,
        max: 64,
      },
      errorMessage:
        "Password must be at least 6 characters with a max of 64 characters",
    },
  },
};

module.exports = userValidationSchema;
