import { useQuery } from "@tanstack/react-query";
import { getSettings } from "@/services/apiSettings";

export function useSettings() {
  const {
    data: settings,
    isPending,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings, // this fn should return the Promise
  });

  return { settings, isPending, error };
}
