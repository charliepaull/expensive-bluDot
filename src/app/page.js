"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "@/components/ui/chart"
import { MapPin, TrendingUp, Home, DollarSign } from 'lucide-react'

const trendData = [
  { name: "Jan", price: 300000, listings: 150 },
  { name: "Feb", price: 310000, listings: 160 },
  { name: "Mar", price: 305000, listings: 155 },
  { name: "Apr", price: 320000, listings: 170 },
  { name: "May", price: 330000, listings: 180 },
  { name: "Jun", price: 340000, listings: 190 },
]

const hotProperties = [
  { id: 1, address: "123 Main St", price: 500000, image: "/placeholder.svg?height=200&width=300" },
  { id: 2, address: "456 Elm St", price: 750000, image: "/placeholder.svg?height=200&width=300" },
  { id: 3, address: "789 Oak St", price: 600000, image: "/placeholder.svg?height=200&width=300" },
]

const neighborhoods = [
  {
    id: 1,
    name: "Downtown",
    description: "A vibrant urban center with a mix of modern high-rises and historic buildings.",
    walkScore: 95,
    amenities: ["Restaurants", "Shopping", "Parks"],
    image: "/placeholder.svg?height=200&width=300",
    communityCenters: ["Downtown Community Center", "Central Library"],
    events: [
      { name: "Downtown Art Walk", date: "Every second Thursday" },
      { name: "Farmers Market", date: "Every Sunday" },
    ],
  },
  {
    id: 2,
    name: "Suburbia",
    description: "A family-friendly neighborhood with tree-lined streets and excellent schools.",
    walkScore: 70,
    amenities: ["Schools", "Parks", "Community Center"],
    image: "/placeholder.svg?height=200&width=300",
    communityCenters: ["Suburbia Recreation Center", "Local Library Branch"],
    events: [
      { name: "Summer Movie Nights", date: "Every Friday in July and August" },
      { name: "Annual Block Party", date: "First Saturday in September" },
    ],
  },
  {
    id: 3,
    name: "Beachside",
    description: "A relaxed coastal community with beautiful ocean views and outdoor activities.",
    walkScore: 85,
    amenities: ["Beach", "Cafes", "Boardwalk"],
    image: "/placeholder.svg?height=200&width=300",
    communityCenters: ["Beachside Community Center", "Marine Life Education Center"],
    events: [
      { name: "Beach Cleanup Day", date: "First Saturday of every month" },
      { name: "Surfing Competition", date: "Last weekend in August" },
    ],
  },
]

function NeighborhoodDetail({ neighborhood }) {
  return (
    <Card className="bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-blue-800">{neighborhood.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-blue-700 mb-4">{neighborhood.description}</p>
        <div className="mb-4">
          <h4 className="font-semibold text-blue-800 mb-2">Community Centers</h4>
          <ul className="list-disc pl-5 text-blue-700">
            {neighborhood.communityCenters.map((center, index) => (
              <li key={index}>{center}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-blue-800 mb-2">Upcoming Events</h4>
          <ul className="space-y-2">
            {neighborhood.events.map((event, index) => (
              <li key={index} className="bg-blue-300 p-2 rounded text-blue-800">
                <span className="font-semibold">{event.name}</span> - {event.date}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ExpensiveBluDot() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(neighborhoods[0])
  const [scrapedData, setScrapedData] = useState(null)

  useEffect(() => {
    const fetchScrapedData = async () => {
      try {
        const response = await fetch('/api/scrape')
        const data = await response.json()
        setScrapedData(data)
      } catch (error) {
        console.error('Error fetching scraped data:', error)
      }
    }

    fetchScrapedData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Expensive BluDot</h1>
            <div className="space-x-4">
              <Button variant="ghost" className="text-white hover:bg-blue-700">Trends</Button>
              <Button variant="ghost" className="text-white hover:bg-blue-700">Neighborhoods</Button>
              <Button variant="ghost" className="text-white hover:bg-blue-700">Hot Properties</Button>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="trends" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-blue-300">
            <TabsTrigger value="trends" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Market Trends</TabsTrigger>
            <TabsTrigger value="neighborhoods" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Neighborhoods</TabsTrigger>
            <TabsTrigger value="properties" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Hot Properties</TabsTrigger>
          </TabsList>
          <TabsContent value="trends" className="space-y-8">
            <Card className="bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-800">Average Home Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={trendData}
                  config={{
                    price: {
                      label: "Price",
                      color: "hsl(217, 91%, 60%)", // Bright blue
                    },
                  }}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-800">Number of Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={trendData}
                  config={{
                    listings: {
                      label: "Listings",
                      color: "hsl(201, 96%, 32%)", // Deep blue
                    },
                  }}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>
            {scrapedData && (
              <Card className="bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-blue-800">Latest Market Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700">{scrapedData.latestInsight}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="neighborhoods" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-blue-800">Neighborhood Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-blue-300 rounded-md flex items-center justify-center">
                    <p className="text-blue-800">Interactive map placeholder</p>
                  </div>
                </CardContent>
              </Card>
              <NeighborhoodDetail neighborhood={selectedNeighborhood} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {neighborhoods.map((neighborhood) => (
                <Card key={neighborhood.id} className="cursor-pointer hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-100 to-blue-200" onClick={() => setSelectedNeighborhood(neighborhood)}>
                  <CardHeader>
                    <CardTitle className="text-blue-800">{neighborhood.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-700 mb-2">Walk Score: {neighborhood.walkScore}</p>
                    <p className="text-blue-700">Amenities: {neighborhood.amenities.join(", ")}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="properties" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                  <img src={property.image} alt={property.address} className="w-full h-48 object-cover" />
                  <CardHeader>
                    <CardTitle className="text-blue-800">{property.address}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-blue-600">${property.price.toLocaleString()}</p>
                    <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">View details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-6">
        <div className="container mx-auto px-6">
          <p>&copy; 2023 Expensive BluDot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}