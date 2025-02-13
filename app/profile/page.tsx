"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { getUserAgentStatus, updateRiskProfile } from "@/services/api"

export default function ProfilePage() {
  const router = useRouter()
  const [userAgent, setUserAgent] = useState<any>(null)
  const [riskThreshold, setRiskThreshold] = useState("5")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch user agent details on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("userAgent")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      // Use the stored user's id to fetch details
      getUserAgentStatus(user.id)
        .then(res => setUserAgent(res.data))
        .catch(error => console.error("Failed to fetch user agent", error))
    } else {
      console.error("No user agent found in localStorage")
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!userAgent) return;
    setIsSubmitting(true)
    try {
      // Update the user's risk profile via the API
      await updateRiskProfile(userAgent.id, { threshold: Number(riskThreshold) })
      // Refresh the user agent details after update
      const res = await getUserAgentStatus(userAgent.id)
      setUserAgent(res.data)

      toast({
        title: "Profile Updated",
        description: "Your risk profile has been successfully updated.",
      })
    } catch (error) {
      console.error("Error updating profile", error)
      toast({
        title: "Error",
        description: "Failed to update risk profile.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex-1 py-8 px-4 md:px-6">
      <Button variant="ghost" className="mb-4" onClick={() => router.push("/dashboard")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>View and update your user details and risk profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="user-id">User ID</Label>
              <Input id="user-id" value={userAgent ? userAgent.id : "Loading..."} disabled />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={userAgent ? userAgent.username : "Loading..."} disabled />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="risk-threshold">Risk Threshold</Label>
                <Input
                  id="risk-threshold"
                  type="number"
                  min="1"
                  max="10"
                  value={riskThreshold}
                  onChange={(e) => setRiskThreshold(e.target.value)}
                  required
                />
                <p className="text-sm text-gray-500">Enter a value between 1 (low risk) and 10 (high risk)</p>
              </div>
              <Button type="submit" className="mt-4 w-full" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Risk Profile"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

