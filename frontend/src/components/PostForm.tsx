import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { backend } from '../../declarations/backend';

const StyledForm = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

interface PostFormProps {
  onPostCreated: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      setIsLoading(true);
      try {
        const result = await backend.createPost(content, 'user123'); // TODO: Replace with actual user ID
        if ('ok' in result) {
          setContent('');
          onPostCreated();
        } else {
          console.error('Failed to create post:', result.err);
        }
      } catch (error) {
        console.error('Error creating post:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <StyledForm component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isLoading}
      />
      <StyledButton
        type="submit"
        variant="contained"
        color="primary"
        disabled={!content.trim() || isLoading}
      >
        {isLoading ? 'Posting...' : 'Post'}
      </StyledButton>
    </StyledForm>
  );
};

export default PostForm;
