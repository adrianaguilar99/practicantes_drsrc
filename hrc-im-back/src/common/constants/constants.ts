// BCRYPT
export const BCRYPT_SALT_ROUNDS = 10;

// PAGINATION
export const LIMIT_RECORDS = 5;
export const OFFSET_RECORDS = 0;

// VALIDATE USER
export const USER_NOT_FOUND = 'User not found';
export const INVALID_CREDENTIALS = 'Email or password is incorrect';

// JWT MESSAGES
export const INVALID_USER_OR_MISSING_REFRESH_TOKEN = 'Invalid refresh token';
export const REFRESH_TOKEN_DOES_NOT_MATCH = 'Invalid refresh token';

// DECORATOR KEYS
export const USER_ROLES_KEY = 'userRoles';
export const IS_PUBLIC_KEY = 'IS_PUBLIC';

// MESSAGES FOR RESPONSES
// 200 - 299
export const SUCCESSFUL_CREATION = 'Resource successfully created.';
export const SUCCESSFUL_DELETION = 'Resource(s) successfully deleted.';
export const SUCCESSFUL_UPDATE = 'Resource successfully updated.';
export const SUCCESSFUL_FETCH = 'Data fetched successfully.';
// 400 - 499
export const BAD_REQUEST = 'Bad request. Please check your input.';
export const UNAUTHORIZED_ACCESS = 'Unauthorized access. Please login.';
export const FORBIDDEN_RESOURCE =
  'You do not have permission to access this resource.';
export const NOT_FOUND = 'Resource not found.';
export const CONFLICT_ERROR =
  'There is a conflict with the current state of the resource.';
export const MISSING_FIELDS = 'One or more required fields are missing.';
export const TOKEN_EXPIRED = 'Your token has expired, please login again.';
// 500 - 599
export const INTERNAL_SERVER_ERROR =
  'An internal server error occurred. Please try again later.';
export const SERVICE_UNAVAILABLE =
  'Service temporarily unavailable. Please try again later.';
export const DATABASE_CONNECTION_ERROR = 'Error connecting to the database.';
export const UNEXPECTED_ERROR =
  'An unexpected error occurred. Please contact support.';
export const RESOURCE_CREATION_FAILED =
  'Failed to create resource. Please try again.';
export const RESOURCE_DELETION_FAILED =
  'Failed to delete resource. Please try again.';

// LOGIN AND REGISTER
export const LOGOUT_SUCCESS = 'Logout successful.';
export const PASSWORD_REQUIRED = 'Please provide the password.';
export const USER_REGISTERED = 'User registered successfully.';
export const USER_NOT_REGISTERED = 'User is not registered in the company';

//   export const INVALID_PAYLOAD = 'Invalid data provided. Please verify your input.';
// export const REFRESH_TOKEN_EXPIRED = 'Your refresh token has expired.';
// export const INVALID_REFRESH_TOKEN = 'Invalid refresh token provided.';
export const USER_ALREADY_EXISTS = 'User already exists with this email.';
// export const PASSWORD_RESET_SUCCESS = 'Password reset successfully.';
// export const EMAIL_VERIFICATION_SUCCESS = 'Email verified successfully.';
