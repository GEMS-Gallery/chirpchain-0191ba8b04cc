import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Avatar, Box, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface UserProfile {
  id: string;
  username: string;
  bio: string;
}

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        try {
          const fetchedProfile = await backend.getUserProfile(userId);
          setProfile(fetchedProfile);
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();
  }, [userId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!profile) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar
          alt={profile.username}
          src="https://images.unsplash.com/photo-1525085475165-c6808cdb005e?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU0MTE4ODR8&ixlib=rb-4.0.3"
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Box>
          <Typography variant="h4" component="h1">
            {profile.username}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            @{profile.id}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body1" paragraph>
        {profile.bio}
      </Typography>
    </Container>
  );
};

export default ProfilePage;
