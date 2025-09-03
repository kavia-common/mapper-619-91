import { createSlice } from '@reduxjs/toolkit';

interface TemplateState {
  templates: any[];
  selectedTemplate: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TemplateState = {
  templates: [],
  selectedTemplate: null,
  isLoading: false,
  error: null,
};

const templateSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { clearError } = templateSlice.actions;
export default templateSlice.reducer;
