import { createSlice } from '@reduxjs/toolkit';

const storedTheme = localStorage.getItem("theme") || "Dark";

const ModeColors = {
    default: { color1: "#fff", color2: "#000" },
    rose: { color1: "#e11d48", color2: "#fff" },
    blue: { color1: "#1d4ed8", color2: "#fff" },
    orange: { color1: "#EA580C", color2: "#fff" },
    emerald: { color1: "#047857", color2: "#fff" }
};

const storedModeColor = localStorage.getItem("modeColor") || "default";

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
        setDefaultModeColor: (state, action) => {
            const { theme } = action.payload;
        
            const dynamicColor1 = theme === "Dark" ? "#fff" : "#000";
            const dynamicColor2 = theme === "Dark" ? "#000" : "#fff"
        
            state.availableModeColors.default = { color1: dynamicColor1, color2: dynamicColor2 };
        
            if (state.currentModeColor === "default") {
                state.modecolors = state.availableModeColors.default;
            }
        }

    },
});

export const { setModeColor, setDefaultModeColor } = modeColorSlice.actions;

export default modeColorSlice.reducer;
