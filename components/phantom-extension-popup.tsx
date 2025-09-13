"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface PhantomExtensionPopupProps {
  isOpen: boolean
  onClose: () => void
  onConnect: () => void
}

export function PhantomExtensionPopup({ isOpen, onClose, onConnect }: PhantomExtensionPopupProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)
    // Simulate extension connection
    setTimeout(() => {
      onConnect()
      setIsConnecting(false)
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h3 className="font-semibold">Import wallet</h3>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Enter your wallet's 12-word recovery phrase. You can import any Ethereum, Solana, or Bitcoin recovery
              phrase.
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <textarea
                placeholder="Recovery phrase"
                className="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none text-sm"
                disabled={isConnecting}
              />
            </div>

            <Button variant="link" className="text-blue-600 text-sm p-0 h-auto">
              Where can I find it?
            </Button>
          </div>

          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3"
          >
            {isConnecting ? "Connecting..." : "Import wallet"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
