import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Avatar, Box, CircularProgress, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { backend } from '../../declarations/backend';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginRight: theme.spacing(3),
}));

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
    return (
      <StyledContainer maxWidth="sm">
        <CircularProgress />
      </StyledContainer>
    );
  }

  if (!profile) {
    return (
      <StyledContainer maxWidth="sm">
        <Typography>User not found</Typography>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer maxWidth="sm">
      <StyledCard>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <StyledAvatar
              alt={profile.username}
              src="https://images.unsplash.com/photo-1525085475165-c6808cdb005e?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU0MTE4ODR8&ixlib=rb-4.0.3"
            />
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
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
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
};

export default ProfilePage;
