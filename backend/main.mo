import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Text "mo:base/Text";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Option "mo:base/Option";
import Iter "mo:base/Iter";

actor {
  // Types
  type Post = {
    id: Text;
    content: Text;
    authorId: Text;
    createdAt: Time.Time;
    likes: [Text];
  };

  type UserProfile = {
    id: Text;
    username: Text;
    bio: Text;
  };

  // Stable variables
  stable var nextPostId: Nat = 0;
  stable var postEntries: [(Text, Post)] = [];
  stable var userEntries: [(Text, UserProfile)] = [];

  // Create HashMap from stable variables
  let posts = HashMap.fromIter<Text, Post>(postEntries.vals(), 0, Text.equal, Text.hash);
  let users = HashMap.fromIter<Text, UserProfile>(userEntries.vals(), 0, Text.equal, Text.hash);

  // Helper function to generate a new post ID
  func generatePostId() : Text {
    nextPostId += 1;
    Nat.toText(nextPostId)
  };

  // Create a new post
  public func createPost(content: Text, authorId: Text) : async Result.Result<Post, Text> {
    let postId = generatePostId();
    let newPost: Post = {
      id = postId;
      content = content;
      authorId = authorId;
      createdAt = Time.now();
      likes = [];
    };
    posts.put(postId, newPost);
    #ok(newPost)
  };

  // Get all posts
  public query func getPosts() : async [Post] {
    Array.map<(Text, Post), Post>(Iter.toArray(posts.entries()), func(entry) { entry.1 })
  };

  // Get a specific post
  public query func getPost(postId: Text) : async ?Post {
    posts.get(postId)
  };

  // Like a post
  public func likePost(postId: Text, userId: Text) : async Result.Result<Bool, Text> {
    switch (posts.get(postId)) {
      case (null) { #err("Post not found") };
      case (?post) {
        let updatedLikes = Array.filter<Text>(post.likes, func(id) { id != userId });
        let newLikes = Array.append<Text>(updatedLikes, [userId]);
        let updatedPost = {
          id = post.id;
          content = post.content;
          authorId = post.authorId;
          createdAt = post.createdAt;
          likes = newLikes;
        };
        posts.put(postId, updatedPost);
        #ok(true)
      };
    }
  };

  // Get user profile
  public query func getUserProfile(userId: Text) : async ?UserProfile {
    users.get(userId)
  };

  // Create a new user profile
  public func createUserProfile(userId: Text, username: Text, bio: Text) : async Result.Result<UserProfile, Text> {
    switch (users.get(userId)) {
      case (?_) { #err("User already exists") };
      case (null) {
        let newProfile: UserProfile = {
          id = userId;
          username = username;
          bio = bio;
        };
        users.put(userId, newProfile);
        #ok(newProfile)
      };
    }
  };

  // System functions for upgrades
  system func preupgrade() {
    postEntries := Iter.toArray(posts.entries());
    userEntries := Iter.toArray(users.entries());
  };

  system func postupgrade() {
    postEntries := [];
    userEntries := [];
  };
}
