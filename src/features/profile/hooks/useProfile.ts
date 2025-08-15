"use client";

import { useState, useCallback, useEffect } from "react";
import { User } from "@/types/users";
import { getMyProfile } from "../services/profileService";
import { toaster } from "@/features/cart/components/ui/toaster";

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const profileData = await getMyProfile();
      setUser(profileData);
      setError(null);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Falha ao carregar o perfil.";
      setError(msg);
      toaster.create({ title: "Erro", description: msg, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    user,
    isLoading,
    error,
    refetch: fetchProfile,
  };
};
