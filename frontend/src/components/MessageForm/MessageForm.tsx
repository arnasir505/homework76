import { Box, Button, FormLabel, TextField } from '@mui/material';
import React from 'react';

interface Props {
  author: string;
  message: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const MessageForm: React.FC<Props> = ({
  author,
  message,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <FormLabel htmlFor='author'>Author:</FormLabel>
        <TextField
          type='text'
          name='author'
          id='author'
          sx={{ marginX: '12px' }}
          value={author}
          onChange={(e) => handleChange(e)}
          required
        />
        <FormLabel htmlFor='message'>Message:</FormLabel>
        <TextField
          type='text'
          name='message'
          id='message'
          sx={{ marginX: '12px' }}
          value={message}
          onChange={(e) => handleChange(e)}
          required
        />
        <Button type='submit' variant='contained'>
          SEND
        </Button>
      </Box>
    </form>
  );
};

export default MessageForm;
