import Link from "next/link"

interface SubjectCardProps {
	color: string
	teacher: string
	subject: string
	isTeacher: boolean
}

export const SubjectCard = ({ color, teacher, subject, isTeacher }: SubjectCardProps) => {
	return (
		<Link href={`/subjects/${subject}`}>
			<a className="flex flex-col gap-3 mt-12 w-60 mx-20 hover:opacity-90">
				<div
					className={`py-4 flex flex-col gap-2 items-center rounded-lg`}
					style={{ backgroundColor: isTeacher ? "" : color }}
				>
					<div
						className="rounded-full w-20 h-20"
						style={{ backgroundColor: isTeacher ? color : "#CFCFCF" }}
					></div>
					{!isTeacher && <p className="font-poppins font-semibold">{teacher}</p>}
				</div>
				<p className="font-bold text-lg font-poppins text-center">{subject}</p>
			</a>
		</Link>
	)
}
