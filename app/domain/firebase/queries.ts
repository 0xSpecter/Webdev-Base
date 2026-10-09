import { useSuspenseQuery } from "@tanstack/react-query";

export function useQue() {
	return useSuspenseQuery({
		queryKey: ["queryKey"],
		queryFn: () => { },
	});
}
