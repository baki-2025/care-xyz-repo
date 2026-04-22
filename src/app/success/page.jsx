import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

function SuccessFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full" />
        <p>Loading...</p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessFallback />}>
      <SuccessContent />
    </Suspense>
  );
}
