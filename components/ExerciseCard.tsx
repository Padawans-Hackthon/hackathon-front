import { Divider } from "@chakra-ui/react"
import Link from "next/link"

interface ExerciceCardProps {
	subject: string
	isTeacher: boolean
}

export const ExerciceCard = ({ subject, isTeacher }: ExerciceCardProps) => {
	return (
		<div className="flex flex-col gap-10 max-w-screen-md w-auto">
			<div className="flex justify-between font-poppins">
				<div className="flex flex-col gap-12">
					<Link href={`/subjects/${subject}/arquitetura`}>
						<a className="text-xl font-semibold">Arquitetura</a>
					</Link>
					<div className="flex flex-col gap-1">
						<p>
							<strong>Adicionado: </strong> dd/mm/aa
						</p>
						<p>
							<strong>Data de entrega: </strong>dd/mm/aa
						</p>
					</div>
				</div>
				{!isTeacher && (
					<div className="flex flex-col justify-between">
						<i className="text-green-400">Entregue</i>
						<p className="text-gray-400">Faltam 10 dias</p>
					</div>
				)}
			</div>
			<Divider borderWidth="1px" borderColor="blackAlpha.600" />
		</div>
	)
}
