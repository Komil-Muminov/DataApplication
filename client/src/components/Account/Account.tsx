import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../API/Hooks/UseAuth";
import { Loader } from "../Loader";
import { NotesListView } from "../NotesListView";
import { UserView } from "../UserView";
import { NoteForm } from "../NoteForm";
import { AuthForm } from "../AuthForm";
import { queryClient } from "../API/QueryClient/QueryClient";
export const Account = () => {
	const { fetchMe } = useAuth();
	const queryMe = useQuery(
		{
			queryFn: () => fetchMe(),
			queryKey: ["users", "me"],
		},
		queryClient,
	);
	switch (queryMe.status) {
		case "pending":
			return <Loader />;
		case "error":
			return <AuthForm />;

		case "success":
			return (
				<>
					<NoteForm />
					<NotesListView />
					<UserView />
				</>
			);
	}
};
