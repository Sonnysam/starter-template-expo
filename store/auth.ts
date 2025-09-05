import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  AuthState,
  AuthActions,
  PersonalInfo,
  IdentificationDocuments,
  Vehicle,
  PaymentInfo,
  FleetInfo,
  Driver,
} from '@/interfaces/auth';

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  currentStep: 1,
  registrationData: {
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: { year: '', month: '', day: '' },
      phone: '',
      secondaryContact: '',
      email: '',
      address: '',
    },
    identificationDocuments: {
      driversLicense: { front: null, back: null },
      ghanaCard: { front: null, back: null },
    },
    vehicles: [],
    paymentInfo: {},
    drivers: [],
    termsAccepted: false,
  },
  user: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentStep: (step: number) => set({ currentStep: step }),

      updatePersonalInfo: (data: Partial<PersonalInfo>) =>
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            personalInfo: { ...state.registrationData.personalInfo!, ...data },
          },
        })),

      updateIdentificationDocuments: (data: Partial<IdentificationDocuments>) =>
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            identificationDocuments: {
              ...state.registrationData.identificationDocuments!,
              ...data,
            },
          },
        })),

      addVehicle: (vehicle: Omit<Vehicle, 'id'>) =>
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            vehicles: [
              ...(state.registrationData.vehicles || []),
              { ...vehicle, id: Date.now().toString() },
            ],
          },
        })),

      updateVehicle: (id: string, data: Partial<Vehicle>) =>
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            vehicles: (state.registrationData.vehicles || []).map((vehicle) =>
              vehicle.id === id ? { ...vehicle, ...data } : vehicle
            ),
          },
        })),

      removeVehicle: (id: string) =>
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            vehicles: (state.registrationData.vehicles || []).filter(
              (vehicle) => vehicle.id !== id
            ),
          },
        })),

      updatePaymentInfo: (data: Partial<PaymentInfo>) =>
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            paymentInfo: { ...state.registrationData.paymentInfo, ...data },
          },
        })),

      updateFleetInfo: (data: Partial<FleetInfo>) =>
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            fleetInfo: { ...(state.registrationData.fleetInfo || {}), ...data },
          },
        })),

      addDriver: (driver: Omit<Driver, 'id'>) =>
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            drivers: [
              ...(state.registrationData.drivers || []),
              { ...driver, id: Date.now().toString() },
            ],
          },
        })),

      updateDriver: (id: string, data: Partial<Driver>) =>
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            drivers: (state.registrationData.drivers || []).map((driver) =>
              driver.id === id ? { ...driver, ...data } : driver
            ),
          },
        })),

      removeDriver: (id: string) =>
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            drivers: (state.registrationData.drivers || []).filter((driver) => driver.id !== id),
          },
        })),

      setTermsAccepted: (accepted: boolean) =>
        set((state) => ({
          registrationData: { ...state.registrationData, termsAccepted: accepted },
        })),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),

      clearError: () => set({ error: null }),

      resetRegistration: () =>
        set({ registrationData: initialState.registrationData, currentStep: 1 }),

      submitRegistration: async () => {
        set({ isLoading: true, error: null });
        try {
          const { registrationData } = get();
          console.log('Submitting registration:', registrationData);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          set({
            isAuthenticated: true,
            user: {
              id: '1',
              email: registrationData.personalInfo?.email || '',
              name: `${registrationData.personalInfo?.firstName} ${registrationData.personalInfo?.lastName}`,
            },
          });
        } catch {
          set({ error: 'Registration failed. Please try again.' });
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          console.log('Logging in:', { email, password });
          await new Promise((resolve) => setTimeout(resolve, 1000));
          set({ isAuthenticated: true, user: { id: '1', email, name: 'User' } });
        } catch {
          set({ error: 'Login failed. Please check your credentials.' });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          registrationData: initialState.registrationData,
          currentStep: 1,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        registrationData: state.registrationData,
        currentStep: state.currentStep,
      }),
    }
  )
);
