import { StyleSheet } from 'react-native';

export const signUpStyles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 12 },
  titleSection: { paddingHorizontal: 24, marginTop: 24, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '700', color: '#101828' },
  subtitle: { fontSize: 16, color: '#6B7280', marginTop: 8 },
  formSection: { paddingHorizontal: 24, gap: 16 },
  fieldLabel: { fontSize: 14, fontWeight: '500', color: '#101828', marginBottom: 8 },
  errorText: { fontSize: 12, color: '#EF4444', marginTop: 4 },
  signUpButton: {
    backgroundColor: '#155DFC',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  signUpButtonDisabled: { opacity: 0.7 },
  signUpButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  loginText: { fontSize: 14, color: '#6B7280' },
  loginLink: { fontSize: 14, color: '#155DFC', fontWeight: '600' },
});
