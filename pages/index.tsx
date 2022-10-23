import Image from "next/image"
import { parseCookies, destroyCookie } from "nookies"

import { useDisclosure } from "@chakra-ui/react"
import { AiOutlinePoweroff, AiOutlineMenu, AiOutlineHome } from "react-icons/ai"
import { SubjectCard } from "../components/SubjectCard"
import Link from "next/link"
import { useRouter } from "next/router"
import { BsPerson } from "react-icons/bs"

import jwt_decode from "jwt-decode"
import { MdOutlinePeopleAlt } from "react-icons/md"

import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

type TeacherProps = {
	name: string
	subject: string[]
}

export interface userProps {
	user: {
		student: {
			name: string
			permissionType: "student" | "teacher"
		}
		teacher: TeacherProps[]
	}
}

const Home = ({ token }: any) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const { asPath, reload } = useRouter()
	const userData: userProps = jwt_decode(token)
	const [isTeacher, setIsTeacher] = useState(false)


	function signOut() {
		destroyCookie(null, "loginauth.token")
		reload()
	}
	
	useEffect(() => {
		setIsTeacher(userData.user.student.permissionType === "teacher")
	}, [])

	return (
		<>
			<header className="h-[40vh] bg-gradient-to-r from-[#55AF9A] to-[#000000] flex-1">
				<div className="h-full flex-1 bg-[url('/circles-index.svg')] bg-cover">
					<div className="flex-1 h-[25%] bg-black bg-opacity-70 z-20 flex items-center justify-center">
						<Image src="/logo.svg" alt="logo" width={80} height={80} />
					</div>

					<div className="flex-1 flex justify-center items-center mt-16">
						<div className="flex flex-col gap-3 items-center">
							<div className="bg-gray-200 w-[6vw] h-[6vw] rounded-full flex justify-center items-center">
								<BsPerson size={56}/>
							</div>
							<p className="text-gray-200 font-semibold font-poppins text-xl">
								{ userData.user.student.name}
							</p>
						</div>
					</div>
					<AiOutlinePoweroff
						className="absolute right-3 top-7 text-white cursor-pointer"
						size={40}
						onClick={signOut}
					/>
					<div className="absolute left-3 top-7 text-white flex gap-3 items-center">
						<AiOutlineMenu size={40} onClick={onOpen} className="cursor-pointer" />
						<Link href="/">
							<a className="text-2xl">HOME</a>
						</Link>
					</div>
				</div>
			</header>
			<div className="max-w-screen-xl mt-24 m-auto">
				<p className="text-3xl font-poppins">Disciplina</p>
				<div className="mt-4 flex justify-evenly flex-wrap">
					{userData.user.teacher[0].subject.map((e) => (
						<SubjectCard color="#C64736" subject={e} teacher={userData.user.teacher[0].name} key={e} isTeacher={isTeacher}/>
					))}
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
								<Link href="/forum">
									<a
										className="text-white text-xl font-poppins"
										style={{
											color: asPath === "/forum" ? "#00AA96" : "white",
										}}
									>
										Fórum
									</a>
								</Link>
							</div>
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
						</div>
					</DrawerBody>

					<DrawerFooter className="bg-black bg-opacity-90 px-4 flex items-start">
						<div
							className="flex gap-2 items-center text-white flex-1 cursor-pointer"
							onClick={signOut}
						>
							<AiOutlinePoweroff size={32} />
							<p className="text-xl font-poppins">Sair</p>
						</div>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default Home

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
