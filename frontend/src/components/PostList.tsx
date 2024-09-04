import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, IconButton, Card, CardContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import { backend } from '../../declarations/backend';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

interface Post {
  id: string;
  content: string;
  authorId: string;
  createdAt: bigint;
  likes: string[];
}

interface PostListProps {
  posts: Post[];
  onLike: (postId: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onLike }) => {
  return (
    <List>
      {posts.map((post) => (
        <StyledCard key={post.id}>
          <CardContent>
            <ListItem alignItems="flex-start" disableGutters>
              <ListItemAvatar>
                <StyledAvatar alt="User Avatar" src="https://images.unsplash.com/photo-1525085475165-c6808cdb005e?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU0MTE4ODR8&ixlib=rb-4.0.3" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography component={Link} to={`/profile/${post.authorId}`} color="primary" sx={{ fontWeight: 600 }}>
                    @{post.authorId}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component={Link}
                      to={`/post/${post.id}`}
                      variant="body1"
                      color="text.primary"
                      sx={{ display: 'block', my: 1 }}
                    >
                      {post.content}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(Number(post.createdAt / BigInt(1000000))).toLocaleString()}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <IconButton onClick={() => onLike(post.id)} color={post.likes.includes('user123') ? 'primary' : 'default'} size="small">
              <FavoriteIcon fontSize="small" />
            </IconButton>
            <Typography variant="caption" sx={{ ml: 1 }}>{post.likes.length} likes</Typography>
          </CardContent>
        </StyledCard>
      ))}
    </List>
  );
};

export default PostList;
