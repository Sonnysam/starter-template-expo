export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: {
    year: string;
    month: string;
    day: string;
  };
  phone: string;
  secondaryContact: string;
  email: string;
  address: string;
}

export interface DocumentUpload {
  front: string | null;
  back: string | null;
}

export interface IdentificationDocuments {
  driversLicense: DocumentUpload;
  ghanaCard: DocumentUpload;
}

export interface Vehicle {
  id: string;
  type: string;
  year: string;
  make: string;
  model: string;
  colour: string;
  vinNumber: string;
  numberPlate?: string;
  insuranceCopy: string | null;
  carImage: string | null;
}

export interface PaymentInfo {
  bankAccount?: {
    bank: string;
    accountNumber: string;
  };
  mobileMoney?: {
    provider: string;
    phoneNumber: string;
  };
}

export interface FleetInfo {
  name?: string;
  type?: string;
  size?: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  assignedVehicleId: string;
  driversLicense: string | null;
}

export interface RegistrationData {
  personalInfo: PersonalInfo;
  identificationDocuments: IdentificationDocuments;
  vehicles: Vehicle[];
  paymentInfo: PaymentInfo;
  fleetInfo?: FleetInfo;
  drivers: Driver[];
  termsAccepted: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  currentStep: number;
  registrationData: Partial<RegistrationData>;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
}

export interface AuthActions {
  setCurrentStep: (step: number) => void;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateIdentificationDocuments: (data: Partial<IdentificationDocuments>) => void;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (id: string, data: Partial<Vehicle>) => void;
  removeVehicle: (id: string) => void;
  updatePaymentInfo: (data: Partial<PaymentInfo>) => void;
  updateFleetInfo: (data: Partial<FleetInfo>) => void;
  addDriver: (driver: Omit<Driver, 'id'>) => void;
  updateDriver: (id: string, data: Partial<Driver>) => void;
  removeDriver: (id: string) => void;
  setTermsAccepted: (accepted: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  resetRegistration: () => void;
  submitRegistration: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
