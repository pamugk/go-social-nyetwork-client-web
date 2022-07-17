import React, { useEffect, useState } from 'react';

import { Link as RouterLink, useSearchParams } from 'react-router-dom';

import { Alert, Avatar, Box, CircularProgress, Container, Divider, Link, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';

import { searchUsers } from 'services/service';

function UserList(users) {
  if (users.Total === 0) {
    return (
      <Typography
        sx={{ display: 'inline' }}
        component='span'
        variant='body2'
        color='text.primary'
      >
        Nothing found
      </Typography>
    );
  }
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
        users.Page.map((user) => {
          return (
            <>
              <ListItem key={user.Id} alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar alt={user.Name + " " + user.Surname}>
                    <FaceIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Link component={RouterLink} to={'/user/' + user.Id}>{'@' + user.Login}</Link>}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        {user.Name + ' ' + user.Surname + (user.Patronymic ? ' ' + user.Patronymic : '')}
                      </Typography>
                      { user.About && ' — ' + user.About}
                    </React.Fragment>
                  }
                />
              </ListItem>
            <Divider variant='inset' component='li' key={'d' + user.Id} />
          </>);
        })
      }
    </List>);
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.has('q') ? searchParams.get('q') : '';
  const page = searchParams.has('page') ? searchParams.get('page') : 0;
  
  const [users, setUsers] = useState(null);
  const [apiError, setApiError] = useState('');
  
  useEffect(() => { 
    let isSubscribed = true;
    searchUsers(query, page, 100)
      .then(response => {
        if (isSubscribed) {
          const contentType = response.headers.get('content-type');
          if (response.ok && contentType && contentType.includes('application/json')) {
            response.json().then(setUsers);
          } else if (!contentType || !contentType.includes('application/json')) {
            response.text().then(setApiError);
          } else {
            response.json().then(e => setApiError(e.Err));
          }
        }
      })
      .catch(setApiError);
    return () => isSubscribed = false;
  }, [query, page]);
  
  return (
      <Container maxWidth='xs'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              autoFocus
              fullWidth
              required
              type='search'
              autoComplete='search'
              value={query} 
              onChange={ event => setSearchParams(event.target.value === '' ? {} : {'q': event.target.value}) }
            />
            { apiError && <Alert severity="error" onClose={() => setApiError(null)}>{apiError}</Alert> }
            { 
              users === null ? 
              <CircularProgress /> :
              UserList(users)
            }
          </Box>
      </Container>)
}
