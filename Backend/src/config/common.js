exports.response = (message, data) => {
  return {
    message: message,
    data: data,
  };
};

exports.mes = {
  INSERT_SUCCESSFULY: "Added successfully",
  INSERT_EXIST: "Data already exists",
  VIEW_SUCCESSFULY: "Get data successfully",

  LOGIN_FAIL: "Account not found",
  LOGIN_SUCCESSFULY: "Login Successful",

  GET_SUCCESSFULLY: "Get successfully",
  GET_FAIL: "Get fail",

  USER_NOT_FOUND: "User not found",

  // datas
  DATA_SUCCESS: "Successfully",
  DATA_FAILED: "Failed",
  DATA_EXIST: "Data already exists",
  DATA_NOT_FOUND: "Data not found",

  // actions
  CREATE_SUCCESS: "Added successfully",
  CREATE_FAIL: "Adding new failed",

  UPDATE_SUCCESS: "Updated successfully",
  UPDATE_FAIL: "Update failed",

  DELETE_FAILED: "Delete failed",
  DELETE_SUCCESS: "Deleted successfully",

  // login
  INCORRECT_PASS: "Incorrect password",
  ACCOUNT_NOT_FOUND: "Account not found",
  ACCOUNT_NOT_VERIFIED: "The account has not been email verified",
  ACCOUNT_BANNED: "The account has been banned",
  //sign up
  REGISTER_SUCCESSFULY:
    "Account created successfully, please verify email address to log in",
  REGISTER_FAIL_EXIST: "Account creation failed, email address already exists",
  REGISTER_FAIL_ROLE:
    "Failed to create account, There is no data on permissions",
  // verifycation email
  EMAIL_FALED: "Email verification failed",
  EMAIL_SUCCESS: "Email verification successful",
};
