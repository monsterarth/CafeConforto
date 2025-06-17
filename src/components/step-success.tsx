"use client";

import { CheckCircle, Heart } from "lucide-react";

export function StepSuccess() {
  return (
    <div className="overflow-hidden rounded-lg border-0 bg-white/50 text-center shadow-lg">
      <div className="space-y-6 p-8">
        <div className="flex justify-center">
          <CheckCircle className="h-20 w-20 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-green-700">Pedido Confirmado!</h2>
        <div className="space-y-4">
          <p className="text-lg text-secondary">
            Sua cesta está sendo preparada com muito carinho pela nossa equipe.
          </p>
          <p className="text-secondary">
            Em breve você receberá seu café da manhã no horário solicitado.
          </p>
          <div className="flex items-center justify-center gap-2 font-medium text-primary">
            <Heart className="h-5 w-5 fill-current" />
            <span>Desejamos um dia maravilhoso!</span>
            <Heart className="h-5 w-5 fill-current" />
          </div>
        </div>
      </div>
    </div>
  );
}