import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import { backend } from '../../declarations/backend';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await backend.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = () => {
    fetchPosts();
  };

  const handleLike = async (postId: string) => {
    try {
      const result = await backend.likePost(postId, 'user123'); // TODO: Replace with actual user ID
      if ('ok' in result) {
        fetchPosts();
      } else {
        console.error('Failed to like post:', result.err);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Home
      </Typography>
      <PostForm onPostCreated={handlePostCreated} />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <PostList posts={posts} onLike={handleLike} />
      )}
    </Container>
  );
};

export default HomePage;
