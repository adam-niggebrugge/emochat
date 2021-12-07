import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      name
      email
      pic
      isAdmin
    }
  }
`;
