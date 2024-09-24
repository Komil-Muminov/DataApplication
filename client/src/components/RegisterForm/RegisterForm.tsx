import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { useAuth, RegType } from "../API/Hooks/UseAuth";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
// import { LoginForm } from "../LoginForm";
import { queryClient } from "../API/QueryClient/QueryClient";
export const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		// reset,
		getValues,
		formState: { errors },
	} = useForm<RegType>({
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const data = getValues();
	const { regUser } = useAuth();
	const regMutate = useMutation(
		{
			mutationFn: () => regUser(data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["users", "me"] });
			},
		},
		queryClient,
	);

	const onSubmit = () => {
		regMutate.mutate();
	};

	return (
		<form className="register-form" onSubmit={handleSubmit(onSubmit)}>
			<FormField label="Имя">
				<input
					{...register("username", {
						required: {
							value: true,
							message: "Заполните поле Имя",
						},
						minLength: {
							value: 5,
							message: "Имя пользователя должен содержать минимум 5 символов",
						},
					})}
					type="text"
				/>
				{errors.username && (
					<span className="form__errrors-message">
						{errors.username.message}
					</span>
				)}
			</FormField>
			<FormField label="Email">
				<input
					{...register("email", {
						required: {
							value: true,
							message: "Заполните поле Email",
						},
					})}
					type="email"
				/>
				{errors.username && (
					<span className="form__errrors-message">
						{errors.username.message}
					</span>
				)}
			</FormField>
			<FormField label="Пароль">
				<input
					{...register("password", {
						required: true,
						minLength: {
							value: 8,
							message: "Введите минимум 8 символов",
						},
					})}
					type="password"
				/>
				{errors.username && (
					<span className="form__errrors-message">
						{errors.username.message}
					</span>
				)}
			</FormField>
			<Button type="submit" isLoading={regMutate.isPending}>
				Зарегистрироваться
			</Button>
		</form>
	);
};
