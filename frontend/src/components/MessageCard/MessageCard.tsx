import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface Props {
  author: string;
  message: string;
  datetime: string;
}

const MessageCard: React.FC<Props> = ({ author, message, datetime }) => {
  return (
    <Card sx={{ marginTop: '16px' }}>
      <CardContent>
        <Typography variant='h5'>{author}</Typography>
        <Typography variant='body2'>{message}</Typography>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
