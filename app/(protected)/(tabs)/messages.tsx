import React from 'react';
import { View, FlatList, Pressable, ActivityIndicator } from 'react-native';
import {
  Host,
  Form,
  Section,
  Button,
  Text as SwiftText,
  VStack,
  HStack,
  Spacer,
  Image,
} from '@expo/ui/swift-ui';
import {
  buttonStyle,
  controlSize,
  tint,
  font,
  foregroundStyle,
} from '@expo/ui/swift-ui/modifiers';
import { messagesStyles as styles } from '@/styles/tabs/messages';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MainContainer from '@/components/common/MainContainer';
import { useTheme } from '@/constants/themeContext';
import useAuthStore from '@/store/auth';
import useChat from '@/hooks/useChat';
import AuthPromptModal from '@/components/common/AuthPromptModal';
import { useAuthGate } from '@/hooks/useAuthGate';

interface Conversation {
  id: string;
  other_user?: { name?: string; username?: string };
  last_message?: { content?: string; timestamp?: string };
  unread_count?: number;
}

export default function MessagesPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { requireAuth, showAuthPrompt, authAction, dismissAuthPrompt } = useAuthGate();

  const { data, isLoading } = useChat.useGetConversations(isAuthenticated);
  const conversations = ((data as unknown) as Conversation[]) || [];

  // Auth guard — show a friendly sign-in screen for guests
  if (!isAuthenticated) {
    return (
      <MainContainer scrollable={false} edges={['top', 'left', 'right']} style={{ paddingHorizontal: 0 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: '#155DFC',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Ionicons name="chatbubble-outline" size={32} color="#FFF" />
          </View>
          <Host matchContents>
            <VStack spacing={8}>
              <SwiftText modifiers={[font({ size: 20, weight: 'bold' })]}>Your Messages</SwiftText>
              <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 14 })]}>
                Sign in to view and send messages to sellers
              </SwiftText>
            </VStack>
          </Host>
          <View style={{ marginTop: 20 }}>
            <Host matchContents>
              <VStack spacing={12}>
                <Button
                  label="Sign In"
                  modifiers={[
                    buttonStyle('borderedProminent'),
                    controlSize('large'),
                    tint('#155DFC'),
                  ]}
                  onPress={() => router.push('/(auth)/login')}
                />
                <Button
                  label="Don't have an account? Sign Up"
                  modifiers={[buttonStyle('plain'), foregroundStyle('blue')]}
                  onPress={() => router.push('/(auth)/signUp')}
                />
              </VStack>
            </Host>
          </View>
        </View>
      </MainContainer>
    );
  }

  if (isLoading) {
    return (
      <MainContainer scrollable={false} edges={['top', 'left', 'right']}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#155DFC" />
        </View>
      </MainContainer>
    );
  }

  if (conversations.length === 0) {
    return (
      <MainContainer scrollable={false} edges={['top', 'left', 'right']} style={{ paddingHorizontal: 0 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="chatbubbles-outline" size={64} color="#D1D5DB" />
          <Host matchContents>
            <VStack spacing={6}>
              <SwiftText modifiers={[font({ size: 18, weight: 'semibold' })]}>
                No messages yet
              </SwiftText>
              <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 14 })]}>
                Start a conversation by contacting a seller
              </SwiftText>
            </VStack>
          </Host>
        </View>
      </MainContainer>
    );
  }

  const renderConversation = ({ item }: { item: Conversation }) => (
    <Pressable
      style={styles.conversationItem}
      onPress={() =>
        router.push({
          pathname: '/(protected)/(stack)/chat/[id]' as never,
          params: {
            id: item.id,
            name: item.other_user?.name || item.other_user?.username || 'User',
          },
        } as never)
      }
    >
      <View style={styles.avatar}>
        <Ionicons name="person" size={24} color="#9CA3AF" />
      </View>
      <View style={{ flex: 1 }}>
        <Host matchContents>
          <VStack spacing={2}>
            <HStack>
              <SwiftText modifiers={[font({ weight: 'semibold' })]}>
                {item.other_user?.name || item.other_user?.username || 'User'}
              </SwiftText>
              <Spacer />
              {item.last_message?.timestamp && (
                <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 12 })]}>
                  {new Date(item.last_message.timestamp).toLocaleDateString()}
                </SwiftText>
              )}
            </HStack>
            <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 13 })]}>
              {item.last_message?.content || 'No messages yet'}
            </SwiftText>
          </VStack>
        </Host>
      </View>
      {(item.unread_count ?? 0) > 0 && (
        <View style={styles.unreadBadge}>
          <Host matchContents>
            <SwiftText modifiers={[font({ size: 11, weight: 'bold' }), foregroundStyle('white')]}>
              {String(item.unread_count)}
            </SwiftText>
          </Host>
        </View>
      )}
    </Pressable>
  );

  return (
    <MainContainer scrollable={false} edges={['top', 'left', 'right']} style={{ paddingHorizontal: 0 }}>
      <View style={styles.header}>
        <Host matchContents>
          <SwiftText modifiers={[font({ size: 20, weight: 'bold' })]}>Messages</SwiftText>
        </Host>
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        contentContainerStyle={styles.listContent}
      />
    </MainContainer>
  );
}
