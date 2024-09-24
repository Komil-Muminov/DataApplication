import "./LoginForm.css";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { LogType, useAuth } from "../API/Hooks/UseAuth";
import { queryClient } from "../API/QueryClient/QueryClient";
import { FC } from "react";
export const LoginForm: FC = () => {
	/**
	 * Валидация формы
	 */
	const {
		register,
		handleSubmit,
		// reset,
		getValues,
		formState: { errors },
	} = useForm<LogType>();

	/**
	 * Хук,функция и сабмит для авторизации
	 */

	const data: LogType = getValues();
	const { logUser } = useAuth();
	const logMutate = useMutation(
		{
			mutationFn: () => logUser(data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["users", "me"] });
			},
		},
		queryClient,
	);
	const onSubmit = () => {
		logMutate.mutate();
	};

	return (
		<form className="login-form" onSubmit={handleSubmit(onSubmit)}>
			<FormField label="Email">
				<input
					{...register("email", {
						required: {
							value: true,
							message: "Заполните поле email",
						},
					})}
					type="email"
				/>
				{errors.email && (
					<span className="form__errrors-message">
						{errors.email && (
							<span>{errors.email.message || "Поле email пустой"}</span>
						)}
					</span>
				)}
			</FormField>
			<FormField label="Пароль">
				<input
					{...register("password", {
						required: true,
						minLength: {
							value: 8,
							message: "Пароль должен содержать минимум 8 символов",
						},
					})}
					type="password"
				/>
				{errors.password && (
					<span className="form__errrors-message">
						Пароль обязателен(минимум 8 символов).
					</span>
				)}
			</FormField>
			<Button type={"submit"} isLoading={logMutate.isPending}>
				Войти
			</Button>
		</form>
	);
};
