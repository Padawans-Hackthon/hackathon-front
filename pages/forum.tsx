import Image from "next/image"
import { MenuDrawer } from "../components/MenuDrawer"
import { AiOutlinePoweroff } from "react-icons/ai"
import { ImImages } from "react-icons/im"
import { BiHappyAlt } from "react-icons/bi"

import { destroyCookie, parseCookies } from "nookies"
import { useRouter } from "next/router"

import { Divider } from "@chakra-ui/react"
import { ResponseCard, ResponseCardProps } from "../components/ResponseCard"
import { useForm } from "react-hook-form"
import { api } from "../assets/api"
import { userProps } from "."
import jwt_decode from "jwt-decode"
import { useEffect, useState } from "react"
import { getPosts } from "../assets/useCases/getPosts"

import { useToast } from "@chakra-ui/react"
import { DropdownSubject } from "../components/DropdownSubject"

interface ForumProps {
	token: string
	posts: ResponseCardProps[]
}

const Forum = ({ token, posts }: ForumProps) => {
	const toast = useToast()
	const userData: userProps = jwt_decode(token)
	const [isTeacher, setIsTeacher] = useState(false)
	const subjects = userData.user.teacher[0].subject
	const [selected, setSelected] = useState(subjects[0])

	const { handleSubmit, register, reset } = useForm()
	const { reload } = useRouter()

	function signOut() {
		destroyCookie(null, "loginauth.token")
		reload()
	}

	async function onSubmit(formData: any) {
		try {
			await api.post("/forum", {
				user: userData.user.student.name,
				title: formData.title,
				question: formData.question,
				subject: selected,
				sk: formData.title
			})

			toast({
				title: "Criado",
				duration: 4000,
				isClosable: true,
				status: "success"
			})
		} catch {
			toast({
				title: "Algo deu errado",
				duration: 4000,
				isClosable: true,
				status: "error"
			})
		}
		reset()
	}

	useEffect(() => {
		setIsTeacher(userData.user.student.permissionType === "teacher")
	}, [])

	return (
		<div className="bg-gradient-to-b from-[#001A15] to-[#00988F] h-screen overflow-y-scroll">
			<div className="bg-[url('/circles-forum.svg')] flex-1 h-full bg-cover">
				<header className="bg-black bg-opacity-90 h-[10vh] flex justify-center">
					<div className="flex gap-1 items-center">
						<p className="text-white text-5xl font-semibold">Ask</p>
						<Image src="/chat-logo.svg" alt="logo" width={80} height={80} />
					</div>
					<MenuDrawer />
					<AiOutlinePoweroff
						size={56}
						className="absolute right-7 top-6 text-white cursor-pointer"
						onClick={signOut}
					/>
				</header>
				<div className="flex items-center flex-1 mt-16 flex-col">
					{isTeacher ? (
						<div className="flex-1 text-white text-7xl font-semibold font-poppins mb-6">
							Arquitetura
						</div>
					) : (
						<form
							className="bg-white w-[70vw] h-[40vh] rounded-3xl flex flex-col items-center gap-8 py-8"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className="bg-[#CFCFCF] h-[22%] rounded-xl w-[90%] flex items-center">
								<input
									type="text"
									className="w-[80%] p-2 text-black bg-transparent placeholder:text-gray-500 placeholder:text-xl placeholder:text-semibold outline-none"
									placeholder="Assunto"
									{...register("title")}
								/>
								<div className="h-[70%] flex items-center">
									<Divider
										orientation="vertical"
										borderWidth="1px"
										borderColor="blackAlpha.800"
									/>
								</div>
								<div className="flex flex-1 justify-center items-center">
									<DropdownSubject subjects={subjects} selected={selected} setSelected={setSelected}/>
								</div>
							</div>
							<textarea
								className="bg-[#CFCFCF] h-[46%] rounded-xl w-[90%] resize-none p-3 outline-none placeholder:text-gray-500 placeholder:text-xl placeholder:text-semibold"
								placeholder="Deixe sua dúvida aqui...."
								{...register("question")}
							></textarea>
							<div className="flex justify-center flex-1 w-full">
								<div className="flex justify-between flex-1 max-w-[90%] items-center">
									<div className="flex gap-3">
										<div className="p-3 rounded-full bg-[#009F83] cursor-pointer hover:opacity-90">
											<ImImages size={18} className="text-white" />
										</div>
										<div className="p-3 rounded-full bg-[#009F83] cursor-pointer hover:opacity-90">
											<BiHappyAlt size={20} className="text-white" />
										</div>
									</div>
									<button className="bg-[#009F83] px-12 py-2 text-white font-semibold rounded-lg text-2xl hover:opacity-90">
										Publicar
									</button>
								</div>
							</div>
						</form>
					)}
					<div className="mt-8 flex justify-center rounded-xl mb-4">
						<div className="bg-white w-[90%] rounded-xl ">
							{posts.map((e) => (
								<ResponseCard key={e.title} question={e.question} user={e.user} subject={e.subject} isTeacher={isTeacher} likes={e.likes}/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Forum

export async function getServerSideProps(ctx?: any) {
	const { ["loginauth.token"]: token } = parseCookies(ctx)
	const response = await getPosts(token)

	if (token) {
		return {
			props: {
				token,
				posts: response,
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
