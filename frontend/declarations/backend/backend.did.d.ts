import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Post {
  'id' : string,
  'content' : string,
  'authorId' : string,
  'createdAt' : Time,
  'likes' : Array<string>,
}
export type Result = { 'ok' : boolean } |
  { 'err' : string };
export type Result_1 = { 'ok' : UserProfile } |
  { 'err' : string };
export type Result_2 = { 'ok' : Post } |
  { 'err' : string };
export type Time = bigint;
export interface UserProfile {
  'id' : string,
  'bio' : string,
  'username' : string,
}
export interface _SERVICE {
  'createPost' : ActorMethod<[string, string], Result_2>,
  'createUserProfile' : ActorMethod<[string, string, string], Result_1>,
  'getPost' : ActorMethod<[string], [] | [Post]>,
  'getPosts' : ActorMethod<[], Array<Post>>,
  'getUserProfile' : ActorMethod<[string], [] | [UserProfile]>,
  'likePost' : ActorMethod<[string, string], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
