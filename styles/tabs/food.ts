import { StyleSheet } from 'react-native';

export const foodStyles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  categoriesContainer: { marginTop: 12, paddingHorizontal: 16 },
  sectionHeader: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  featuredList: { paddingHorizontal: 16 },
  restaurantList: { paddingHorizontal: 16 },
});
