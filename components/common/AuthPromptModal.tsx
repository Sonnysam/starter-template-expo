import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/constants/themeContext';
import GlassCard from '@/components/common/GlassCard';

const AUTH_MESSAGES: Record<string, { title: string; subtitle: string; icon: keyof typeof Ionicons.glyphMap }> = {
  checkout: {
    title: 'Sign in to checkout',
    subtitle: 'Create an account or sign in to complete your purchase.',
    icon: 'cart-outline',
  },
  sell: {
    title: 'Sign in to sell',
    subtitle: 'Create an account or sign in to start listing your products.',
    icon: 'pricetag-outline',
  },
  store: {
    title: 'Sign in to create a store',
    subtitle: 'Create an account or sign in to set up your store.',
    icon: 'storefront-outline',
  },
  restaurant: {
    title: 'Sign in to create a restaurant',
    subtitle: 'Create an account or sign in to set up your restaurant.',
    icon: 'restaurant-outline',
  },
  message: {
    title: 'Sign in to message',
    subtitle: 'Create an account or sign in to chat with sellers.',
    icon: 'chatbubble-outline',
  },
  profile: {
    title: 'Sign in to continue',
    subtitle: 'Create an account or sign in to manage your profile.',
    icon: 'person-outline',
  },
  order: {
    title: 'Sign in to order',
    subtitle: 'Create an account or sign in to place your order.',
    icon: 'bag-handle-outline',
  },
  default: {
    title: 'Sign in required',
    subtitle: 'Create an account or sign in to access this feature.',
    icon: 'lock-closed-outline',
  },
};

interface AuthPromptModalProps {
  visible: boolean;
  onDismiss: () => void;
  action?: string;
}

export default function AuthPromptModal({ visible, onDismiss, action }: AuthPromptModalProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const { title, subtitle, icon } = AUTH_MESSAGES[action || 'default'] || AUTH_MESSAGES.default;

  const handleSignIn = () => {
    onDismiss();
    router.push('/(auth)/login');
  };

  const handleSignUp = () => {
    onDismiss();
    router.push('/(auth)/signUp');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
        >
          <GlassCard
            style={styles.sheet}
            fallbackStyle={{ backgroundColor: theme.card }}
            glassEffectStyle="regular"
          >
          {/* Drag handle */}
          <View style={styles.handleContainer}>
            <View style={[styles.handle, { backgroundColor: theme.borderColor }]} />
          </View>

          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name={icon} size={32} color="#FFFFFF" />
            </View>
          </View>

          {/* Text */}
          <Text style={[styles.title, { color: theme.primaryText }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: theme.subtext }]}>{subtitle}</Text>

          {/* Buttons */}
          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleSignIn}
            activeOpacity={0.85}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signUpButton, { borderColor: theme.borderColor }]}
            onPress={handleSignUp}
            activeOpacity={0.85}
          >
            <Text style={[styles.signUpText, { color: theme.primaryText }]}>
              Create Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dismissButton}
            onPress={onDismiss}
            activeOpacity={0.7}
          >
            <Text style={[styles.dismissText, { color: theme.subtext }]}>
              Continue Browsing
            </Text>
          </TouchableOpacity>
          </GlassCard>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
    overflow: 'hidden',
  },
  handleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  iconContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#155DFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 28,
    paddingHorizontal: 12,
  },
  signInButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#155DFC',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  signUpButton: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  signUpText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  dismissButton: {
    paddingVertical: 8,
  },
  dismissText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});
