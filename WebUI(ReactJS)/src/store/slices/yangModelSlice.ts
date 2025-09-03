import { createSlice } from '@reduxjs/toolkit';

interface YangModelState {
  models: any[];
  selectedModel: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: YangModelState = {
  models: [],
  selectedModel: null,
  isLoading: false,
  error: null,
};

const yangModelSlice = createSlice({
  name: 'yangModels',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { clearError } = yangModelSlice.actions;
export default yangModelSlice.reducer;
