import "./UserView.css";
import { LogoutButton } from "../LogoutButton";
import { useMe } from "../API/Hooks/useMe";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../API/QueryClient/QueryClient";
import { Loader } from "../Loader";
export const UserView = () => {
	const { getMe } = useMe();

	const getMeQuery = useQuery(
		{
			queryFn: () => getMe(),
			queryKey: ["getme"],
		},
		queryClient,
	);

	switch (getMeQuery.status) {
		case "pending":
			return <Loader />;
		case "error":
			return "";
		case "success":
			getMeQuery.data.username;
		// return getMeQuery.data.username;
	}
	const username = "Firstname Lastname";

	return (
		<div className="user-view">
			<div className="user-view__logo">
				{getMeQuery?.data?.username.slice(0, 1).toUpperCase() ||
					username?.slice(0, 1).toUpperCase()}
			</div>
			<span className="user-view__name">
				{getMeQuery?.data?.username || username}
			</span>
			<LogoutButton />
		</div>
	);
};
