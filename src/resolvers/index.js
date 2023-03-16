import { GraphQLDateTime } from 'graphql-iso-date';
import urlShortnerResolver from './urlShortner';


const customScalarResolver = {
  Date: GraphQLDateTime,
};

// eslint-disable-next-line max-len
export default [
    customScalarResolver,
    urlShortnerResolver
];
