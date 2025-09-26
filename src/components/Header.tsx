"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Instagram, Phone, NetworkIcon, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href={'/'} className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Image src={'/favicon.ico'} width={40} height={40} className="rounded-lg w-full h-full" alt="Logo da empresa"/>
            </div>
            <h1 className="text-white text-2xl font-bold hidden md:block">marketilize</h1>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="https://marketilize.com.br/" target="_blank">
              <Button
                variant="secondary"
                className="bg-blue-500 text-white hover:bg-blue-600 font-semibold px-6 shadow-md transition-all duration-500 hover:shadow-lg flex items-center space-x-2"
              >
                <NetworkIcon size={20}/>
                <span>Site MK</span>
              </Button>
            </Link>

            {/* <Link href="https://instagram.com/seuperfil" target="_blank">
              <Button
                variant="secondary"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-semibold px-6 shadow-md transition-all duration-500 hover:shadow-lg flex items-center space-x-2"
              >
                <Instagram size={20}/>
                <span>Instagram</span>
              </Button>
            </Link> */}

            <Link href="https://wa.me/5511999999999" target="_blank">
              <Button
                variant="secondary"
                className="bg-green-500 text-white hover:bg-green-600 font-semibold px-6 shadow-md transition-all duration-500 hover:shadow-lg flex items-center space-x-2"
              >
                <Phone size={20}/>
                <span>WhatsApp</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-gray-900 rounded-lg p-4 animate-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col space-y-3">
              <Link 
                href="https://instagram.com/seuperfil" 
                target="_blank"
                className="w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button
                  variant="secondary"
                  className="w-full justify-start bg-blue-500 text-white hover:bg-blue-600 font-semibold px-6 py-3 shadow-md transition-all duration-200 flex items-center space-x-3"
                >
                  <NetworkIcon size={20}/>
                  <span>Site MK</span>
                </Button>
              </Link>

              <Link 
                href="https://instagram.com/seuperfil" 
                target="_blank"
                className="w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button
                  variant="secondary"
                  className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-semibold px-6 py-3 shadow-md transition-all duration-200 flex items-center space-x-3"
                >
                  <Instagram size={20}/>
                  <span>Instagram</span>
                </Button>
              </Link>

              <Link 
                href="https://wa.me/5511999999999" 
                target="_blank"
                className="w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button
                  variant="secondary"
                  className="w-full justify-start bg-green-500 text-white hover:bg-green-600 font-semibold px-6 py-3 shadow-md transition-all duration-200 flex items-center space-x-3"
                >
                  <Phone size={20}/>
                  <span>WhatsApp</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}