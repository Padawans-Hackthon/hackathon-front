import Image from "next/image"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { signIn } from "../assets/useCases/signInPost"
import { useToast } from "@chakra-ui/react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useState } from "react"
import { signInUser } from "../assets/useCases/signInUser"

import { Spinner } from "@chakra-ui/react"

interface databaseRetriveData {
	password: string
	email: string
	pk: string
}

interface databaseProps {
	data: databaseRetriveData[]
}

const Login = ({ data }: databaseProps) => {
	const toast = useToast()
	const router = useRouter()
	const { register, handleSubmit, reset } = useForm()
	const [inputVisible, setInputVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [teacherCheckBox, setTeacherCheckBox] = useState(false)

	const onSubmit = async (formData: any) => {
		setLoading(true)
		const response = await signIn(formData.registration, formData.password, formData.teacher)

		if (response?.data) {
			signInUser(response.data.token)

			router.push("/")
		} else {
			toast({
				title: "Você não tem acesso",
				status: "error",
				duration: 5000,
				isClosable: true,
			})
		}
		setLoading(false)
	}

	return (
		<div className="flex flex-1 h-screen w-screen bg-gradient-to-r from-[#55AF9A] to-[#000000]">
			<Image src="/circles.svg" alt="background circles" layout="fill" className="z-0" />
			<div className="w-[70%] flex justify-center text-white text-6xl font-poppins font-semibold flex-col z-10">
				<div className="ml-8 z-10">
					<Image src="/logo.svg" alt="logo do site" width={180} height={180} />
				</div>
				<p className="ml-16 z-10">sua vida acadêmica organizada!</p>
			</div>
			<div className="flex-1 bg-black bg-opacity-40 z-10 text-white font-poppins font-semibold">
				<div className="flex flex-col justify-center h-full gap-20">
					<p className="text-5xl text-center">Login</p>
					<form
						className="flex flex-col gap-16 items-center"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="flex flex-col gap-8 w-[70%]">
							<div className="flex flex-col gap-2">
								<label htmlFor="email">Matrícula</label>
								<input
									type="text"
									id="email"
									className="p-2 text-black outline-none rounded"
									required
									{...register("registration")}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="password">Password</label>
								<div className="bg-white flex-1 flex items-center rounded">
									<input
										type={inputVisible ? "text" : "password"}
										id="password"
										className="p-2 text-black w-[85%] outline-none rounded"
										required
										{...register("password")}
									/>
									<div className="pl-5 flex items-end">
										{inputVisible ? (
											<AiFillEye
												className="text-black"
												size={24}
												onClick={() => setInputVisible(!inputVisible)}
											/>
										) : (
											<AiFillEyeInvisible
												className="text-black"
												size={24}
												onClick={() => setInputVisible(!inputVisible)}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="py-2 flex flex-col gap-3 text-white">
							<div className="flex gap-3">
								<input type="checkbox" id="teacher" {...register("teacher")}/>
								<label htmlFor="teacher" >Professor</label>
							</div>
							<div className="flex gap-3">
								<input type="checkbox" id="student" />
								<label htmlFor="student">Estudante</label>
							</div>
						</div>
						<button className="bg-[#188578] w-60 h-14 rounded-lg text-3xl hover:opacity-90 flex items-center justify-center">
							{loading ? <Spinner /> : "Entrar"}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
