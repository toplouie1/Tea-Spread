import { getClassAssignments, isValidUrl } from "./classesMethod";
import { Link } from "react-router-dom";
import AssignmentDrawer from "../AssignmentDrawer";
import SubmitAssignmentDrawer from "../AssignmentSubmissionDrawer";

export const handleClassSelect = async (
	classId,
	classes,
	setSelectedClass,
	setClassAssignments
) => {
	const selected = classes.find((cls) => cls.class_id === classId);
	setSelectedClass(selected);
	try {
		const assignments = await getClassAssignments(classId);
		setClassAssignments(assignments || []);
	} catch (error) {
		console.error("Error fetching class assignments:", error);
	}
};

export const getStatusMessage = (dueDate, currentDate) => {
	const timeDifference = new Date(dueDate).getTime() - currentDate.getTime();
	const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

	const dayLabel = Math.abs(dayDifference) === 1 ? "day" : "days";

	if (dayDifference > 0)
		return `${dayDifference} ${dayLabel} left until the due date.`;
	if (dayDifference < 0) return `${Math.abs(dayDifference)} ${dayLabel} late.`;
	return "Due today!";
};

export const filterUserClasses = (classes, userClass) => {
	return classes.filter((classItem) =>
		userClass.some(
			(yourClassItem) => yourClassItem.class_id === classItem.class_id
		)
	);
};

export const NoClasses = () => (
	<>
		<h2>Please join classes to view assignments</h2>
		<Link
			to="/classes"
			style={{
				color: "blue",
				textDecoration: "underline",
				cursor: "pointer",
				filter: "blur(0.5px)",
			}}
		>
			Navigate to Classes
		</Link>
	</>
);

export const AssignmentAttachments = ({ attachments }) => (
	<div className="assignment-attachments">
		<strong>Attachments:</strong>{" "}
		{isValidUrl(attachments) ? (
			<a href={attachments} target="_blank" rel="noopener noreferrer">
				{attachments}
			</a>
		) : (
			<span>{attachments}</span>
		)}
	</div>
);

export const ClassAssignments = ({
	selectedClass,
	classAssignments,
	isTeacher,
	getStatusMessage,
	currentDate,
}) => (
	<>
		<h2>{selectedClass.class_name} ~ Assignments</h2>
		{isTeacher && <AssignmentDrawer selectedClass={selectedClass} />}
		<ul className="assignment-list">
			{classAssignments.map((assignment) => (
				<li key={assignment.assignment_id} className="assignment-item">
					<div className="assignment-header">
						<strong>{assignment.title}</strong>
						<span className="due-date">
							Due: {new Date(assignment.due_date).toLocaleDateString()}
						</span>
					</div>
					<p className="assignment-description">{assignment.description}</p>
					{assignment.attachments && (
						<AssignmentAttachments attachments={assignment.attachments} />
					)}
					<div className="assignment-footer">
						<span className="due-date">
							{getStatusMessage(assignment.due_date, currentDate)}
						</span>
						{!isTeacher && (
							<SubmitAssignmentDrawer
								selectedClass={selectedClass}
								selectedAssignment={assignment}
							/>
						)}
					</div>
				</li>
			))}
		</ul>
	</>
);
