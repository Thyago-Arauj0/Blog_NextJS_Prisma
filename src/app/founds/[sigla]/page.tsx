import Founds from "./founds"

interface Props {
  params: { sigla: string }
}

export default function Page({ params }: Props) {
  const query = decodeURIComponent(params.sigla)
  
  return <Founds query={query} />
}
