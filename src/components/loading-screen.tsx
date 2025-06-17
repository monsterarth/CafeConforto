interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Carregando cardápio..." }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-muted">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary" />
      <p className="mt-4 text-lg text-secondary">{message}</p>
    </div>
  );
}