import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "../ui/card"

export function CarsTab() {
  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-2 md:p-2">
      <div className="grid gap-6">
      <Card>
    <div className="bg-white rounded-lg shadow p-6">
      <form className="grid grid-cols-4 gap-6">
        <div>
          <Label htmlFor="pickupLocation">Pickup Location</Label>
          <Input id="pickupLocation" placeholder="Enter pickup location" />
        </div>
        <div>
          <Label htmlFor="dropoffLocation">Dropoff Location</Label>
          <Input id="dropoffLocation" placeholder="Enter dropoff location" />
        </div>
        <div>
          <Label htmlFor="pickupDate">Pickup Date</Label>
          <Input id="pickupDate" type="date" />
        </div>
        <div>
          <Label htmlFor="dropoffDate">Dropoff Date</Label>
          <Input id="dropoffDate" type="date" />
        </div>
        <div className="col-span-4">
          <Button className="w-full">Search Cars & Transfers</Button>
        </div>
      </form>
    </div>
    </Card>
    </div>
    </div>
  )
}
