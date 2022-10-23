import Link from "next/link"

interface SubjectCardProps {
	color: string
	teacher: string
	subject: string
}

export const SubjectCard = ({ color, teacher, subject }: SubjectCardProps) => {
	return (
		<Link href={`/subjects/${subject}`}>
			<a className="flex flex-col gap-3 mt-12 w-60 mx-20 hover:opacity-90">
				<div
					className={`py-4 flex flex-col gap-2 items-center rounded-lg`}
					style={{ backgroundColor: color }}
				>
					<div className="bg-gray-300 rounded-full w-20 h-20"></div>
					<p className="font-poppins">{teacher}</p>
				</div>
				<p className="font-bold text-lg font-poppins text-center">{subject}</p>
			</a>
		</Link>
	)
}
