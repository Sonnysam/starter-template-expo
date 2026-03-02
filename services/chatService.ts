import api from '@/config/api';

const chatService = {
  getConversations: async () => {
    const response = await api.get('/chats/conversations/');
    return response;
  },

  getConversationMessages: async (conversationId: string) => {
    const response = await api.get(`/chats/conversations/${conversationId}/messages`);
    return response;
  },

  startConversation: async (conversationData: Record<string, unknown>) => {
    const response = await api.post('/conversations/start/', conversationData);
    return response;
  },

  markAsRead: async (conversationId: string) => {
    const response = await api.post(`/chats/conversations/${conversationId}/mark-read/`);
    return response;
  },
};

export default chatService;
