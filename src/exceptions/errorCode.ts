export interface CustomError {
  CODE: string;
  MESSAGE: string;
}

export const ERROR_CODES = {
  DUPLICATED: 11000,
};

export const ErrorCodes: { [key: string]: CustomError } = {
  UNAUTHORIZED: {
    CODE: 'UNAUTHORIZED',
    MESSAGE: 'User is not allowed to perform this operation',
  },
  VALIDATION_ERROR: {
    CODE: 'VALIDATION_ERROR',
    MESSAGE: 'Validation failed error',
  },
  USER_WITH_ID_NOT_FOUND: {
    CODE: 'USER_WITH_ID_NOT_FOUND',
    MESSAGE: 'User with given id not found',
  },
  SERVICE_ERROR: {
    CODE: 'SERVICE_ERROR',
    MESSAGE: 'Obtained error from external service. Please check the logs.',
  },
  CUSTOMER_DATA_NOT_FOUND: {
    CODE: 'CUSTOMER_DATA_NOT_FOUND',
    MESSAGE: 'Customer data does not exist',
  },
  TOKEN_EXPIRED: {
    CODE: 'TOKEN_EXPIRED',
    MESSAGE: 'The incoming token has expired',
  },
  NOT_FOUND: {
    CODE: 'NOT_FOUND',
    MESSAGE: 'Not found',
  },
  BAD_REQUEST: {
    CODE: 'BAD_REQUEST',
    MESSAGE: 'Bad request',
  },
};
