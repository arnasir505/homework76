import { useCallback, useEffect, useState } from 'react';
import { ClientMessage, Message } from './types';
import MessageForm from './components/MessageForm/MessageForm';
import MessageCard from './components/MessageCard/MessageCard';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import axiosApi from './axiosApi';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<ClientMessage>({
    author: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  let lastMsgDate: string;

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const { data: messagesData } = await axiosApi.get<Message[]>('/messages');
      setMessages(messagesData);
      if (messagesData.length > 0) {
        lastMsgDate = messagesData[messagesData.length - 1].datetime;
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const postMessage = useCallback(async () => {
    try {
      if (userMessage.author !== '' && userMessage.message !== '') {
        await axiosApi.post('/messages', userMessage);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userMessage]);

  const clearInputs = () => {
    setUserMessage({
      author: '',
      message: '',
    });
  };

  useEffect(() => {
    void fetchMessages();
    setInterval(async () => {
      try {
        const { data: newMessagesData } = await axiosApi.get<Message[]>(
          '/messages?datetime=' + lastMsgDate
        );
        if (newMessagesData.length > 0) {
          lastMsgDate = newMessagesData[newMessagesData.length - 1].datetime;
          setMessages((prevState) => [...prevState, ...newMessagesData]);
        }
      } catch (error) {
        console.log(error);
      }
    }, 3000);
  }, [fetchMessages]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserMessage((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postMessage();
    if (messages.length === 0) {
      void fetchMessages();
    }
    clearInputs();
  };

  let content = <CircularProgress size={'3rem'} sx={{ mt: 2 }} />;

  if (messages.length > 0 && !loading) {
    content = (
      <>
        {messages.map((msg) => (
          <MessageCard
            key={msg.id}
            author={msg.author}
            message={msg.message}
            datetime={msg.datetime}
          />
        ))}
      </>
    );
  } else if (messages.length === 0 && !loading) {
    content = (
      <Typography variant='h5' textAlign={'center'} mt={3}>
        No messages yet. Send first message!
      </Typography>
    );
  }

  return (
    <Container>
      <Grid
        container
        justifyContent={'center'}
        sx={{ maxHeight: '600px', overflow: 'auto', py: 2 }}
      >
        <Grid item xs={12} md={6} textAlign={'center'}>
          {content}
        </Grid>
      </Grid>
      <Grid container marginTop={3} justifyContent={'center'}>
        <Grid item xs={12} md={6}>
          <MessageForm
            author={userMessage.author}
            message={userMessage.message}
            handleChange={handleFormChange}
            handleSubmit={handleFormSubmit}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
