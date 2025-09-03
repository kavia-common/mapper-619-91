import { createSlice } from '@reduxjs/toolkit';

interface ServiceState {
  services: any[];
  selectedService: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  services: [],
  selectedService: null,
  isLoading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { clearError } = serviceSlice.actions;
export default serviceSlice.reducer;
