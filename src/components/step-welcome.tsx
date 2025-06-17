import { Button } from "@/components/ui/button";
import type { AppConfig } from "@/types";

interface StepWelcomeProps {
  config: AppConfig;
  onNext: () => void;
}

export function StepWelcome({ config, onNext }: StepWelcomeProps) {
  return (
    <div className="overflow-hidden rounded-lg border-0 bg-white/50 shadow-lg">
      <div className="p-4 text-primary-foreground md:p-6" style={{ backgroundColor: config.corPrimaria }}>
        <h1 className="text-xl font-bold md:text-2xl">Bem-vindo ao nosso Café na Cesta!</h1>
      </div>
      <div className="space-y-4 p-6">
        <div className="prose prose-stone max-w-none">
          <p className="text-base leading-relaxed">{config.textoIntroducao}</p>
          <p className="font-medium text-base leading-relaxed">{config.textoAgradecimento}</p>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            onClick={onNext}
            className="text-primary-foreground transition-opacity hover:opacity-90"
            style={{ backgroundColor: config.corPrimaria }}
          >
            Começar a Montar →
          </Button>
        </div>
      </div>
    </div>
  );
}