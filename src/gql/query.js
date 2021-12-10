import { gql } from '@apollo/client';

export const READ_PROFILE = gql`
{
    profile: readProfile {
        id,
        sid,
        firstname,
        lastname,        
        birthdate,
        email,
        emailCheck,               
        mobile,
        mobileCheck        
    }
  }
`;
