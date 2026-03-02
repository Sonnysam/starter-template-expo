import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Host,
  Button,
  Text as SwiftText,
  VStack,
  HStack,
  Image as SwiftImage,
} from '@expo/ui/swift-ui';
import {
  buttonStyle,
  controlSize,
  tint,
  font,
  foregroundStyle,
} from '@expo/ui/swift-ui/modifiers';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MainContainer from '@/components/common/MainContainer';
import { useTheme } from '@/constants/themeContext';
import useAuthStore from '@/store/auth';
import { useGetConversationMessages } from '@/hooks/useChat';
import WebSocketService from '@/services/websocketService';

type Message = {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  read?: boolean;
};

const formatTime = (timestamp: string) => {
  try {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
};

function MessageBubble({
  message,
  isOwn,
}: {
  message: Message;
  isOwn: boolean;
}) {
  return (
    <View
      style={{
        alignSelf: isOwn ? 'flex-end' : 'flex-start',
        maxWidth: '78%',
        marginVertical: 3,
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          backgroundColor: isOwn ? '#155DFC' : '#F3F4F6',
          borderRadius: 18,
          borderBottomRightRadius: isOwn ? 4 : 18,
          borderBottomLeftRadius: isOwn ? 18 : 4,
          paddingHorizontal: 14,
          paddingVertical: 10,
        }}
      >
        <Host matchContents>
          <VStack>
            <SwiftText modifiers={[foregroundStyle(isOwn ? 'white' : 'primary'), font({ size: 15 })]}>
              {message.text}
            </SwiftText>
            <HStack>
              <SwiftText modifiers={[foregroundStyle(isOwn ? 'rgba(255,255,255,0.6)' : 'gray'), font({ size: 11 })]}>
                {formatTime(message.timestamp)}
              </SwiftText>
              {isOwn && message.read && (
                <SwiftImage
                  systemName="checkmark.circle.fill"
                  modifiers={[foregroundStyle('#93C5FD'), font({ size: 12 })]}
                />
              )}
            </HStack>
          </VStack>
        </Host>
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { mode } = useTheme();
  const user = useAuthStore((s) => s.user);

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList>(null);

  const { data: fetchedMessages } = useGetConversationMessages(id ?? '');

  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages as Message[]);
    }
  }, [fetchedMessages]);

  useEffect(() => {
    if (!id || !user) return;

    const ws = WebSocketService.getInstance();
    ws.connect(user.id ?? '');

    const handleMessage = (data: Record<string, unknown>) => {
      if (data.conversationId === id) {
        const newMsg: Message = {
          id: (data.id as string) ?? Date.now().toString(),
          text: (data.text as string) ?? (data.message as string) ?? '',
          senderId: data.senderId as string,
          timestamp: (data.timestamp as string) ?? new Date().toISOString(),
          read: false,
        };
        setMessages((prev) => [...prev, newMsg]);
      }
    };

    ws.on('message', handleMessage);
    return () => {
      ws.off('message', handleMessage);
    };
  }, [id, user]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  const handleSend = useCallback(() => {
    const text = inputText.trim();
    if (!text || !user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      senderId: user.id ?? 'me',
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    const ws = WebSocketService.getInstance();
    ws.send({
      type: 'message',
      conversationId: id,
      text,
    });
  }, [inputText, user, id]);

  // Auth guard
  if (!user) {
    return (
      <MainContainer scrollable={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={mode === 'dark' ? '#FFF' : '#101828'}
            onPress={() => router.back()}
          />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Host matchContents>
              <SwiftText modifiers={[font({ size: 18, weight: 'semibold' })]}>Chat</SwiftText>
            </Host>
          </View>
          <View style={{ width: 24 }} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Host matchContents>
            <VStack>
              <SwiftImage
                systemName="lock.fill"
                modifiers={[foregroundStyle('#D1D5DB'), font({ size: 48 })]}
              />
              <SwiftText modifiers={[foregroundStyle('gray'), font({ size: 16 })]}>
                Please log in to chat
              </SwiftText>
              <Button
                label="Sign In"
                modifiers={[
                  buttonStyle('borderedProminent'),
                  controlSize('large'),
                  tint('#155DFC'),
                ]}
                onPress={() => router.push('/(auth)/login' as never)}
              />
            </VStack>
          </Host>
        </View>
      </MainContainer>
    );
  }

  return (
    <MainContainer scrollable={false}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16 }}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={mode === 'dark' ? '#FFF' : '#101828'}
          onPress={() => router.back()}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12, flex: 1 }}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: '#F3F4F6',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name="person" size={18} color="#9CA3AF" />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Host matchContents>
              <VStack>
                <SwiftText modifiers={[font({ size: 16, weight: 'semibold' })]}>Conversation</SwiftText>
                <SwiftText modifiers={[foregroundStyle('#10B981'), font({ size: 12 })]}>Online</SwiftText>
              </VStack>
            </Host>
          </View>
        </View>
        <Ionicons name="ellipsis-vertical" size={22} color={mode === 'dark' ? '#FFF' : '#101828'} />
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 12 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              isOwn={item.senderId === (user.id ?? 'me')}
            />
          )}
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 80 }}>
              <Host matchContents>
                <VStack>
                  <SwiftImage
                    systemName="bubble.left.and.bubble.right"
                    modifiers={[foregroundStyle('#D1D5DB'), font({ size: 48 })]}
                  />
                  <SwiftText modifiers={[foregroundStyle('gray')]}>
                    No messages yet. Start the conversation!
                  </SwiftText>
                </VStack>
              </Host>
            </View>
          }
        />

        {/* Input Bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            paddingHorizontal: 12,
            paddingVertical: 8,
            gap: 8,
            borderTopWidth: 0.5,
            borderTopColor: mode === 'dark' ? '#333' : '#E5E7EB',
          }}
        >
          <Pressable>
            <Ionicons name="add-circle-outline" size={24} color="#9CA3AF" />
          </Pressable>
          <View
            style={{
              flex: 1,
              backgroundColor: mode === 'dark' ? '#1C1C1E' : '#F3F4F6',
              borderRadius: 20,
              paddingHorizontal: 14,
              paddingVertical: 8,
              maxHeight: 100,
            }}
          >
            <TextInput
              style={{
                fontSize: 15,
                color: mode === 'dark' ? '#FFF' : '#101828',
              }}
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={1000}
            />
          </View>
          <Pressable
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: inputText.trim() ? '#155DFC' : '#D1D5DB',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={18} color="#FFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </MainContainer>
  );
}
