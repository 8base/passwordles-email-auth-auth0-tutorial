/**
 * This file was generated using 8base CLI.
 *
 * To learn more about writing custom GraphQL resolver functions, visit
 * the 8base documentation at:
 *
 * https://docs.8base.com/8base-console/custom-functions/resolvers
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    passwordlessAuthStart:
 *      ...
 *
 * Data that is sent to this function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * There are two ways to invoke this function locally:
 *
 *  (1) Explicit file mock file path using '-p' flag:
 *    8base invoke-local passwordlessAuthStart -p src/resolvers/passwordlessAuthStart/mocks/request.json
 *
 *  (2) Default mock file location using -m flag:
 *    8base invoke-local passwordlessAuthStart -m request
 *
 *  Add new mocks to this function to test different input arguments. Mocks can easily be generated
 *  the following generator command:
 *    8base generate mock passwordlessAuthStart -m [MOCK_FILE_NAME]
 */
import auth0 from '../../utils/auth0'

/* Send a password reset email to the user */
export default async event => {
  /* Unpack event data */
  const { email, type = 'code' } = event.data

  try {
    /* Initiate the authentication flow by sending OTP email */
    await auth0.otpStart(email, type)
  } catch (error) {
    /* Console error to logs */
    console.error(error)

    /* Return failure and error */
    return {
      data: {
        success: false
      },
      errors: [error]
    }
  }

  /* Return success result */
  return {
    data: {
      success: true
    }
  }
}
