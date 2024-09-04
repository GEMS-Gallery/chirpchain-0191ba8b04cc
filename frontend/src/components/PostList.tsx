import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { backend } from '../../declarations/backend';

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
        <ListItem key={post.id} alignItems="flex-start" divider>
          <ListItemAvatar>
            <Avatar alt="User Avatar" src="https://images.unsplash.com/photo-1525085475165-c6808cdb005e?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU0MTE4ODR8&ixlib=rb-4.0.3" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography component={Link} to={`/profile/${post.authorId}`} color="primary">
                @{post.authorId}
              </Typography>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component={Link}
                  to={`/post/${post.id}`}
                  variant="body2"
                  color="text.primary"
                >
                  {post.content}
                </Typography>
                <Typography variant="caption" display="block">
                  {new Date(Number(post.createdAt / BigInt(1000000))).toLocaleString()}
                </Typography>
              </React.Fragment>
            }
          />
          <IconButton onClick={() => onLike(post.id)} color={post.likes.includes('user123') ? 'primary' : 'default'}>
            <FavoriteIcon />
          </IconButton>
          <Typography variant="caption">{post.likes.length}</Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default PostList;
