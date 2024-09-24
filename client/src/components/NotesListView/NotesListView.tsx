import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { useNotes, FetchPostListResponse } from "../API/Hooks/useNotes";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../API/QueryClient/QueryClient";
import { Loader } from "../Loader";
import { Button } from "../Button";
import { FC } from "react";

export const NotesListView: FC = () => {
	const { fetchNoteList } = useNotes();
	const notesQuery = useQuery<FetchPostListResponse>(
		{
			queryFn: () => fetchNoteList(),
			queryKey: ["notes"],
		},
		queryClient,
	);

	switch (notesQuery.status) {
		case "error":
			return (
				<Button
					isLoading={notesQuery.isPending}
					onClick={() => notesQuery.refetch()}
				>
					Повторить запрос
				</Button>
			);
		case "pending":
			return <Loader />;
	}
	return (
		<ul className="note-list-view">
			{notesQuery?.data.list.map((item) => (
				<li key={item.id}>
					<NoteView {...item} />
				</li>
			))}
		</ul>
	);
};
