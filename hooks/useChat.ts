import { useMutation, useQuery } from '@tanstack/react-query';
import chatService from '@/services/chatService';

const useGetConversations = (enabled = true) => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: chatService.getConversations,
    enabled,
  });
};

const useGetConversationMessages = (conversationId: string, enabled = true) => {
  return useQuery({
    queryKey: ['conversations', conversationId, 'messages'],
    queryFn: () => chatService.getConversationMessages(conversationId),
    enabled: enabled && !!conversationId,
  });
};

const useStartConversation = () => {
  return useMutation({
    mutationFn: chatService.startConversation,
  });
};

const useMarkAsRead = () => {
  return useMutation({
    mutationFn: chatService.markAsRead,
  });
};

export {
  useGetConversations,
  useGetConversationMessages,
  useStartConversation,
  useMarkAsRead,
};

export default {
  useGetConversations,
  useGetConversationMessages,
  useStartConversation,
  useMarkAsRead,
};
