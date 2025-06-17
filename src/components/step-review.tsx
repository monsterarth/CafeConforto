"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, LoaderCircle } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { OrderState, HotDish, AccompanimentCategory } from "@/types";

interface StepReviewProps {
  orderState: OrderState;
  hotDishes: HotDish[];
  accompaniments: Record<string, AccompanimentCategory>;
  onBack: () => void;
  onSuccess: () => void;
  onUpdateSpecialRequests: (requests: string) => void;
}

export function StepReview({
  orderState,
  hotDishes,
  accompaniments,
  onBack,
  onSuccess,
  onUpdateSpecialRequests,
}: StepReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    setError(null);

    // ... (A lógica de montagem e envio do pedido pode ser copiada do projeto antigo)
    // ... (Ela já era bem robusta)

    try {
      // Simulação de envio
      console.log("Enviando pedido:", orderState);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula latência da rede
      
      // Lógica de envio para o firestore aqui...
      // await addDoc(collection(db, "pedidos"), orderPayload);

      onSuccess();
    } catch (err) {
      setError("Houve um erro ao enviar o pedido. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border-0 bg-white/50 shadow-lg">
      <div className="bg-primary p-4 text-primary-foreground md:p-6">
        <h1 className="text-xl font-bold md:text-2xl">Revisão Final</h1>
      </div>
      <div className="space-y-4 p-6">
        <p>Confira seu pedido. Se estiver tudo certo, adicione observações e confirme.</p>
        
        {/* Renderização do resumo do pedido... */}
        
        {error && <p className="text-sm text-destructive">{error}</p>}
        
        <div className="mt-8 flex flex-col justify-between gap-3 sm:flex-row sm:gap-0">
          <Button variant="outline" onClick={onBack} disabled={isSubmitting}>← Voltar</Button>
          <Button onClick={handleConfirmOrder} disabled={isSubmitting} className="min-w-40">
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <><CheckCircle className="mr-2 h-4 w-4" /> Confirmar Pedido</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Nota: A renderização do resumo pode ser complexa.
// Pode-se criar um componente separado `OrderSummary` para manter este arquivo limpo.