import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Card, CardContent, CardActions, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { backend } from '../../declarations/backend';

interface Post {
  id: string;
  content: string;
  authorId: string;
  createdAt: bigint;
  likes: string[];
}

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const fetchedPost = await backend.getPost(postId);
          setPost(fetchedPost);
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPost();
  }, [postId]);

  const handleLike = async () => {
    if (post) {
      try {
        const result = await backend.likePost(post.id, 'user123'); // TODO: Replace with actual user ID
        if ('ok' in result) {
          setPost({ ...post, likes: [...post.likes, 'user123'] });
        } else {
          console.error('Failed to like post:', result.err);
        }
      } catch (error) {
        console.error('Error liking post:', error);
      }
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!post) {
    return <Typography>Post not found</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            @{post.authorId}
          </Typography>
          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(Number(post.createdAt / BigInt(1000000))).toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleLike} color={post.likes.includes('user123') ? 'primary' : 'default'}>
            <FavoriteIcon />
          </IconButton>
          <Typography variant="caption">{post.likes.length} likes</Typography>
        </CardActions>
      </Card>
    </Container>
  );
};

export default PostPage;
