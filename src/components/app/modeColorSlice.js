import { createSlice } from '@reduxjs/toolkit';

const ModeColors = { 
    rose: { color1: "#e11d48"},
    blue: { color1: "#1d4ed8"},
    orange: { color1: "#EA580C"},
    emerald: { color1: "#047857"}
};

const storedModeColor = localStorage.getItem("modeColor") || "rose";

const modeColorSlice = createSlice({
    name: 'modeColor',
    initialState: {
        currentModeColor: storedModeColor,
        availableModeColors: ModeColors,
        modecolors: ModeColors[storedModeColor],
    },
    reducers: {
        setModeColor: (state, action) => {
            if (Object.keys(state.availableModeColors).includes(action.payload)) {
                state.currentModeColor = action.payload;
                state.modecolors = state.availableModeColors[action.payload]; 
                localStorage.setItem("modeColor", action.payload);
            }
        },
    },
});

export const { setModeColor } = modeColorSlice.actions;

export default modeColorSlice.reducer;
