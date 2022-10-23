import { ExerciceCard } from "../../../components/ExerciseCard"

import { AiOutlinePoweroff, AiOutlineMenu, AiOutlineHome } from "react-icons/ai"
import { MdOutlinePeopleAlt } from "react-icons/md"
import { BsPerson } from "react-icons/bs"
import { GoBook } from "react-icons/go"
import { parseCookies } from "nookies"
import jwt_decode from "jwt-decode"

import Image from "next/image"

import { useRouter } from "next/router"

import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
} from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { userProps } from "../../index"

const Subjects = () => {
	const { asPath } = useRouter()
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [subjects, setSubjects] = useState<string[]>([])
	const [isTeacher, setIsTeacher] = useState(false)

	const { ["loginauth.token"]: token } = parseCookies()
	const userData: userProps = jwt_decode(token)

	const thisSubjectTillBar = asPath.substring(asPath.indexOf("/") + 1)
	const thisSubject = thisSubjectTillBar.substring(thisSubjectTillBar.indexOf("/") + 1)

	useEffect(() => {
		setSubjects(userData.user.teacher[0].subject)

		setIsTeacher(userData.user.student.permissionType === "teacher")
	}, [])

	return (
		<>
			<div className="flex w-screen h-screen font-poppins">
				<div className="bg-black bg-opacity-80 h-[10vh] relative top-0"></div>
				<div className="flex gap-4 absolute top-3 left-4 items-center font-poppins">
					<AiOutlineMenu
						onClick={onOpen}
						className="sm:text-white cursor-pointer"
						size={32}
					/>
					<p className="text-white text-xl">{thisSubject}</p>
				</div>
				<div className="sm:flex-1 sm:h-screen bg-gradient-to-b from-[#04AF91] to-[#001D18] sm:w-[30%] hidden sm:flex">
					<div className=" bg-[url('/circles-subject.svg')] bg-cover flex-1 h-full">
						<div className="text-white flex flex-col gap-12 items-center">
							<div className="flex flex-col gap-4 items-center mt-48">
								<div className="w-[8vw] h-[8vw] bg-gray-200 rounded-full text-black flex justify-center items-center">
									<BsPerson size={100}/>
								</div>
								<p className="text-lg">{ userData.user.teacher[0].name }</p>
							</div>
							{isTeacher ? (
								<div className="flex flex-col gap-6 w-full items-center">
									<Link href="/forum">
										<a className="bg-white rounded-lg text-black w-[60%] py-3 text-center text-xl font-semibold">
											Fórum
										</a>
									</Link>
									<div className="bg-white rounded-lg text-black w-[60%] py-3 text-center text-xl font-semibold">
											+ Adicionar exercício
									</div>
								</div>
							) : (
								<div className="flex flex-col gap-2 items-center">
									<p className="font-bold">EMAIL</p>
									<p>joaofalasozinho@gmail.com</p>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="sm:w-[70%] flex flex-col sm:block">
					<p className="mt-44 sm:ml-28 text-[#2DAA94] sm:text-7xl font-semibold font-poppins text-5xl">
						Exercícios
					</p>
					<div className="mt-20 flex flex-col gap-16 sm:ml-28 overflow-y-scroll max-h-[60vh]">
						<ExerciceCard subject={thisSubject} isTeacher={isTeacher} />
						<ExerciceCard subject={thisSubject} isTeacher={isTeacher} />
						<ExerciceCard subject={thisSubject} isTeacher={isTeacher} />
						<ExerciceCard subject={thisSubject} isTeacher={isTeacher} />
					</div>
				</div>
			</div>
			<Drawer isOpen={isOpen} placement="left" onClose={onClose} size="md">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton className="text-white" />

					<DrawerBody className="bg-black bg-opacity-90">
						<div className="mt-12 ml-6 flex flex-col gap-6">
							<div className="flex gap-3 items-center">
								<AiOutlineHome size={32} className="text-white" />
								<Link href="/">
									<a
										className="text-white text-xl font-poppins"
										style={{ color: asPath === "/" ? "#00AA96" : "white" }}
									>
										Home
									</a>
								</Link>
							</div>
							<div className="flex gap-3 items-center">
								<MdOutlinePeopleAlt size={32} className="text-white" />
								<Link href="/">
									<a
										className="text-white text-xl font-poppins"
										style={{
											color: asPath === "/account" ? "#00AA96" : "white",
										}}
									>
										Perfil
									</a>
								</Link>
							</div>
							<div className="flex gap-3 items-center text-white">
								<GoBook size={32} />
								<p className="text-white text-xl font-poppins">Disciplinas</p>
							</div>
							<div className="max-h-[25vh] overflow-y-scroll flex flex-col gap-6 text-white text-xl font-poppins ml-4 scrollbar scrollbar-thumb-gray-800 scrollbar-track-gray-600">
								{subjects.map((e) => (
									<Link key={e} href={`/subjects/${e}`}>
										<a>{e}</a>
									</Link>
								))}
							</div>
						</div>
					</DrawerBody>

					<DrawerFooter className="bg-black bg-opacity-90 px-4 flex items-start">
						<div className="flex flex-col flex-1 gap-4">
							<div className="flex gap-3 items-center">
								<Image src="/logo.svg" alt="logo" width={32} height={32} />
								<Link href="/">
									<a
										className="text-white text-xl font-poppins"
										style={{ color: asPath === "/about" ? "#00AA96" : "white" }}
									>
										Sobre
									</a>
								</Link>
							</div>
							<div className="flex gap-2 items-center text-white flex-1 cursor-pointer">
								<AiOutlinePoweroff size={32} />
								<p className="text-xl font-poppins">Sair</p>
							</div>
						</div>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default Subjects

export async function getServerSideProps(ctx?: any) {
	const { ["loginauth.token"]: token } = parseCookies(ctx)

	if (token) {
		return {
			props: {
				token,
			},
		}
	}

	return {
		redirect: {
			permanent: false,
			destination: "/login",
		},
	}
}
