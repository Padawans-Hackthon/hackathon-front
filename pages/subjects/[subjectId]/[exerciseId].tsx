import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"

import { AiOutlineFileAdd, AiOutlineArrowRight } from "react-icons/ai"

const Exercise = () => {
	const { asPath } = useRouter()

	const thisExerciseTillBar = asPath.substring(asPath.indexOf("/") + 1)
	const thisExerciseTillBar2 = thisExerciseTillBar.substring(thisExerciseTillBar.indexOf("/") + 1)
	const thisExercise = thisExerciseTillBar2.substring(thisExerciseTillBar2.indexOf("/") + 1)
	const thisSubject = thisExerciseTillBar2.substring(0, thisExerciseTillBar2.indexOf("/"))

	return (
		<div className="flex flex-1 h-screen font-poppins">
			<div className="w-[60%] py-12 flex flex-col gap-12">
				<Link href={`/subjects/${thisSubject}`}>
					<a className="text-3xl font-semibold mt-16 ml-14">{"< Voltar"}</a>
				</Link>
				<p className="text-4xl font-bold ml-24">{ thisExercise }</p>
				<div className="ml-24 flex flex-col gap-4">
					<p>
						Adicionado em: <strong>dd/mm/aa</strong>
					</p>
					<p>
						Data de entrega: <strong>dd/mm/aa</strong>
					</p>
				</div>
				<div className="ml-24">
					<p className="font-semibold text-xl">Descrição: </p>
					<div className="w-[70%] h-[10vh] bg-[#BAE4DD] mt-1 p-2">
						Nesta seleção está concentrada a decrição do exercício, assim como
						instruções e avisos pertinentes de acordo com o professor. Apenas o
						professor pode alterar esta parte.
					</div>
					<div className="w-[70%] h-[5vh] bg-[#BAE4DD] mt-5 flex gap-2 items-center p-2">
						<AiOutlineFileAdd size={32} />
						<p>Arquivo, link ou texto ou imagem inserido aqui</p>
					</div>
				</div>
				<div className="absolute bottom-10 left-24 flex gap-6 items-center">
					<u>Dúvidas com o exercício? Tire todas elas com o AskVILE</u>
					<AiOutlineArrowRight size={32} />
					<Link href="/forum">
						<a className="bg-gradient-to-br from-[#16A493] to-[#001511] py-2 px-8 rounded flex items-center justify-center">
							<p className="text-white font-semibold text-lg">Ask</p>
							<Image
								src="/chat-logo.svg"
								alt="logo do fórum"
								width={35}
								height={35}
							/>
						</a>
					</Link>
				</div>
			</div>
			<div className="bg-gradient-to-bl from-[#049F83] to-[#001511] flex-1 h-full w-[40%]">
				<div className=" bg-[url('/circles-exercise.svg')] bg-cover flex-1 h-full flex flex-col items-center justify-center gap-12">
					<p className="text-white text-5xl font-semibold">ENTREGA DE EXERÍCIO</p>
					<input type="file" className="w-[60%] rounded-lg bg-white p-2" />
				</div>
			</div>
		</div>
	)
}

export default Exercise

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
