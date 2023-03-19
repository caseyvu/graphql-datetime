import {
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
  Kind,
} from 'graphql';


const dateTimeConfig: GraphQLScalarTypeConfig<Date, string> = {
  name: 'DateTime',
  description: 'A date-time string at UTC, such as 2007-12-03T10:15:30Z, ' +
               'compliant with the `date-time` format outlined in section 5.6 of ' +
               'the RFC 3339 profile of the ISO 8601 standard for representation ' +
               'of dates and times using the Gregorian calendar.',
  serialize (value) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    throw new TypeError('DateTime must be a Date instance')
  },
  parseValue (value) {
    if (!(typeof value === 'string')) {
      throw new TypeError(
        `DateTime cannot represent non string type ${JSON.stringify(value)}`
      )
    }
    return new Date(value);
  },
  parseLiteral (ast) {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(
        `DateTime cannot represent non string type`
      )
    }
    return new Date(ast.value);
  }
}
export const GraphQLDateTime = new GraphQLScalarType(dateTimeConfig);