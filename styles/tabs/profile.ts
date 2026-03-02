import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },

  // --- Authenticated Header ---
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    gap: 14,
  },
  avatar: {
    backgroundColor: '#E5E7EB',
  },
  avatarFallback: {
    backgroundColor: '#155dfc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
  },
  userEmail: {
    fontSize: 13,
    color: '#6B7280',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(21,93,252,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // --- Guest Header ---
  guestHeader: {
    alignItems: 'center',
    marginBottom: 28,
    gap: 6,
  },
  guestAvatarWrap: {
    marginBottom: 4,
  },
  guestTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  guestSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  authButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  signInBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#101828',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  signUpBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpBtnText: {
    fontSize: 15,
    fontWeight: '600',
  },

  // --- Sections ---
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 8,
    marginLeft: 4,
  },
  sectionCard: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
  },

  // --- Menu Row ---
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
  },

  // --- Price badge ---
  priceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  priceTag: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
  },

  // --- Logout ---
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    backgroundColor: 'rgba(239,68,68,0.05)',
    marginTop: 8,
    marginBottom: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EF4444',
  },

  // --- Version ---
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 16,
  },
});
