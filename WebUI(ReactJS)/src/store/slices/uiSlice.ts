import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  loading: {
    global: boolean;
    components: Record<string, boolean>;
  };
  modals: {
    [key: string]: {
      isOpen: boolean;
      data?: any;
    };
  };
  notifications: {
    show: boolean;
    unreadCount: number;
  };
  breadcrumbs: Array<{
    label: string;
    path?: string;
  }>;
  pageTitle: string;
  filters: {
    [key: string]: any;
  };
  errors: {
    [key: string]: string | null;
  };
}

const initialState: UIState = {
  sidebarCollapsed: localStorage.getItem('sidebarCollapsed') === 'true',
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  loading: {
    global: false,
    components: {},
  },
  modals: {},
  notifications: {
    show: false,
    unreadCount: 0,
  },
  breadcrumbs: [],
  pageTitle: 'Mapper Design Studio',
  filters: {},
  errors: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      localStorage.setItem('sidebarCollapsed', state.sidebarCollapsed.toString());
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
      localStorage.setItem('sidebarCollapsed', action.payload.toString());
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    },
    setComponentLoading: (state, action: PayloadAction<{ component: string; loading: boolean }>) => {
      state.loading.components[action.payload.component] = action.payload.loading;
    },
    openModal: (state, action: PayloadAction<{ modal: string; data?: any }>) => {
      state.modals[action.payload.modal] = {
        isOpen: true,
        data: action.payload.data,
      };
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = {
        isOpen: false,
        data: undefined,
      };
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((modal) => {
        state.modals[modal] = {
          isOpen: false,
          data: undefined,
        };
      });
    },
    setNotificationsVisible: (state, action: PayloadAction<boolean>) => {
      state.notifications.show = action.payload;
    },
    setUnreadNotificationCount: (state, action: PayloadAction<number>) => {
      state.notifications.unreadCount = action.payload;
    },
    setBreadcrumbs: (state, action: PayloadAction<Array<{ label: string; path?: string }>>) => {
      state.breadcrumbs = action.payload;
    },
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
      document.title = `${action.payload} - Mapper Design Studio`;
    },
    setFilter: (state, action: PayloadAction<{ key: string; value: any }>) => {
      state.filters[action.payload.key] = action.payload.value;
    },
    clearFilter: (state, action: PayloadAction<string>) => {
      delete state.filters[action.payload];
    },
    clearAllFilters: (state) => {
      state.filters = {};
    },
    setError: (state, action: PayloadAction<{ key: string; error: string | null }>) => {
      state.errors[action.payload.key] = action.payload.error;
    },
    clearError: (state, action: PayloadAction<string>) => {
      delete state.errors[action.payload];
    },
    clearAllErrors: (state) => {
      state.errors = {};
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setTheme,
  setGlobalLoading,
  setComponentLoading,
  openModal,
  closeModal,
  closeAllModals,
  setNotificationsVisible,
  setUnreadNotificationCount,
  setBreadcrumbs,
  setPageTitle,
  setFilter,
  clearFilter,
  clearAllFilters,
  setError,
  clearError,
  clearAllErrors,
} = uiSlice.actions;

export default uiSlice.reducer;
