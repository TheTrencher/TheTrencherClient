import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, User, Activity, SlidersHorizontal, Lock, Users, BarChart2, Cpu, Layers } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
        <div className="container mx-auto text-center px-4 md:px-6">
          <h1 className="text-5xl font-bold mb-4">Welcome to TheTrencher</h1>
          <p className="text-xl mb-6">Decentralized, AI-driven onchain trading on Arbitrum</p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Experience the future of trading with our advanced AI agents, automated simulations, and comprehensive
            risk profiling.
          </p>
          <Button asChild size="lg" className="font-semibold">
            <Link href="/dashboard">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Overview */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Key Features
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <User className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold">Personalized Onchain Trading Agents</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Every new user is assigned a dedicated AI agent that manages their funds, executes trades, and adapts strategies based on individual risk profiles.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Activity className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold">Real-Time Data Integration</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our advanced feeder engines continuously aggregate live market data, onchain events, and news updates to ensure your agent acts on the most current information.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <SlidersHorizontal className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold">Customizable Risk Management</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Set your own risk tolerance and trading preferences. Our system tailors trading strategies to balance profit potential with security, aligning with your unique investment style.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Lock className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold">Automated, Secure Trade Execution</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                User agents execute trades seamlessly across multiple decentralized exchanges using secure, audited smart contracts, ensuring reliable and transparent onchain operations.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold">Interactive Community Insights</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Engage with other users in our integrated forum. Share strategies, view real-time sentiment analysis, and contribute to the collective intelligence that shapes your trading decisions.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <BarChart2 className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold">Transparent Performance Dashboards</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Monitor your agent's performance with detailed real-time dashboards, complete with execution logs and audit trails, so you're always in the know about your investments.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Cpu className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold">Backtesting & Simulation Tools</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Test and optimize your strategies using historical market data. Our simulation tools help you fine-tune your approach before committing real funds.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Layers className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold">Modular & Scalable Architecture</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Designed to grow with you, our platform supports multiple blockchain ecosystems and is continuously updated with new features to keep you ahead in the dynamic crypto market.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

