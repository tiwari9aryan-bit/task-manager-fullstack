const JWT_SECRET = process.env.JWT_SECRET;

if (process.env.NODE_ENV === 'production' && !JWT_SECRET) {
  throw new Error('JWT_SECRET must be configured in production');
}

module.exports = {
  JWT_SECRET: JWT_SECRET || 'dev_secret',
  JWT_EXPIRES_IN: '7d',
};
