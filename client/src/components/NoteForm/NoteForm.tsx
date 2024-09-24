import * as React from "react";
import "./NoteForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { NoteType, useNotes } from "../API/Hooks/useNotes";
import { queryClient } from "../API/QueryClient/QueryClient";
export const NoteForm: React.FC = () => {
	const {
		register,
		getValues,
		formState: { errors },
		handleSubmit,
		// reset,
	} = useForm<NoteType>({
		defaultValues: {
			title: "",
			text: "",
		},
	});

	const data: NoteType = getValues();
	const { createNote } = useNotes();
	const noteMutate = useMutation(
		{
			mutationFn: () => createNote(data),
			onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
		},
		queryClient,
	);
	const onSubmit = () => {
		noteMutate.mutate();
	};

	return (
		<form className="note-form" onSubmit={handleSubmit(onSubmit)}>
			<FormField label="Заголовок">
				<input
					{...register("title", {
						required: {
							value: true,
							message: "Заполните поле.",
						},
						minLength: {
							value: 5,
							message: "Необходимо ввести минимум 5 символов",
						},
					})}
					type="text"
				/>
				{errors?.title && (
					<span className="form__errrors-message">
						{errors?.title.message || "Необходимо ввести минимум 5 символов"}
					</span>
				)}
			</FormField>
			<FormField label="Текст">
				<textarea
					{...register("text", {
						required: true,
						minLength: {
							value: 10,
							message: "Заполните поле. Необходимо ввести минимум 10 символов",
						},
					})}
					maxLength={300}
				/>
				{errors?.text && (
					<span className="form__errrors-message">
						{errors?.text.message || "Необходимо ввести минимум 10 символов"}
					</span>
				)}
			</FormField>
			<Button type="submit" isLoading={noteMutate.isPending}>
				Сохранить
			</Button>
		</form>
	);
};
