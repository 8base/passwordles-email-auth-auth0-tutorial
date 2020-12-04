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
 *    passwordlessAuthLogin:
 *      ...
 *
 * Data that is sent to this function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * There are two ways to invoke this function locally:
 *
 *  (1) Explicit file mock file path using '-p' flag:
 *    8base invoke-local passwordlessAuthLogin -p src/resolvers/passwordlessAuthLogin/mocks/request.json
 *
 *  (2) Default mock file location using -m flag:
 *    8base invoke-local passwordlessAuthLogin -m request
 *
 *  Add new mocks to this function to test different input arguments. Mocks can easily be generated
 *  the following generator command:
 *    8base generate mock passwordlessAuthLogin -m [MOCK_FILE_NAME]
 */
import auth0 from '../../utils/auth0'
import {
  USER_SIGN_UP_WITH_TOKEN,
  FIND_USER_BY_EMAIL
} from '../../utils/graphql'

/* Declare static constants */
const noPermissions = { checkPermissions: false }
const authProfileId = process.env.AUTH_PROFILE_ID

export default async (event, ctx) => {
  /* Unpack event data */
  const { email, code } = event.data

  /* Set default response values */
  let success = true
  let auth = {}

  try {
    /* Validate email and code */
    ;({ data: auth } = await auth0.tokenVerify(email, code))

    /* Find user record stored in 8base by email */
    let {
      usersList: { count }
    } = await ctx.api.gqlRequest(FIND_USER_BY_EMAIL, { email }, noPermissions)

    /**
     * If the user doesn't exist, create the user
     * using the issued token, email, and authProfileId.
     */
    if (count) {
      await ctx.api.gqlRequest(
        USER_SIGN_UP_WITH_TOKEN,
        {
          authProfileId,
          email
        },
        {
          headers: {
            authorization: `Bearer ${auth.id_token}`
          }
        }
      )
    }
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

  /* Return success and auth result */
  return {
    data: {
      success,
      auth
    }
  }
}
