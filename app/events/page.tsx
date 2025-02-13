"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { RefreshCcw } from "lucide-react"

// Import API method for fetching events
import { getEvents } from "@/services/api"

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshEvents = async () => {
    setIsRefreshing(true)
    try {
      const res = await getEvents()
      setEvents(res.data)
    } catch (error) {
      console.error("Failed to fetch events", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    refreshEvents()
  }, [])

  return (
    <main className="flex-1 py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events / Logs</h1>
        <Button onClick={refreshEvents} disabled={isRefreshing} variant="ghost" className="flex items-center">
          {isRefreshing ? "Refreshing..." : <RefreshCcw className="h-4 w-4" />}
        </Button>
      </div>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Events / Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Select onValueChange={setFilter} defaultValue={filter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="price_update">Price Updates</SelectItem>
                <SelectItem value="trade_executed">Trade Executions</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event ID</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Payload</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.eventId}>
                  <TableCell>{event.eventId}</TableCell>
                  <TableCell>{event.source}</TableCell>
                  <TableCell>{new Date(event.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{event.eventType}</TableCell>
                  <TableCell>
                    {typeof event.payload === 'object' 
                      ? JSON.stringify(event.payload) 
                      : event.payload}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}

