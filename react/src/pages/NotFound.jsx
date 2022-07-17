import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export default function NotFound() {
    return (
        <Container maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
                <Typography>
                    There's nothing of interest here
                </Typography>
            </Box>
        </Container>)
}