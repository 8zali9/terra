import "./globals.css";
import Header from './components/Header'
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
          <Header />
          {children}
        </ToggleContextProvider>
      </body>
    </html>
  );
}
