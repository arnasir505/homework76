import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [lastMsgDate, setLastMsgDate] = useState('');
  const [loading, setLoading] = useState(false);
  let interval: number;

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const { data: messagesData } = await axiosApi.get<Message[]>('/messages');
      setMessages(messagesData);
      setLastMsgDate(messagesData[messagesData.length - 1].datetime);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    void fetchMessages();
  }, [fetchMessages]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(url);
  //     const messagesData = await response.json();
  //     setLastMsgDate(messagesData[messagesData.length - 1].datetime);
  //     setMessages(messagesData);
  //   };
  //   fetchData();
  //   setTimeout(() => {
  //     scrollToLastMsg();
  //   }, 2000);
  // }, []);

  // useEffect(() => {
  //   interval = setInterval(async () => {
  //     const response = await fetch(`${url}/?datetime=${lastMsgDate}`);
  //     const newMessagesData = await response.json();
  //     setMessages(newMessagesData);
  //     scrollToLastMsg();
  //   }, 1000);
  // }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserMessage((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
  };

  const ref = useRef<HTMLDivElement>(null);

  const scrollToLastMsg = () => {
    const lastChildEl = ref.current?.lastElementChild;
    lastChildEl?.scrollIntoView({ behavior: 'smooth' });
  };

  let content = <CircularProgress />;

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
      <Typography variant='h4' textAlign={'center'}>
        No messages yet. Send first message!
      </Typography>
    );
  }

  return (
    <Container>
      <Grid
        container
        justifyContent={'center'}
        sx={{ maxHeight: '600px', overflow: 'auto' }}
      >
        <Grid item xs={6}>
          {content}
        </Grid>
      </Grid>
      <Grid container marginTop={3} justifyContent={'center'}>
        <Grid item xs={12}>
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
