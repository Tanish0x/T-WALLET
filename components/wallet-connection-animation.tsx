"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface WalletConnectionAnimationProps {
  isOpen: boolean
  onClose: () => void
  walletName: string
  onConnectionComplete: () => void
}

const walletLogos = {
  Ledger: {
    icon: "📱",
    color: "bg-pink-100",
    logoColor: "bg-gray-800",
  },
  "Trezor Wallet": {
    icon: "🔒",
    color: "bg-green-100",
    logoColor: "bg-green-600",
  },
  "Trust Wallet": {
    icon: "🛡️",
    color: "bg-blue-100",
    logoColor: "bg-blue-600",
  },
}

export function WalletConnectionAnimation({
  isOpen,
  onClose,
  walletName,
  onConnectionComplete,
}: WalletConnectionAnimationProps) {
  const [showLogo, setShowLogo] = useState(false)

  const walletConfig = walletLogos[walletName as keyof typeof walletLogos] || {
    icon: "🔗",
    color: "bg-gray-100",
    logoColor: "bg-gray-600",
  }

  useEffect(() => {
    if (isOpen) {
      // Show logo animation
      const logoTimer = setTimeout(() => {
        setShowLogo(true)
      }, 300)

      // Complete connection after animation
      const completeTimer = setTimeout(() => {
        onConnectionComplete()
      }, 3000)

      return () => {
        clearTimeout(logoTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [isOpen, onConnectionComplete])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-8 text-center">
        <div className="space-y-6">
          {/* Animated Logo */}
          <div className="flex justify-center">
            <div
              className={`w-20 h-20 ${walletConfig.color} rounded-2xl flex items-center justify-center transition-all duration-1000 ${showLogo ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
            >
              <div className={`w-12 h-12 ${walletConfig.logoColor} rounded-lg flex items-center justify-center`}>
                {walletName === "Ledger" && (
                  <div className="w-6 h-6 bg-white rounded grid grid-cols-2 gap-0.5">
                    <div className="bg-gray-800 rounded-sm"></div>
                    <div className="bg-gray-800 rounded-sm"></div>
                    <div className="bg-gray-800 rounded-sm"></div>
                    <div className="bg-gray-800 rounded-sm"></div>
                  </div>
                )}
                {walletName === "Trezor Wallet" && <div className="text-white text-lg">🔒</div>}
                {walletName === "Trust Wallet" && <div className="text-white text-lg">🛡️</div>}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              Connecting to{" "}
              {walletName === "Trezor Wallet" ? "Trezor Kit" : walletName === "Ledger" ? "Ledger Kit" : walletName}
            </h3>
          </div>

          {/* Powered by */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-8">
            <span>POWERED BY</span>
            <div className="bg-black text-white px-2 py-1 rounded text-xs">reown</div>
            <span>Manual Kit</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
