import "./globals.css";
import ToggleContextProvider from "./contextProviders/ToggleContextProvider";

export const metadata = {
  title: `terra`,
  description: "Real Estate webapp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToggleContextProvider>
          {children}
        </ToggleContextProvider>
      </body>
    </html>
  );
}
