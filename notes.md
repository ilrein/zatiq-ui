const [connected, setConnected] = useState(false);
const [client, setSocket] = useState(null);
const [userId] = useState('12345abcdef');
const [newNote, setNewNote] = useState('');
const [submitting, setSubmitting] = useState(false);

const [notes, setNotes] = useState([]);

useEffect(() => {
  const socket = io.connect(`http://localhost:4000`);
  
  socket.on('connect', () => {
    setConnected(true);
    setSocket(socket);
    
    socket.emit('room', userId);
    socket.emit('get-notes', {
      meta: {
        page: 1,
        userId,
      }
    })
  });
}, []);