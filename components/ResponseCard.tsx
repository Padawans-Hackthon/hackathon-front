import { BsPerson, BsChatRight } from "react-icons/bs"
import { ImImages } from "react-icons/im"
import { BiHappyAlt } from "react-icons/bi"
import { TbArrowBigTop, TbArrowBigDown } from "react-icons/tb"
import { BsCircle } from "react-icons/bs"
import { FaCheckCircle } from "react-icons/fa"

import { Divider } from "@chakra-ui/react"
import { useState } from "react"

export interface ResponseCardProps {
	subject?: string
	question: string
	likes?: number
	user: string
	sk?: string
	pk?: string
	title?: string
	isTeacher?: boolean
}

export const ResponseCard = ({ question, user, subject, isTeacher }: ResponseCardProps) => {
	const [isClosed, setIsClosed] = useState(false)

	return (
		<div className="box-content">
			<div className="flex justify-center mt-4 font-poppins">
				<div className="bg-gray-200 rounded-full relative top-4 left-0 w-14 h-14 flex justify-center items-center">
					<BsPerson size={36} />
				</div>
				<div className="w-[80%] ml-4">
					<div className="flex justify-between">
						<div>
							<p className="font-bold text-3xl mt-6">{user}</p>
							<p className="text-xl mt-4">{question}</p>
							<div className="flex gap-2 mt-4 items-center">
								<BsChatRight size={32} />
								<p className="text-lg">0</p>
							</div>
						</div>
						<div className="flex gap-3">
							<p className="text-gray-600">{subject}</p>
							<div className="flex flex-col gap-3 mt-12">
								<TbArrowBigTop size={24} className="text-blue-500 cursor-pointer" />
								<TbArrowBigDown size={24} className="text-red-500 cursor-pointer" />
								{isTeacher && !isClosed ? (
									<FaCheckCircle
										size={24}
										onClick={() => setIsClosed(!isClosed)}
										className="cursor-pointer text-green-400"
									/>
								) : (
									<BsCircle
										size={24}
										onClick={() => setIsClosed(!isClosed)}
										className="cursor-pointer"
									/>
								)}
							</div>
						</div>
					</div>
					<input
						type="text"
						className="p-3 bg-[#CFCFCF] w-full rounded-lg mt-8"
						placeholder="Digite sua resposta aqui"
					/>
					<div className="flex justify-center flex-1 w-full mt-6">
						<div className="flex justify-between flex-1 items-center">
							<div className="flex gap-3">
								<div className="p-3 rounded-full bg-[#009F83] cursor-pointer hover:opacity-90">
									<ImImages size={12} className="text-white" />
								</div>
								<div className="p-3 rounded-full bg-[#009F83] cursor-pointer hover:opacity-90">
									<BiHappyAlt size={14} className="text-white" />
								</div>
							</div>
							<button className="bg-[#009F83] px-10 py-2 text-white font-semibold rounded-lg text-xl hover:opacity-90">
								Publicar
							</button>
						</div>
					</div>
					{/* <div className="mt-12 flex justify-between">
						<div className="flex flex-col gap-6">
							<div className="flex gap-2 items-center">
								<div className="bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center">
									<BsPerson size={24} />
								</div>
								<div className="font-bold">Thaynara Damazio</div>
							</div>
							<p className="line-clamp-4">
								2 = 010, porque o sistema binário utiliza 2 algarismos: 0 e 1. Dessa
								forma o número 0 nesse sistema seria 0, o número 1 continuaria sendo
								1, mas o número que é escrito como 2 na nossa base decimal, na base
								binária seria representado por 10.
							</p>
						</div>
						<div className="flex flex-col gap-3">
							<TbArrowBigTop size={24} className="text-blue-500 cursor-pointer" />
							<TbArrowBigDown size={24} className="text-red-500 cursor-pointer" />
						</div>
					</div> */}
					<Divider borderWidth="2px" className="mt-10" />
				</div>
			</div>
		</div>
	)
}
