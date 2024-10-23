// BCRYPT
export const BCRYPT_SALT_ROUNDS = 10;

// PAGINATION
export const LIMIT_RECORDS = 5;
export const OFFSET_RECORDS = 0;

// JWT MESSAGES
export const INVALID_USER_OR_MISSING_REFRESH_TOKEN = 'Invalid refresh token';
export const REFRESH_TOKEN_DOES_NOT_MATCH = 'Invalid refresh token';
export const REFRESH_JWT_TOKEN = 'To refresh JWT token';
export const SUCCESSFUL_REFRESH_TOKEN = 'Token successfully refreshed.';

// DECORATOR KEYS
export const USER_ROLES_KEY = 'userRoles';
export const IS_PUBLIC_KEY = 'IS_PUBLIC';

// CORS
export const CORS_POLICY = 'CORS policy: This origin is not allowed.';

// MESSAGES FOR RESPONSES
// 200 - 299
export const SUCCESSFUL_CREATION = 'Resource successfully created.';
export const SUCCESSFUL_SEED = 'Action to register users using a seed.';
export const SUCCESSFUL_DELETION = 'Resource(s) successfully deleted.';
export const SUCCESSFUL_UPDATE = 'Resource successfully updated.';
export const SUCCESSFUL_FETCH = 'Data fetched successfully.';
export const SUCCESSFUL_MARKED_DELETED = 'User marked as deleted.';
export const SUCCESSFUL_ALL_MARKED_DELETED = 'All users marked as deleted.';

// 400 - 499
export const UNAUTHORIZED_ACCESS = 'Unauthorized access.';
export const FORBIDDEN_RESOURCE =
  'You do not have permission to access this resource.';
export const BAD_REQUEST = 'Bad request. Please check your input.';
export const NOT_FOUND = 'Resource not found.';
export const CONFLICT_ERROR =
  'There is a conflict with the current state of the resource.';
export const RESOURCE_NAME_ALREADY_EXISTS =
  'A resource with the same name already exists. Please choose a different name.';

// 500 - 599
export const INTERNAL_SERVER_ERROR =
  'An internal server error occurred. Please try again later.';

// VALIDATE USER
export const USER_NOT_FOUND = 'User not found';
export const INVALID_CREDENTIALS =
  'Invalid credentials. Email or password is incorrect';

// LOGIN AND REGISTER
export const LOGIN_USER = 'Login a user.';
export const PASSWORD_REQUIRED = 'Please provide the password.';
export const USER_LOGGED = 'User successfully logged in.';
export const USER_LOGOUT = 'To log out the user.';
export const USER_LOGGED_OUT = 'User has been logged out successfully.';
export const USER_REGISTERED = 'User registered successfully.';
export const USER_NOT_REGISTERED = 'User is not registered in the company';
export const USER_ALREADY_EXISTS = 'User already exists with this email.';

// ACTIONS
export const CREATE_RECORD = 'Action to create a new record.';
export const READ_ALL_RECORDS = 'Action to view all records.';
export const READ_ALL_RECORDS_PAGINATED = 'Action to view all records pages.';
export const READ_RECORD = 'Action to view one record.';
export const UPDATE_RECORD = 'Action to update a record.';
export const REMOVE_RECORD = 'Action to remove a record.';
export const REMOVE_ALL_RECORDS = 'Action to remove all records.';

// 400 - 499
// export const MISSING_FIELDS = 'One or more required fields are missing.';
// export const TOKEN_EXPIRED = 'Your token has expired, please login again.';
// 500 - 599
export const SERVICE_UNAVAILABLE =
  'Service temporarily unavailable. Please try again later.';
// export const DATABASE_CONNECTION_ERROR = 'Error connecting to the database.';
export const UNEXPECTED_ERROR =
  'An unexpected error occurred. Please contact support.';
export const RESOURCE_CREATION_FAILED =
  'Failed to create resource. Please try again.';
export const RESOURCE_DELETION_FAILED =
  'Failed to delete resource. Please try again.';

// export const REFRESH_TOKEN_EXPIRED = 'Your refresh token has expired.';
// export const INVALID_REFRESH_TOKEN = 'Invalid refresh token provided.';
// export const PASSWORD_RESET_SUCCESS = 'Password reset successfully.';
// export const EMAIL_VERIFICATION_SUCCESS = 'Email verified successfully.';
