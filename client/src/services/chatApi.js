import axios from 'axios';
import io from 'socket.io-client';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
let socket = null;
export const chatService = {
  connect: (userId) => {
    if (!socket) {
      socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');
    }
    socket.emit('user-connected', userId);
    return socket;
  },
  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },
  getSocket: () => socket,
  sendMessage: (receiverId, content) => {
    if (socket) {
      socket.emit('send-message', { receiverId, content });
    }
  },
  getMessages: (otherUserId) => {
    if (socket) {
      socket.emit('get-messages', { otherUserId });
    }
  },
  typing: (receiverId, isTyping) => {
    if (socket) {
      socket.emit('typing', { receiverId, isTyping });
    }
  },
  getConversations: () => axios.get(`${API_URL}/messages/conversations`),
};
