import { z } from "zod";
export const getMeScheme = z.object({
	id: z.string(),
	username: z.string(),
});

export type getMeType = z.infer<typeof getMeScheme>;

export const useMe = () => {
	const getMe = async (): Promise<getMeType> => {
		return fetch(`/api/users/me`)
			.then((response) => response.json())
			.then((data) => getMeScheme.parse(data));
	};

	const outMe = async (): Promise<void> => {
		return fetch(`/api/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(() => undefined);
	};

	return {
		getMe,
		outMe,
	};
};
