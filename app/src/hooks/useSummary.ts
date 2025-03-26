import { useSummaryStore } from "@/store/summary.store";
import { getHeaders } from "@/utils/get-headers";

export const useSummary = () => {
  const summary = useSummaryStore((state) => state.summary);
  const loading = useSummaryStore((state) => state.loading);

  const load = useSummaryStore((state) => state.loadSummary);
  const clear = useSummaryStore((state) => state.clearSummary);
  const onError = useSummaryStore((state) => state.onError);

  const loadSummary = async () => {
    const { ok, summary, error } = await fetch("/api/summary", {
      headers: { ...getHeaders() },
    }).then((res) => res.json());

    if (ok) {
      load(summary);
    } else {
      onError(error);
    }
  };

  return { summary, loading, loadSummary, clear };
};
