export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Post = IDL.Record({
    'id' : IDL.Text,
    'content' : IDL.Text,
    'authorId' : IDL.Text,
    'createdAt' : Time,
    'likes' : IDL.Vec(IDL.Text),
  });
  const Result_2 = IDL.Variant({ 'ok' : Post, 'err' : IDL.Text });
  const UserProfile = IDL.Record({
    'id' : IDL.Text,
    'bio' : IDL.Text,
    'username' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : UserProfile, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text });
  return IDL.Service({
    'createPost' : IDL.Func([IDL.Text, IDL.Text], [Result_2], []),
    'createUserProfile' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [Result_1],
        [],
      ),
    'getPost' : IDL.Func([IDL.Text], [IDL.Opt(Post)], ['query']),
    'getPosts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
    'getUserProfile' : IDL.Func([IDL.Text], [IDL.Opt(UserProfile)], ['query']),
    'likePost' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
