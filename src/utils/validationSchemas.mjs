export const postValidationSchema = {
  userName: {
    notEmpty: {
      errorMessage: "Must not be empty!",
    },
    isString: {
      errorMessage: "Must be a String data type!",
    },
    isLength: {
      options: {
        min: 3,
        max: 32,
      },
      errorMessage: "Must be at least 6 to 32 characters!",
    },
  },
  displayName: {
    notEmpty: true,
    isString: true,
  },
};
