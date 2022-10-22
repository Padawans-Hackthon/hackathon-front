import Image from "next/image"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

const Login = () => {
	const router = useRouter()
	const { register, handleSubmit, reset } = useForm()

	const onSubmit = ( data: any ) => {
		console.log(data)
		reset()
	}

	return (
		<div className="flex flex-1 h-screen w-screen bg-gradient-to-r from-[#55AF9A] to-[#000000]">
			<Image src="/circles.svg" alt="background circles" layout="fill" className="z-0" />
			<div className="w-[70%] flex justify-center text-white text-6xl font-poppins font-semibold flex-col z-10">
				<div className="ml-12 z-10">
					<Image src="/logo.png" alt="logo do site" width={160} height={160} />
				</div>
				<p className="ml-16 z-10">sua vida acadêmica organizada!</p>
			</div>
			<div className="flex-1 bg-black bg-opacity-40 z-10 text-white font-poppins font-semibold">
				<div className="flex flex-col justify-center h-full gap-20">
					<p className="text-5xl text-center">Login</p>
					<form className="flex flex-col gap-16 items-center" onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-8 w-[70%]">
							<div className="flex flex-col gap-2">
								<label htmlFor="email">Email</label>
								<input type="email" id="email" className="p-2 text-black" required {...register("email")}/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="password">Password</label>
								<input type="text" id="password" className="p-2 text-black" required {...register("password")}/>
							</div>
						</div>
						<button className="bg-[#188578] px-14 py-2 rounded-lg text-3xl hover:opacity-90">
							Entrar
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
