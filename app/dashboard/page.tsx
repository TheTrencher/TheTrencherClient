"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createUserAgent, getUserAgentStatus, triggerTradeSimulation } from "@/services/api"

export default function DashboardPage() {
  const [userAgent, setUserAgent] = useState<any>(null)
  const [lastSimulatedPrice, setLastSimulatedPrice] = useState<number | null>(null)
  interface Trade {
    tradeId: string;
    executedPrice: number;
    timestamp: string;
    action: string;
  }
  interface TradeResult {
    userAgentId: string;
    trade: Trade;
  }
  const [tradeHistory, setTradeHistory] = useState<TradeResult[]>([])
  const [isSimulating, setIsSimulating] = useState(false)

  // On initial load: retrieve from localStorage or create a new user agent
  useEffect(() => {
    const storedUser = localStorage.getItem("userAgent")
    if (storedUser) {
      setUserAgent(JSON.parse(storedUser))
    } else {
      const setupUserAgent = async () => {
        try {
          const res = await createUserAgent("user23")
          const newUser = res.data.userAgent;
          setUserAgent(newUser)
          localStorage.setItem("userAgent", JSON.stringify(newUser));
        } catch (error) {
          console.error("Error creating user agent", error)
        }
      }
      setupUserAgent()
    }
  }, [])

  // Trigger simulation using the API
  const handleSimulateTrade = async () => {
    if (!userAgent) return;
    setIsSimulating(true)
    try {
      const simRes = await triggerTradeSimulation()
      // Expect: { price: number, tradeResults: [...] }
      setLastSimulatedPrice(simRes.data.price)
      setTradeHistory(simRes.data.tradeResults)

      // Refresh the user agent status (if needed)
      const statusRes = await getUserAgentStatus(userAgent.id)
      setUserAgent(statusRes.data)
    } catch (error) {
      console.error("Simulation error", error)
    } finally {
      setIsSimulating(false)
    }
  }

  return (
    <div className="py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Agent Summary */}
        <Card>
          <CardHeader>
            <CardTitle>User Agent Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {userAgent ? (
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="font-medium">Agent ID</dt>
                  <dd>{userAgent.id}</dd>
                </div>
                <div>
                  <dt className="font-medium">Username</dt>
                  <dd>{userAgent.username}</dd>
                </div>
                <div>
                  <dt className="font-medium">Risk Profile</dt>
                  <dd>{userAgent.riskProfile ? userAgent.riskProfile.threshold : "Not set"}</dd>
                </div>
                <div>
                  <dt className="font-medium">Status</dt>
                  <dd className="text-green-600 font-semibold">{userAgent.status}</dd>
                </div>
              </dl>
            ) : (
              <p>Loading user agent details...</p>
            )}
          </CardContent>
        </Card>

        {/* Trade Simulation Section */}
        <Card>
          <CardHeader>
            <CardTitle>Trade Simulation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleSimulateTrade} disabled={isSimulating}>
              {isSimulating ? "Simulating..." : "Trigger Trade Simulation"}
            </Button>
            {typeof lastSimulatedPrice === 'number' && tradeHistory.length > 0 && (
              <p>
                Last trade executed: {tradeHistory[0].trade.action} at $
                {lastSimulatedPrice.toFixed(2)}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Trade History */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trade ID</TableHead>
                <TableHead>Execution Time</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Executed Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tradeHistory.map((result) => {
                const trade = result.trade;
                return (
                  <TableRow key={trade.tradeId}>
                    <TableCell>{trade.tradeId}</TableCell>
                    <TableCell>{trade.timestamp ? new Date(trade.timestamp).toLocaleString() : "N/A"}</TableCell>
                    <TableCell>{trade.action}</TableCell>
                    <TableCell>
                      ${typeof trade.executedPrice === 'number' ? trade.executedPrice.toFixed(2) : "N/A"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

