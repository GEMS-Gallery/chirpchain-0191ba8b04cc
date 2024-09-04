import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { backend } from '../../declarations/backend';

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
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!content.trim() || isLoading}
        sx={{ mt: 1 }}
      >
        {isLoading ? 'Posting...' : 'Post'}
      </Button>
    </Box>
  );
};

export default PostForm;
