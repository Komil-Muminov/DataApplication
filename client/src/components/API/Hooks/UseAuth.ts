import { z } from "zod";

/**
 * Типизация регистрации
 */
export const RegScheme = z.object({
	username: z.string(),
	email: z.string().email(),
	password: z.string().max(3),
});

export type RegType = z.infer<typeof RegScheme>;

/**
 * Типизация авторизации
 */

export const LogScheme = z.object({
	email: z.string(),
	password: z.string().min(8),
});

export type LogType = z.infer<typeof LogScheme>;

export const useAuth = () => {
	/**
	 * Фукнция регистрации
	 */
	const regUser = async (regData: RegType): Promise<void> => {
		try {
			const response = await fetch("api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(regData),
			});
			await validateResponse(response);
			return await undefined;
		} catch (error) {
			throw new Error(`register throw new Error is:${error}`);
		}
	};

	/**
	 * Фукнция авторизации  и нахождений ошибок
	 */
	const validateResponse = async (response: Response): Promise<Response> => {
		if (!response.ok) {
			throw new Error(await response.text());
		}
		return response;
	};
	const logUser = async (logData: LogType): Promise<void> => {
		try {
			const response = await fetch("api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(logData),
			});
			await validateResponse(response);
			return await undefined;
		} catch (error) {
			throw new Error(`LogUser error is ${await error}`);
		}
	};

	/**
	 * Типизация fetchUser  и функция получение информации про конкретного юзера
	 */
	const UserScheme = z.object({
		username: z.string(),
		email: z.string(),
	});
	type UserType = z.infer<typeof UserScheme>;
	const fetchMe = async (): Promise<UserType> => {
		return fetch("api/users/me")
			.then(validateResponse)
			.then((response) => response.json())
			.then((data) => UserScheme.parse(data));
	};

	return {
		regUser,
		logUser,
		validateResponse,
		fetchMe,
	};
};
