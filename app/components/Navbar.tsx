'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit';

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ConnectWalletModal from './ConnectWallet-Modal'
const Navbar = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const connectButtonRef = useRef<HTMLButtonElement|null>(null)
  return (
    <header style={{backgroundColor:"var(--background"}}className='container mx-auto p-4 flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <div className='w-8 h-8 bg-white rounded'></div>
        <Link href="/" className='font-semibold text-lg text-[#EACA91]'>Edugram</Link>
      </div>
      <nav className='flex gap-6 text-white items-center'>
        
        <Link href="/" className='font-semibold'>Home</Link>
        <Link href="/explore" className='font-semibold'>Explore</Link>
        <Link href={`http://localhost:3300/auth/google`} className='font-semibold'>
          Login with Google
        </Link>
        {/* <button
          ref={connectButtonRef}
          onClick={() => setIsWalletModalOpen(true)}
          className='bg-[#EACA91] font-semibold text-black px-4 py-2 rounded-2xl'
        
        >
          Connect Wallet
        </button> */}
        <ConnectButton />
      </nav>

      <ConnectWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        buttonRef={connectButtonRef}
      />
    </header>
  )
}

export default Navbar