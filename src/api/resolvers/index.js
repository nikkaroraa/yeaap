const { isFunction, isObject, mapValues, merge } = require('lodash');
const { GraphQLDateTime } = require('graphql-iso-date');

const mapResolverFunctions = (resolve) => {
  if (isFunction(resolve)) {
    return (parent, args, context) => resolve({ context, parent, args });
  }
  if (isObject(resolve)) {
    return mapValues(resolve, mapResolverFunctions);
  }
  return resolve;
};

module.exports = merge(
  {
    DateTime: GraphQLDateTime
  },
  ...['hello'].map((mod) => require('./' + mod)).map(mapResolverFunctions)
);