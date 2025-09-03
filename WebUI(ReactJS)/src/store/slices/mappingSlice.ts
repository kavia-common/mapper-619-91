import { createSlice } from '@reduxjs/toolkit';

interface MappingState {
  mappings: any[];
  selectedMapping: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MappingState = {
  mappings: [],
  selectedMapping: null,
  isLoading: false,
  error: null,
};

const mappingSlice = createSlice({
  name: 'mappings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { clearError } = mappingSlice.actions;
export default mappingSlice.reducer;
