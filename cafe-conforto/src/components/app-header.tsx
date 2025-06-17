import type { AppConfig } from "@/types";

interface AppHeaderProps {
  config: AppConfig;
}

export function AppHeader({ config }: AppHeaderProps) {
  return (
    <header className="relative border-b bg-white/30 py-6 text-center md:py-8">
      <div className="container mx-auto px-4">
        {config.logoUrl ? (
          <div className="mb-4 flex h-20 items-center justify-center md:h-24">
            <img
              src={config.logoUrl}
              alt={`Logo ${config.nomeFazenda}`}
              className="h-full max-w-xs w-auto object-contain"
            />
          </div>
        ) : (
          <h1 className="text-3xl font-bold text-secondary mb-2">{config.nomeFazenda}</h1>
        )}
        <p className="text-md text-secondary/80 md:text-lg">{config.subtitulo}</p>
      </div>
    </header>
  );
}