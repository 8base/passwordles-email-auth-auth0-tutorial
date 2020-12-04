import gql from 'graphql-tag'

/**
 * Create a user record in 8base using a valid ID token
 */
export const USER_SIGN_UP_WITH_TOKEN = gql`
  mutation($authProfileId: ID!, $email: String!) {
    userSignUpWithToken(
      authProfileId: $authProfileId
      user: { email: $email }
    ) {
      id
    }
  }
`
/**
 * Query a user using their email address.
 */
export const FIND_USER_BY_EMAIL = gql`
  query users($email: String) {
    usersList(filter: { email: { equals: $email } }) {
      count
    }
  }
`
