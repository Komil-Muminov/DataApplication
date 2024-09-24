import { z } from "zod";

// Cхема полчуение постов
export const NoteScheme = z.object({
	title: z.string(),
	text: z.string(),
});

export type NoteType = z.infer<typeof NoteScheme>;
export const NoteList = z.array(NoteScheme);
export type NoteListType = z.infer<typeof NoteList>;

export const FetchPostListSchema = z.object({
	list: NoteList,
});

export type FetchPostListResponse = z.infer<typeof FetchPostListSchema>;

export const useNotes = () => {
	/**
	 *  createNote Отправка на сервер созданных постов
	 */
	const createNote = async (data: NoteType): Promise<void> => {
		return fetch("/api/notes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then(() => undefined);
	};

	/**
	 * fetchNote - получение списка постов из сервера
	 */
	const fetchNoteList = async (): Promise<FetchPostListResponse> => {
		try {
			const response = await fetch("/api/notes", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const responseData = await response.json();
			await FetchPostListSchema.parse(responseData);
			return responseData;
		} catch (error) {
			throw new Error(`fetchNote error :${await error}`);
		}
	};
	return {
		createNote,
		fetchNoteList,
	};
};
