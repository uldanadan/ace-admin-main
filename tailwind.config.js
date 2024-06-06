/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				primary: ["Inter", "sans-serif"]
			},
			colors: {
				white: "#ffffff",
				// "brand-line": "#d1d5db",
				"brand-line": "#e2e8f0",
				"brand-gray": "#f3f4f6",
				"brand-dark": "#2A2A32",
				"brand-light": "#FAFAFA",
				"brand-accent": "#9475ED",
				"brand-primary": "#351137",
				"brand-secondary": "#113646",
				"second-dark": "#2A2A32",
				"brand-yellow": "#FFC700",
				"brand-blue": "#00A3FF",
				"brand-dark-blue": "#181C32",
				"brand-border": "#FFFFFF80",
				"brand-red": "#EF4444"
			},
			transitionTimingFunction: {
				"in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
				"out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
				"out-quad": "cubic-bezier(0.5, 1, 0.89, 1)",
				"in-quad": "cubic-bezier(0.11, 0, 0.5, 0)"
			},
			gridTemplateColumns: {
				// Simple 16 row grid
				14: "repeat(14, minmax(0, 1fr))",
				16: "repeat(16, minmax(0, 1fr))",

				// Complex site-specific row configuration
				layout: "200px minmax(900px, 1fr) 100px"
			},
			gridTemplateRows: {
				// Simple 16 row grid
				16: "repeat(16, minmax(0, 1fr))",

				// Complex site-specific row configuration
				layout: "200px minmax(900px, 1fr) 100px"
			}
		}
	},
	plugins: []
}
