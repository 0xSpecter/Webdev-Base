import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMut() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => { },
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["some query key"] });
		},
	});
}
