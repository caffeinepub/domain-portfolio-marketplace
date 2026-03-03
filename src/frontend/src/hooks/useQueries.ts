import { useMutation, useQuery } from "@tanstack/react-query";
import type { Domain } from "../backend.d";
import { useActor } from "./useActor";

export function useGetDomains() {
  const { actor, isFetching } = useActor();
  return useQuery<Domain[]>({
    queryKey: ["domains"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDomains();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSubmitOffer() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      domainId,
      amount,
      email,
    }: {
      domainId: bigint;
      amount: number;
      email: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.submitOffer(domainId, amount, email);
    },
  });
}

export function useContactSeller() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      domainId,
      name,
      email,
      message,
    }: {
      domainId: bigint;
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.contactSeller(domainId, name, email, message);
    },
  });
}
