import { Button } from "../Button";
import { useMutation } from "@tanstack/react-query";
import { useMe } from "../API/Hooks/useMe";
import { queryClient } from "../API/QueryClient/QueryClient";
import { FC } from "react";
export const LogoutButton: FC = () => {
	const { outMe } = useMe();
	const outMeMutation = useMutation<void>(
		{
			mutationFn: () => outMe(),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["users", "me"] });
			},
		},
		queryClient,
	);

	const handleLogOut = (): void => {
		outMeMutation.mutate();
	};

	return (
		<div className="logout-button">
			<Button
				kind="secondary"
				onClick={handleLogOut}
				isLoading={outMeMutation.isPending}
			>
				Выйти
			</Button>
		</div>
	);
};
