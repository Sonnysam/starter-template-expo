import { getTokens } from '@/utils/storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || '';

type EventCallback = (data?: unknown) => void;

interface WebSocketMessage {
  type: string;
  [key: string]: unknown;
}

class WebSocketService {
  private static instance: WebSocketService | null = null;

  private conversationId: string | null = null;
  private token: string | null = null;
  private ws: WebSocket | null = null;
  private userId: string | null = null;
  private isConnected = false;
  private isReconnecting = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private messageQueue: WebSocketMessage[] = [];
  private listeners: Record<string, EventCallback[]> = {};
  private heartbeatInterval: ReturnType<typeof setInterval> | null = null;
  private heartbeatDelay = 30000;

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  private getWebSocketUrl(): string {
    const baseUrl = API_BASE_URL;
    const wsProtocol = baseUrl.startsWith('https') ? 'wss' : 'ws';
    const wsHost = baseUrl.replace(/^https?:\/\//, '');
    return `${wsProtocol}://${wsHost}/ws/chat/${this.conversationId}/?token=${encodeURIComponent(this.token || '')}`;
  }

  async connect(conversationId: string): Promise<void> {
    this.conversationId = conversationId;

    try {
      const tokens = await getTokens();
      if (!tokens || !tokens.accessToken) {
        throw new Error('No authentication token found');
      }
      this.token = tokens.accessToken;
    } catch (error) {
      console.error('Failed to get auth token:', error);
      this.emit('error', { message: 'Authentication failed' });
      return;
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('Already connected');
      return;
    }

    try {
      const url = this.getWebSocketUrl();
      this.ws = new WebSocket(url);

      this.ws.onopen = this.handleOpen.bind(this);
      this.ws.onmessage = this.handleMessage.bind(this);
      this.ws.onerror = this.handleError.bind(this);
      this.ws.onclose = this.handleClose.bind(this);
    } catch (error) {
      console.error('WebSocket connection error:', error);
      this.handleError(error as Event);
    }
  }

  private handleOpen(): void {
    this.isConnected = true;
    this.isReconnecting = false;
    this.reconnectAttempts = 0;
    this.startHeartbeat();
    this.flushMessageQueue();
    this.emit('connected');
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'debug':
          this.userId = data.user_id;
          this.emit('debug', data);
          break;
        case 'chat_message':
          this.emit('message', data);
          break;
        case 'typing':
          this.emit('typing', data);
          break;
        default:
          this.emit('unknown', data);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  }

  private handleError(error: Event | unknown): void {
    console.error('WebSocket error:', error);
    this.emit('error', error);
  }

  private handleClose(event: CloseEvent): void {
    this.isConnected = false;
    this.stopHeartbeat();
    this.emit('disconnected', { code: event.code, reason: event.reason });

    if (event.code !== 1000) {
      this.attemptReconnect();
    }
  }

  private attemptReconnect(): void {
    if (this.isReconnecting || this.reconnectAttempts >= this.maxReconnectAttempts) {
      return;
    }

    this.isReconnecting = true;
    this.reconnectAttempts++;

    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    this.reconnectTimer = setTimeout(() => {
      this.connect(this.conversationId!);
    }, delay);
  }

  send(message: WebSocketMessage): boolean {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(message));
        return true;
      } catch (error) {
        console.error('Error sending message:', error);
        this.messageQueue.push(message);
        return false;
      }
    } else {
      this.messageQueue.push(message);
      return false;
    }
  }

  private flushMessageQueue(): void {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) this.send(message);
    }
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.heartbeatInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.send({ type: 'ping' });
      }
    }, this.heartbeatDelay);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  on(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
  }

  private emit(event: string, data?: unknown): void {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in ${event} listener:`, error);
      }
    });
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.stopHeartbeat();
    if (this.ws) {
      this.ws.close(1000, 'User disconnected');
      this.ws = null;
    }
    this.isConnected = false;
    this.isReconnecting = false;
    this.reconnectAttempts = 0;
  }

  getState(): string {
    if (!this.ws) return 'closed';
    const states: Record<number, string> = {
      [WebSocket.CONNECTING]: 'connecting',
      [WebSocket.OPEN]: 'open',
      [WebSocket.CLOSING]: 'closing',
      [WebSocket.CLOSED]: 'closed',
    };
    return states[this.ws.readyState] || 'unknown';
  }

  isConnectionOpen(): boolean {
    return this.isConnected && !!this.ws && this.ws.readyState === WebSocket.OPEN;
  }
}

export default WebSocketService;
