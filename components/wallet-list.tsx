"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Eye, EyeOff } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Wallet {
  id: string
  wallet_name: string
  wallet_type: string
  seed_phrase?: string
  pin_code?: string
  phrase_length?: number
  created_at: string
}

export function WalletList() {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [loading, setLoading] = useState(true)
  const [showSensitiveData, setShowSensitiveData] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetchWallets()
  }, [])

  const fetchWallets = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("wallets").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setWallets(data || [])
    } catch (error) {
      console.error("Error fetching wallets:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteWallet = async (id: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase.from("wallets").delete().eq("id", id)

      if (error) throw error
      setWallets(wallets.filter((wallet) => wallet.id !== id))
    } catch (error) {
      console.error("Error deleting wallet:", error)
    }
  }

  const toggleSensitiveData = (walletId: string) => {
    setShowSensitiveData((prev) => ({
      ...prev,
      [walletId]: !prev[walletId],
    }))
  }

  const maskSeedPhrase = (phrase: string) => {
    const words = phrase.split(" ")
    return words.map((word, index) => (index < 3 ? word : "***")).join(" ")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading wallets...</div>
      </div>
    )
  }

  if (wallets.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500 mb-4">No wallets connected yet</p>
        <p className="text-sm text-gray-400">Click anywhere on the page to connect your first wallet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Connected Wallets</h2>
      {wallets.map((wallet) => (
        <Card key={wallet.id} className="relative">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CardTitle className="text-lg">{wallet.wallet_name}</CardTitle>
                <Badge variant={wallet.wallet_type === "seed_phrase" ? "default" : "secondary"}>
                  {wallet.wallet_type === "seed_phrase" ? "Seed Phrase" : "PIN"}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteWallet(wallet.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {wallet.wallet_type === "seed_phrase" && wallet.seed_phrase && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Recovery Phrase ({wallet.phrase_length} words)
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSensitiveData(wallet.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {showSensitiveData[wallet.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm">
                    {showSensitiveData[wallet.id] ? wallet.seed_phrase : maskSeedPhrase(wallet.seed_phrase)}
                  </div>
                </div>
              )}

              {wallet.wallet_type === "pin" && wallet.pin_code && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">PIN Code</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSensitiveData(wallet.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {showSensitiveData[wallet.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm text-center tracking-widest">
                    {showSensitiveData[wallet.id] ? wallet.pin_code : "••••••••".slice(0, wallet.pin_code.length)}
                  </div>
                </div>
              )}

              <div className="text-xs text-gray-500">
                Connected on{" "}
                {new Date(wallet.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
