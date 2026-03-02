import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const foodItemDetailStyles = StyleSheet.create({
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
  imagePlaceholder: {
    width: width,
    height: 220,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { padding: 24 },

  /* FoodInfo */
  foodInfoSection: { marginBottom: 24 },
  foodName: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  ratingText: { fontSize: 13, color: '#6B7280' },
  dot: { color: '#D1D5DB', marginHorizontal: 4 },
  foodDescription: { fontSize: 14, color: '#6B7280', lineHeight: 22, marginBottom: 10 },
  foodPrice: { fontSize: 22, fontWeight: '700', color: '#155DFC' },

  /* Selectors */
  selectorSection: { marginBottom: 24 },
  selectorTitle: { fontSize: 16, fontWeight: '600', color: '#101828', marginBottom: 12 },

  /* Size */
  sizeOptions: { flexDirection: 'row', gap: 10 },
  sizeOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  sizeOptionActive: { borderColor: '#155DFC', backgroundColor: '#EEF2FF' },
  sizeOptionText: { fontSize: 14, fontWeight: '600', color: '#101828' },
  sizeOptionTextActive: { color: '#155DFC' },
  sizeOptionPrice: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  sizeOptionPriceActive: { color: '#155DFC' },

  /* Add-ons */
  addOnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxActive: { backgroundColor: '#155DFC', borderColor: '#155DFC' },
  addOnName: { flex: 1, fontSize: 14, color: '#101828' },
  addOnPrice: { fontSize: 14, color: '#6B7280', fontWeight: '500' },

  /* Special Instructions */
  instructionInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: '#101828',
    minHeight: 80,
    textAlignVertical: 'top',
  },

  /* Quantity */
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quantityLabel: { fontSize: 16, fontWeight: '600', color: '#101828' },
  quantityControls: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  quantityBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityBtnActive: { backgroundColor: '#155DFC' },
  quantityValue: { fontSize: 18, fontWeight: '600', color: '#101828', minWidth: 24, textAlign: 'center' },

  /* Cart Footer */
  cartFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 34,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  totalLabel: { fontSize: 13, color: '#6B7280' },
  totalAmount: { fontSize: 22, fontWeight: '700', color: '#101828' },
  addToCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#155DFC',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
  },
  addToCartText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
