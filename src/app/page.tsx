"use client";

import { useState } from "react";
import { useCafeData } from "@/hooks/useCafeData";
import { LoadingScreen } from "@/components/loading-screen";
import { AppHeader } from "@/components/app-header";
import { StepWelcome } from "@/components/step-welcome";
import { StepDetails } from "@/components/step-details";
import { StepReview } from "@/components/step-review";
import { StepSuccess } from "@/components/step-success";
import type { OrderState } from "@/types";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { appConfig, cabins, deliveryTimes, hotDishes, accompaniments, loading, error, refetch } = useCafeData();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [orderState, setOrderState] = useState<OrderState>({
    guestInfo: { name: "", cabin: "", people: 0, time: "" },
    persons: [],
    accompaniments: {},
    globalHotDishNotes: "",
    specialRequests: "",
  });

const updateGuestInfo = (updates: Partial<OrderState['guestInfo']>) => {
  const newPeople = updates.people;
  const oldPeople = orderState.guestInfo.people;

  setOrderState(prev => {
    const newState: OrderState = {
      ...prev,
      guestInfo: { ...prev.guestInfo, ...updates }
    };

    // Se o número de pessoas mudou, recria o array de 'persons'
    if (newPeople !== undefined && newPeople !== oldPeople) {
      newState.persons = Array.from({ length: newPeople }, (_, i) => ({
        id: i + 1,
        hotDish: null,
        notes: "",
      }));
    }

    return newState;
  });
};
  
  if (loading) return <LoadingScreen />;

  if (error || !appConfig) {
    return (
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <p className="text-destructive">{error || "Não foi possível carregar as configurações."}</p>
        <Button onClick={refetch} className="mt-4">Tentar Novamente</Button>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepWelcome config={appConfig} onNext={() => setCurrentStep(2)} />;
      case 2:
        return (
          <StepDetails
            orderState={orderState}
            cabins={cabins}
            deliveryTimes={deliveryTimes}
            onUpdateOrderState={updateGuestInfo}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      // ... outros casos para os próximos passos
      
      case 5: // Exemplo para Review
        return (
            <StepReview
                orderState={orderState}
                hotDishes={hotDishes}
                accompaniments={accompaniments}
                onBack={() => setCurrentStep(4)}
                onSuccess={() => setCurrentStep(6)} // Sucesso é o passo 6
                onUpdateSpecialRequests={(requests) => setOrderState(p => ({...p, specialRequests: requests}))}
            />
        );
      case 6: // Sucesso
        return <StepSuccess />;

      default:
        return <div>Passo não encontrado</div>;
    }
  };

  return (
    <div className="min-h-screen bg-muted text-secondary">
      <AppHeader config={appConfig} />
      <main className="container mx-auto p-4 lg:p-8">
        <div className="mx-auto max-w-4xl">
            {renderStep()}
        </div>
      </main>
    </div>
  );
}