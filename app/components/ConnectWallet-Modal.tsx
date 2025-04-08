"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { useMediaQuery } from "../hooks/use-media-query"
interface WalletOption {
  id: string
  name: string
  icon: string
  color: string
}

interface ConnectWalletModalProps {
  isOpen: boolean
  onClose: () => void
  buttonRef: React.RefObject<HTMLButtonElement | null>
}

export default function ConnectWalletModal({ isOpen, onClose, buttonRef }: ConnectWalletModalProps) {
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const modalRef = useRef<HTMLDivElement>(null)

  // Check if screen is mobile
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Wallet options with alternating types (Metamask and others)
  const walletOptions: WalletOption[] = [
    {
      id: "metamask",
      name: "MetaMask",
      icon: "/placeholder.svg?height=24&width=24",
      color: "#F6851B",
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: "/placeholder.svg?height=24&width=24",
      color: "#0052FF",
    },
    {
      id: "metamask-institutional",
      name: "MetaMask Institutional",
      icon: "/placeholder.svg?height=24&width=24",
      color: "#F6851B",
    },
    {
      id: "wallet-connect",
      name: "WalletConnect",
      icon: "/placeholder.svg?height=24&width=24",
      color: "#3B99FC",
    },
    {
      id: "metamask-mobile",
      name: "MetaMask Mobile",
      icon: "/placeholder.svg?height=24&width=24",
      color: "#F6851B",
    },
    {
      id: "trust-wallet",
      name: "Trust Wallet",
      icon: "/placeholder.svg?height=24&width=24",
      color: "#3375BB",
    },
    {
      id: "metamask-snap",
      name: "MetaMask Snap",
      icon: "/placeholder.svg?height=24&width=24",
      color: "#F6851B",
    },
    {
      id: "phantom",
      name: "Phantom",
      icon: "/placeholder.svg?height=24&width=24",
      color: "#4B49C6",
    },
  ]

  // Calculate position based on button location
  useEffect(() => {
    if (!isOpen || !buttonRef.current || !mounted) return

    const updatePosition = () => {
      if (!buttonRef.current) return

      const buttonRect = buttonRef.current.getBoundingClientRect()
      const modalWidth = modalRef.current?.offsetWidth || 400

      // For desktop, position below button
      if (!isMobile) {
        setPosition({
          top: buttonRect.bottom + window.scrollY,
          left: Math.max(0, buttonRect.left + window.scrollX + buttonRect.width / 2 - modalWidth / 2),
        })
      } else {
        // For mobile, center it (position will be ignored due to CSS)
        setPosition({ top: 0, left: 0 })
      }
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)

    return () => {
      window.removeEventListener("resize", updatePosition)
    }
  }, [isOpen, buttonRef, isMobile, mounted])

  // Handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Handle client-side rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop - full screen on all devices */}
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal container */}
      <div
        ref={modalRef}
        className={`fixed z-50 bg-[#1F3B5B] rounded-lg shadow-lg overflow-hidden 
          ${isMobile ? "inset-x-4 mx-auto top-1/2 -translate-y-1/2 max-w-md" : "w-[400px]"}`}
        style={!isMobile ? { top: `${position.top}px`, left: `${position.left}px` } : {}}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[rgb(42,73,128)]">
          <h2 className="text-xl font-semibold text-white">Connect Wallet</h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wallet options */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-2">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.id}
                className="flex items-center w-full p-3 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                onClick={() => {
                  console.log(`Connecting to ${wallet.name}...`)
                  // Sambungin connect wallet ke sini
                }}
              >
                <div
                  className="w-8 h-8 rounded flex items-center justify-center mr-3"
                  style={{ backgroundColor: wallet.color }}
                >
                  <Image src={wallet.icon || "/placeholder.svg"} alt={wallet.name} width={24} height={24} />
                </div>
                <span className="text-white">{wallet.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

