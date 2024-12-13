import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart } from "@/components/ui/chart";

const trendData = [
    { name: "Jan", price: 300000, listings: 150 },
    { name: "Feb", price: 310000, listings: 160 },
    { name: "Mar", price: 305000, listings: 155 },
    { name: "Apr", price: 320000, listings: 170 },
    { name: "May", price: 330000, listings: 180 },
    { name: "Jun", price: 340000, listings: 190 },
]

export default function Trends() {
    const [scrapedData, setScrapedData] = useState(null);

    useEffect(() => {
        const fetchScrapedData = async () => {
            try {
                const response = await fetch('/api/scrape');
                const data = await response.json();
                setScrapedData(data);
            } catch (error) {
                console.error('Error fetching scraped data:', error);
            }
        };

        fetchScrapedData();
    }, []);

    return (
        <TabsContent value="trends" className="space-y-8">
            <Card className="bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-blue-800">Average Home Prices</CardTitle>
                </CardHeader>
                <CardContent>
                    <LineChart
                        data={`trendData`}
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
            {scrapedData&& (
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
    )
}