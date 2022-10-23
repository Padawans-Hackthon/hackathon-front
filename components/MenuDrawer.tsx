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

import { AiOutlinePoweroff, AiOutlineMenu, AiOutlineHome } from "react-icons/ai"
import { MdOutlinePeopleAlt } from "react-icons/md"
import { parseCookies, destroyCookie } from "nookies"
import jwt_decode from "jwt-decode"
import { GoBook } from "react-icons/go"


import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { userProps } from "../pages"

export const MenuDrawer = () => {
	const { asPath, reload } = useRouter()
	const { isOpen, onClose, onOpen } = useDisclosure()

    const [subjects, setSubjects] = useState<[]>([])

	const thisSubjectTillBar = asPath.substring(asPath.indexOf("/") + 1)
	const thisSubject = thisSubjectTillBar.substring(thisSubjectTillBar.indexOf("/") + 1)

    function signOut() {
		destroyCookie(null, "loginauth.token")
		reload()
	}

	useEffect(() => {
	const { ["loginauth.token"]: token } = parseCookies()
	const userData: userProps = jwt_decode(token)

	setSubjects(userData.user.subject)
		
	}, [])

	return (
		<>
			<div className="absolute left-3 top-7 text-white">
				<AiOutlineMenu size={40} onClick={onOpen} className="cursor-pointer" />
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
                                <GoBook size={32}/>
                                <p className="text-white text-xl font-poppins">Disciplinas</p>
                            </div>
                            <div className="max-h-[25vh] overflow-y-scroll flex flex-col gap-6 text-white text-xl font-poppins ml-4 scrollbar scrollbar-thumb-gray-800 scrollbar-track-gray-600">
                                { subjects.map(e => (
									<Link key={e} href={`/subjects/${e}`}>
										<a>{e}</a>
									</Link>
								)) }
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
