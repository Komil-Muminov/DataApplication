import "./NoteView.css";
import { NoteType } from "../API/Hooks/useNotes";
import { FC } from "react";
const formatDate = (timestamp: number) => {
	const date = new Date(timestamp);
	return date.toLocaleString(undefined, {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

// Надо правильно типизировать пропсы )
export const NoteView: FC<NoteType> = ({ text, title }) => {
	return (
		<>
			<div className="container">
				<div className="notes__content">
					<div className="note-view">
						<div className="note-view__head">
							<p className="note-view__datetime">{formatDate(Date.now())}</p>
							<p className="note-view__title">
								{/* Заголовок */}
								{title}
							</p>
						</div>
						<p className="note-view__text">
							{text}
							{/* {`Какой-то очень большой текст`.repeat(10)} */}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
