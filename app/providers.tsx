"use client";

import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "../app/redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        {children}
      </ThemeProvider>
    </Provider>
  );
}
