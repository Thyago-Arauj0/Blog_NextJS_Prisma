import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black text-white min-w-full">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <Image src={'/favicon.ico'} width={100} height={100} alt="Logo da empresa"/>
              </div>
              <h3 className="text-2xl font-bold">marketilize</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Sua fonte confiável para estratégias de marketing digital, desenvolvimento web e crescimento de negócios
              online.
            </p>

          </div>

          {/* <div>
            <h4 className="font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Marketing Digital
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Desenvolvimento Web
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  SEO
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Redes Sociais
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div> */}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Marketilize. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}