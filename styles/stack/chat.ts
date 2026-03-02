import { StyleSheet } from 'react-native';

export const chatStyles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerName: { fontSize: 16, fontWeight: '600' },
  headerStatus: { fontSize: 12, color: '#10B981' },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  messagesList: { padding: 16, flexGrow: 1 },

  /* Bubbles */
  bubbleContainer: { marginBottom: 8 },
  ownBubbleContainer: { alignItems: 'flex-end' },
  otherBubbleContainer: { alignItems: 'flex-start' },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  ownBubble: {
    backgroundColor: '#155DFC',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#F3F4F6',
    borderBottomLeftRadius: 4,
  },
  bubbleText: { fontSize: 15, color: '#101828', lineHeight: 20 },
  ownBubbleText: { color: '#FFF' },
  bubbleFooter: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, alignSelf: 'flex-end' },
  bubbleTime: { fontSize: 11, color: '#9CA3AF' },
  ownBubbleTime: { color: 'rgba(255,255,255,0.7)' },

  /* Empty */
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: { fontSize: 14, color: '#9CA3AF', marginTop: 12, textAlign: 'center' },

  /* Auth Guard */
  authGuard: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  authGuardText: { fontSize: 16, color: '#6B7280' },
  loginBtn: {
    backgroundColor: '#155DFC',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  loginBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },

  /* Input Bar */
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingBottom: 6,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 8,
  },
  attachBtn: { paddingBottom: 6 },
  inputContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  textInput: { fontSize: 15, color: '#101828', paddingVertical: 4 },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#155DFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#93C5FD' },
});
