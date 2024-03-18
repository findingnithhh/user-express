interface StatusCode {
  code: number;
  message: string;
}

const StatusCodes: { [key: string]: StatusCode } = {
  // Informational
  CONTINUE: { code: 100, message: "Continue" },
  SWITCHING_PROTOCOLS: { code: 101, message: "Switching Protocols" },

  // Success
  OK: { code: 200, message: "Successfully" },
  CREATED: { code: 201, message: "Created" },
  ACCEPTED: { code: 202, message: "Accepted" },
  NO_CONTENT: { code: 204, message: "No Content" },

  // Redirection
  MOVED_PERMANENTLY: { code: 301, message: "Moved Permanently" },
  FOUND: { code: 302, message: "Found" },
  SEE_OTHER: { code: 303, message: "See Other" },
  NOT_MODIFIED: { code: 304, message: "Not Modified" },

  // Client Error
  BAD_REQUEST: { code: 400, message: "Bad Request" },
  UNAUTHORIZED: { code: 401, message: "Unauthorized" },
  FORBIDDEN: { code: 403, message: "Forbidden" },
  NOT_FOUND: { code: 404, message: "User Not Found" },
  METHOD_NOT_ALLOWED: { code: 405, message: "Method Not Allowed" },
  REQUEST_TIMEOUT: { code: 408, message: "Request Timeout" },
  CONFLICT: { code: 409, message: "Conflict" },
  GONE: { code: 410, message: "Gone" },
  LENGTH_REQUIRED: { code: 411, message: "Length Required" },
  PRECONDITION_FAILED: { code: 412, message: "Precondition Failed" },
  PAYLOAD_TOO_LARGE: { code: 413, message: "Payload Too Large" },

  // Server Error
  INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
  NOT_IMPLEMENTED: { code: 501, message: "Not Implemented" },
  BAD_GATEWAY: { code: 502, message: "Bad Gateway" },
  SERVICE_UNAVAILABLE: { code: 503, message: "Service Unavailable" },
  GATEWAY_TIMEOUT: { code: 504, message: "Gateway Timeout" },
  HTTP_VERSION_NOT_SUPPORTED: {
    code: 505,
    message: "HTTP Version Not Supported",
  },

  // Custom Codes (You can add your custom codes and messages here)
  MY_CUSTOM_ERROR: { code: 600, message: "Custom Error Message" },
  // Add more status codes and messages as needed
};

export default StatusCodes;
