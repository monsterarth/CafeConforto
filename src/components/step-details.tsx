"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Cabin, OrderState } from "@/types";

interface StepDetailsProps {
  orderState: OrderState;
  cabins: Cabin[];
  deliveryTimes: string[];
  onUpdateOrderState: (updates: Partial<OrderState['guestInfo']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepDetails({
  orderState,
  cabins,
  deliveryTimes,
  onUpdateOrderState,
  onNext,
  onBack,
}: StepDetailsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePeopleChange = (people: number) => {
    const persons = Array.from({ length: people }, (_, i) => ({
      id: i + 1,
      hotDish: null,
      notes: "",
    }));

    // Dispara a atualização para o componente pai
    onUpdateOrderState({
      ...orderState.guestInfo,
      people,
      // É crucial resetar os pratos quentes aqui também
    });
    // Atualiza o estado local das pessoas
    setOrderState(prev => ({ ...prev, persons }));
  };

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};
    if (!orderState.guestInfo.name.trim()) newErrors.name = "Insira seu nome.";
    if (!orderState.guestInfo.cabin) newErrors.cabin = "Selecione a cabana.";
    if (!orderState.guestInfo.people) newErrors.people = "Selecione o nº de pessoas.";
    if (!orderState.guestInfo.time) newErrors.time = "Selecione um horário.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) onNext();
  };

  const selectedCabin = cabins.find(c => c.name === orderState.guestInfo.cabin);

  return (
    <div className="overflow-hidden rounded-lg border-0 bg-white/50 shadow-lg">
      <div className="bg-primary p-4 text-primary-foreground md:p-6">
        <h1 className="text-xl font-bold md:text-2xl">Detalhes da Reserva</h1>
      </div>
      <div className="space-y-6 p-6">
        <div>
          <Label htmlFor="guest-name">Seu Nome Completo</Label>
          <Input
            id="guest-name"
            value={orderState.guestInfo.name}
            onChange={(e) => onUpdateOrderState({ name: e.target.value })}
            placeholder="Nome do responsável pela reserva"
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Seleção de Cabana e Pessoas... */}
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium">Horário de Entrega</legend>
          {/* Opções de Horário */}
        </fieldset>

        <div className="mt-8 flex flex-col justify-between gap-3 sm:flex-row sm:gap-0">
          <Button variant="outline" onClick={onBack}>← Voltar</Button>
          <Button onClick={validateAndNext}>Próximo →</Button>
        </div>
      </div>
    </div>
  );
}

// Nota: O código completo para seleção de cabana, pessoas e horário
// pode ser adaptado do projeto anterior. A lógica principal de validação
// e atualização do estado está demonstrada acima.