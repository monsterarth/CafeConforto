"use client";

import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, doc, getDoc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { HotDish, Cabin, AccompanimentCategory, AppConfig } from "@/types";

export function useCafeData() {
  const [data, setData] = useState<{
    hotDishes: HotDish[];
    cabins: Cabin[];
    deliveryTimes: string[];
    accompaniments: Record<string, AccompanimentCategory>;
    appConfig: AppConfig | null;
  }>({
    hotDishes: [],
    cabins: [],
    deliveryTimes: [],
    accompaniments: {},
    appConfig: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // O ideal é buscar um documento denormalizado.
      // Por enquanto, vamos manter a lógica de múltiplas buscas,
      // mas centralizada e com tratamento de erro robusto.
      const [configGeralDoc, appConfigDoc, menuSnapshot] = await Promise.all([
        getDoc(doc(db, "configuracoes", "geral")),
        getDoc(doc(db, "configuracoes", "app")),
        getDocs(query(collection(db, "cardapio"), orderBy("posicao"))),
      ]);

      // Processar Configs...
      const configData = configGeralDoc.data() || {};
      const appConfigData = appConfigDoc.data() || {};
      
      const cabins: Cabin[] = (configData.cabanas || []).map((c: any) => ({
        name: c.nomeCabana,
        capacity: c.capacidadeMaxima,
      }));
      const deliveryTimes: string[] = configData.horariosEntrega || [];

      const finalAppConfig: AppConfig = {
        nomeFazenda: "Fazenda do Rosa",
        subtitulo: "Cesta de Café da Manhã",
        textoIntroducao: "Bem-vindo!",
        textoAgradecimento: "Obrigado!",
        corPrimaria: "#97A25F",
        corSecundaria: "#4B4F36",
        ...appConfigData,
      };

      // Processar Cardápio...
      const dishes: HotDish[] = [];
      const accompanimentsData: Record<string, AccompanimentCategory> = {};
      
      // (Lógica de processamento do cardápio adaptada do projeto antigo)
      
      setData({ hotDishes: dishes, cabins, deliveryTimes, accompaniments: accompanimentsData, appConfig: finalAppConfig });

    } catch (err: any) {
      console.error("Erro ao carregar dados:", err);
      setError(`Erro ao carregar dados. Tente recarregar a página.`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { ...data, loading, error, refetch: loadData };
}