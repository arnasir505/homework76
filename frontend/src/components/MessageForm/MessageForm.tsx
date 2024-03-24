import { Button, FormLabel, Grid, TextField } from '@mui/material';
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <FormLabel htmlFor='author'>Author:</FormLabel>
          <TextField
            type='text'
            name='author'
            id='author'
            value={author}
            onChange={(e) => handleChange(e)}
            required
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <FormLabel htmlFor='message'>Message:</FormLabel>
          <TextField
            type='text'
            name='message'
            id='message'
            value={message}
            onChange={(e) => handleChange(e)}
            required
          />
        </Grid>
        <Grid item xs={12} md={2} display={'flex'} alignItems={'center'}>
          <Button type='submit' variant='contained'>
            SEND
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MessageForm;
