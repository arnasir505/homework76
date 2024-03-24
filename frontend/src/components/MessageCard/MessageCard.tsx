import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface Props {
  author: string;
  message: string;
  datetime: string;
}

const MessageCard: React.FC<Props> = ({ author, message, datetime }) => {
  return (
    <Card sx={{ marginTop: '16px', textAlign: 'left' }}>
      <CardContent>
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <Typography variant='h5'>{author}</Typography>
          <Typography variant='body2' color={'gray'}>
            {dayjs(datetime).format('DD.MM.YYYY HH:mm')}
          </Typography>
        </Box>
        <Typography variant='body1' mt={1}>
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
