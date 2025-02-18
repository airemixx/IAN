import { CompareProvider } from "@/app/product/_context/CompareContext";

export default function ProductLayout({ children }) {
  return (
    <CompareProvider>
      {children}
    </CompareProvider>
  );
}
