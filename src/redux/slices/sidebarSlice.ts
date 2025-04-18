import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {
  isCollapsed: boolean;
}

const initialState: SidebarState = {
  isCollapsed: true, // collapsed by default
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isCollapsed = !state.isCollapsed;
    },
    setCollapsed(state, action) {
      state.isCollapsed = action.payload;
    },
  },
});

export const { toggleSidebar, setCollapsed } = sidebarSlice.actions;
export default sidebarSlice.reducer;
