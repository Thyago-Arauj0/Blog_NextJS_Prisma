import logoutAction from "../(auth)/(logout)/logoutAction"
import Form from "next/form"
import { auth } from "../../../auth"
import { redirect } from "next/navigation"

export default async function Dashboard(){
  const session = await auth()
  const userName = session?.user?.name;

  if(!session){
    redirect("/")
  }

  return(
    <>
    <h1>dashboard</h1>
    <h2>usuario: {userName}</h2>
    <Form action={logoutAction ?? 'Sem nome'}>
     <button className="bg-red-800 text-white p-2 rounded-3">Sair</button>
    </Form>
    </>
  )
}