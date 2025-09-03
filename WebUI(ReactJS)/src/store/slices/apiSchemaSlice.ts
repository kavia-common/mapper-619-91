import { createSlice } from '@reduxjs/toolkit';

interface ApiSchemaState {
  schemas: any[];
  selectedSchema: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ApiSchemaState = {
  schemas: [],
  selectedSchema: null,
  isLoading: false,
  error: null,
};

const apiSchemaSlice = createSlice({
  name: 'apiSchemas',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { clearError } = apiSchemaSlice.actions;
export default apiSchemaSlice.reducer;
