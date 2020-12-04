/* Import your preferred HTTP client */
import axios from 'axios'

/* Access the environment variables we stored in 8base */
const domain = process.env.AUTH0_DOMAIN
const client_id = process.env.AUTH0_CLIENT_ID
const client_secret = process.env.AUTH0_CLIENT_SECRET

/* Export default module with auth methods */
export default {
  /**
   * Initiate the OTP flow by sending user an email or link
   * with a one-time passcode.
   *
   * Endpoint Docs: https://auth0.com/docs/connections/passwordless/reference/relevant-api-endpoints#post-passwordless-start
   */
  otpStart: async (email, send = 'code') => {
    return axios.post(`https://${domain}/passwordless/start`, {
      connection: 'email',
      client_secret,
      client_id,
      email,
      send
    })
  },
  /**
   * Verify an issued token with the username (email)
   * and recieve back the auth result.
   *
   * Endpoint Docs: https://auth0.com/docs/connections/passwordless/reference/relevant-api-endpoints#post-oauth-token
   */
  tokenVerify: async (username, otp) => {
    return axios.post(`https://${domain}/oauth/token`, {
      grant_type: 'http://auth0.com/oauth/grant-type/passwordless/otp',
      realm: 'email',
      client_secret,
      client_id,
      username,
      otp
    })
  }
}
