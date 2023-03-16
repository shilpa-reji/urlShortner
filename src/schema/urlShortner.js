import { gql } from "apollo-server-express";

export default gql`
  extend type Query{
    getUrl(shortUrl: String): Url
  }
  extend type Mutation {
    createUrl(originalUrl: String!): Url
  }

  type Url {
    id: Int
    originalUrl: String
    shortUrl: String
  }

`;
