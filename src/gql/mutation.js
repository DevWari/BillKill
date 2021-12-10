import { gql } from '@apollo/client';

// Define mutation
export const CREATE_ACCESS_TOKEN = gql`  
  mutation {access: createAccessTest(role: user) {
    token,
    refreshToken
  }}
`;

export const UPDATE_PROFILE_EMAIL = gql`  
  mutation ($email: String!) {
    profile: updateProfileEmail (email: $email) {
        firstname,
        lastname,
        email,
        emailCheck,
        mobile,
        mobileCheck
    }
  }}
`;

