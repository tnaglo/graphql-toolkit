import { loadTypedefsUsingLoaders, LoadTypedefsOptions, UnnormalizedTypeDefPointer } from './load-typedefs';
import { buildASTSchema, GraphQLSchema, BuildSchemaOptions } from 'graphql';
import { OPERATION_KINDS } from './documents';
import { mergeTypeDefs } from '@graphql-toolkit/schema-merging';
import { Loader } from '@graphql-toolkit/common';

export type LoadSchemaOptions = BuildSchemaOptions & LoadTypedefsOptions;

export async function loadSchemaUsingLoaders(loaders: Loader[], schemaPointers: UnnormalizedTypeDefPointer | UnnormalizedTypeDefPointer[], options?: LoadSchemaOptions, cwd = process.cwd()): Promise<GraphQLSchema> {
  const types = await loadTypedefsUsingLoaders(loaders, schemaPointers, options, OPERATION_KINDS, cwd);

  return buildASTSchema(mergeTypeDefs(types.map(m => m.document)), options);
}
