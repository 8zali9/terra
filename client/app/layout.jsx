import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          <ToastContainer />
          {children}
        </ToggleContextProvider>
      </body>
    </html>
  );
}
