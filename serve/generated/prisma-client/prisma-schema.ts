// Code generated by Prisma (prisma@1.32.2). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AdminUser {
  id: Int!
  name: String
  pwd: String
  createdAt: DateTime!
  lastLoginAt: DateTime!
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
}

type AdminUserConnection {
  pageInfo: PageInfo!
  edges: [AdminUserEdge]!
  aggregate: AggregateAdminUser!
}

input AdminUserCreateInput {
  id: Int
  name: String
  pwd: String
  posts: PostCreateManyWithoutAuthorInput
}

input AdminUserCreateOneWithoutPostsInput {
  create: AdminUserCreateWithoutPostsInput
  connect: AdminUserWhereUniqueInput
}

input AdminUserCreateWithoutPostsInput {
  id: Int
  name: String
  pwd: String
}

type AdminUserEdge {
  node: AdminUser!
  cursor: String!
}

enum AdminUserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  pwd_ASC
  pwd_DESC
  createdAt_ASC
  createdAt_DESC
  lastLoginAt_ASC
  lastLoginAt_DESC
}

type AdminUserPreviousValues {
  id: Int!
  name: String
  pwd: String
  createdAt: DateTime!
  lastLoginAt: DateTime!
}

type AdminUserSubscriptionPayload {
  mutation: MutationType!
  node: AdminUser
  updatedFields: [String!]
  previousValues: AdminUserPreviousValues
}

input AdminUserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AdminUserWhereInput
  AND: [AdminUserSubscriptionWhereInput!]
  OR: [AdminUserSubscriptionWhereInput!]
  NOT: [AdminUserSubscriptionWhereInput!]
}

input AdminUserUpdateInput {
  name: String
  pwd: String
  posts: PostUpdateManyWithoutAuthorInput
}

input AdminUserUpdateManyMutationInput {
  name: String
  pwd: String
}

input AdminUserUpdateOneRequiredWithoutPostsInput {
  create: AdminUserCreateWithoutPostsInput
  update: AdminUserUpdateWithoutPostsDataInput
  upsert: AdminUserUpsertWithoutPostsInput
  connect: AdminUserWhereUniqueInput
}

input AdminUserUpdateWithoutPostsDataInput {
  name: String
  pwd: String
}

input AdminUserUpsertWithoutPostsInput {
  update: AdminUserUpdateWithoutPostsDataInput!
  create: AdminUserCreateWithoutPostsInput!
}

input AdminUserWhereInput {
  id: Int
  id_not: Int
  id_in: [Int!]
  id_not_in: [Int!]
  id_lt: Int
  id_lte: Int
  id_gt: Int
  id_gte: Int
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  pwd: String
  pwd_not: String
  pwd_in: [String!]
  pwd_not_in: [String!]
  pwd_lt: String
  pwd_lte: String
  pwd_gt: String
  pwd_gte: String
  pwd_contains: String
  pwd_not_contains: String
  pwd_starts_with: String
  pwd_not_starts_with: String
  pwd_ends_with: String
  pwd_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  lastLoginAt: DateTime
  lastLoginAt_not: DateTime
  lastLoginAt_in: [DateTime!]
  lastLoginAt_not_in: [DateTime!]
  lastLoginAt_lt: DateTime
  lastLoginAt_lte: DateTime
  lastLoginAt_gt: DateTime
  lastLoginAt_gte: DateTime
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
  AND: [AdminUserWhereInput!]
  OR: [AdminUserWhereInput!]
  NOT: [AdminUserWhereInput!]
}

input AdminUserWhereUniqueInput {
  id: Int
}

type AggregateAdminUser {
  count: Int!
}

type AggregatePost {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createAdminUser(data: AdminUserCreateInput!): AdminUser!
  updateAdminUser(data: AdminUserUpdateInput!, where: AdminUserWhereUniqueInput!): AdminUser
  updateManyAdminUsers(data: AdminUserUpdateManyMutationInput!, where: AdminUserWhereInput): BatchPayload!
  upsertAdminUser(where: AdminUserWhereUniqueInput!, create: AdminUserCreateInput!, update: AdminUserUpdateInput!): AdminUser!
  deleteAdminUser(where: AdminUserWhereUniqueInput!): AdminUser
  deleteManyAdminUsers(where: AdminUserWhereInput): BatchPayload!
  createPost(data: PostCreateInput!): Post!
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateManyPosts(data: PostUpdateManyMutationInput!, where: PostWhereInput): BatchPayload!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  deletePost(where: PostWhereUniqueInput!): Post
  deleteManyPosts(where: PostWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Post {
  id: ID!
  createdAt: DateTime!
  title: String!
  published: Boolean!
  author: AdminUser!
}

type PostConnection {
  pageInfo: PageInfo!
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  id: ID
  title: String!
  published: Boolean
  author: AdminUserCreateOneWithoutPostsInput!
}

input PostCreateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateWithoutAuthorInput {
  id: ID
  title: String!
  published: Boolean
}

type PostEdge {
  node: Post!
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  title_ASC
  title_DESC
  published_ASC
  published_DESC
}

type PostPreviousValues {
  id: ID!
  createdAt: DateTime!
  title: String!
  published: Boolean!
}

input PostScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  published: Boolean
  published_not: Boolean
  AND: [PostScalarWhereInput!]
  OR: [PostScalarWhereInput!]
  NOT: [PostScalarWhereInput!]
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PostWhereInput
  AND: [PostSubscriptionWhereInput!]
  OR: [PostSubscriptionWhereInput!]
  NOT: [PostSubscriptionWhereInput!]
}

input PostUpdateInput {
  title: String
  published: Boolean
  author: AdminUserUpdateOneRequiredWithoutPostsInput
}

input PostUpdateManyDataInput {
  title: String
  published: Boolean
}

input PostUpdateManyMutationInput {
  title: String
  published: Boolean
}

input PostUpdateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  delete: [PostWhereUniqueInput!]
  connect: [PostWhereUniqueInput!]
  set: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutAuthorInput!]
  deleteMany: [PostScalarWhereInput!]
  updateMany: [PostUpdateManyWithWhereNestedInput!]
}

input PostUpdateManyWithWhereNestedInput {
  where: PostScalarWhereInput!
  data: PostUpdateManyDataInput!
}

input PostUpdateWithoutAuthorDataInput {
  title: String
  published: Boolean
}

input PostUpdateWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutAuthorDataInput!
}

input PostUpsertWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutAuthorDataInput!
  create: PostCreateWithoutAuthorInput!
}

input PostWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  published: Boolean
  published_not: Boolean
  author: AdminUserWhereInput
  AND: [PostWhereInput!]
  OR: [PostWhereInput!]
  NOT: [PostWhereInput!]
}

input PostWhereUniqueInput {
  id: ID
}

type Query {
  adminUser(where: AdminUserWhereUniqueInput!): AdminUser
  adminUsers(where: AdminUserWhereInput, orderBy: AdminUserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AdminUser]!
  adminUsersConnection(where: AdminUserWhereInput, orderBy: AdminUserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AdminUserConnection!
  post(where: PostWhereUniqueInput!): Post
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  node(id: ID!): Node
}

type Subscription {
  adminUser(where: AdminUserSubscriptionWhereInput): AdminUserSubscriptionPayload
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
}
`