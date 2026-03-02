import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const restaurantDetailStyles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  listContent: { paddingBottom: 40 },

  /* Restaurant Info */
  imagePlaceholder: {
    width: width,
    height: 180,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {},
  infoContent: { padding: 24 },
  restaurantName: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  restaurantCuisine: { fontSize: 14, color: '#6B7280', marginBottom: 12 },
  metaRow: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 13, color: '#6B7280' },
  description: { fontSize: 14, color: '#6B7280', lineHeight: 22 },

  /* Search */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 24,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  searchInput: { flex: 1, paddingVertical: 12, paddingLeft: 8, fontSize: 14, color: '#101828' },

  /* Categories */
  categoriesContainer: { marginBottom: 16 },
  categoriesList: { paddingHorizontal: 24, gap: 8 },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  categoryChipActive: { backgroundColor: '#155DFC' },
  categoryText: { fontSize: 14, fontWeight: '500', color: '#6B7280' },
  categoryTextActive: { color: '#FFF' },

  menuSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#101828',
    marginBottom: 12,
    paddingHorizontal: 24,
  },

  /* Menu Item */
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 24,
    marginBottom: 12,
    padding: 14,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItemContent: { flex: 1, marginRight: 12 },
  menuItemName: { fontSize: 15, fontWeight: '600', color: '#101828', marginBottom: 4 },
  menuItemDescription: { fontSize: 13, color: '#9CA3AF', lineHeight: 18, marginBottom: 8 },
  menuItemFooter: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  menuItemPrice: { fontSize: 15, fontWeight: '700', color: '#155DFC' },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  popularText: { fontSize: 11, color: '#EF4444', fontWeight: '600' },
  menuItemImagePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Empty */
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: { fontSize: 14, color: '#9CA3AF', marginTop: 12 },
});
