import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Loader2 } from "lucide-react";

// Components
import { Toaster } from "@/components/ui/sonner";

// Routes
import router from "./routes";

// Styles
import "./App.css";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-full">
          <Loader2 className="w-16 h-16 animate-spin" />
        </div>
      }
    >
      <RouterProvider router={router} />
      <Toaster />
    </Suspense>
  );
}

export default App;
