import { BASE_URL } from "@/config/constants";
import { useSummaryStore } from "@/store/summary.store";
import { calculateUndefinedBalance } from "@/utils/calculate";
import { getHeaders } from "@/utils/get-headers";

export const useSummary = () => {
  const summary = useSummaryStore((state) => state.summary);
  const loading = useSummaryStore((state) => state.loading);

  const load = useSummaryStore((state) => state.loadSummary);
  const clear = useSummaryStore((state) => state.clearSummary);
  const onError = useSummaryStore((state) => state.onError);

  const loadSummary = async () => {
    const { ok, summary, error } = await fetch(`${BASE_URL}/api/summary`, {
      headers: { ...getHeaders() },
    }).then((res) => res.json());

    if (ok) {
      load(summary);
    } else {
      onError(error);
    }
  };

  return {
    summary,
    ...summary,
    balance: calculateUndefinedBalance(summary?.income, summary?.expense),
    count: (summary?.incomeCount || 0) + (summary?.expenseCount || 0),
    loading,
    loadSummary,
    clear,
  };
};
