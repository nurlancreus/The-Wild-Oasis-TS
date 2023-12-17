import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting as updateSettingApi } from "@/services/apiSettings";
import type { TSettingsSchema } from "./settingsSchema";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: (newSetting: TSettingsSchema) =>
      updateSettingApi(newSetting),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Setting successfully updated.");
    },
    onError: (err) => {
      if (err instanceof Error) toast.error(err.message);
    },
  });

  return { updateSetting, isUpdating };
}
