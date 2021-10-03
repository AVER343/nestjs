export const JWT_COOKIE_KEY = 'JWT';
export const JWT_COOKIE_SECRET = 'JWT_SECRET';
export const QUEUES = {
    SEND_EMAIL: "SEND_EMAIL"
  } as const;
 type QUEUES = typeof QUEUES[keyof typeof QUEUES];
export const OTP_LENGTH = 6;
