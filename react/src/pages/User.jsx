import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Alert, Box, CircularProgress, Container, Grid, Typography } from '@mui/material';

import NotFound from 'pages/NotFound';

import { getUser } from 'services/service';

export default function User() {
    const [user, setUser] = useState(null);
    const params = useParams();
    const id = params.id.match(/-?\d+/);
    const [apiError, setApiError] = useState('');
    
    useEffect(() => { 
      let isSubscribed = true;
      if (id) {
        getUser(id)
        .then(response => {
          if (isSubscribed) {
            const contentType = response.headers.get('content-type');
            if (response.ok && contentType && contentType.includes('application/json')) {
              response.json().then(setUser);
            } else if (response.status === 404) {
              setApiError('Sorry, but user was not found');
            } else if (!contentType || !contentType.includes('application/json')) {
              response.text().then(setApiError);
            } else {
              response.json().then(e => setApiError(e.Err));
            }
          }
        })
        .catch(setApiError);
    }
    return () => isSubscribed = false;
  }, [id]);
    
    if (!id) {
      return <NotFound />;
    }

    return (
        <Container>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {
                user === null ? 
                (apiError === '' ? <CircularProgress /> : <Alert severity="error">{apiError}</Alert>) :
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography component="h1" variant="h3">
                      {user.Name + ' ' + user.Surname + (user.Patronymic ? ' ' + user.Patronymic : '') + ' (a.k.a @' + user.Login + ')'}
                    </Typography>
                  </Grid>
                  <Grid items xs={12}>
                      <Typography component="h2" variant="h4">Registered</Typography>
                      <Typography>{user.Created}</Typography>
                  </Grid>
                  { user.About && user.About.trim() !== '' &&
                    <Grid items xs={12}>
                        <Typography component="h2" variant="h4">About</Typography>
                        <Typography>
                          <pre style={{ fontFamily: 'inherit' }}>
                              {user.About}
                          </pre>
                        </Typography>
                    </Grid>
                  }
                  <Grid items xs={12}>
                      <Typography component="h2" variant="h4">Contacts</Typography>
                      <Typography>Phone number: {user.Phone && user.Phone !== '' ? user.Phone : 'Not set'}</Typography>
                      <Typography>E-mail: {user.Email && user.Email !== '' ? user.Email : 'Not set'}</Typography>
                  </Grid>
                  <Grid items xs={12}>
                      <Typography component="h2" variant="h4">Birthday</Typography>
                      <Typography>{user.Birthday}</Typography>
                  </Grid>
                  <Grid items xs={12}>
                      <Typography component="h2" variant="h4">Gender</Typography>
                      <Typography>{user.Gender}</Typography>
                  </Grid>
                </Grid>
              }
            </Box>
        </Container>)
}
