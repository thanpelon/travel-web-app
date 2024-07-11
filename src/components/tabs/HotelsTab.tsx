import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "../ui/card"

export function HotelsTab() {
  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-2 md:p-2">
      <div className="grid gap-6">
      <Card>
    <div className="bg-white rounded-lg shadow p-6">
      <form className="grid grid-cols-4 gap-6">
        <div>
          <Label htmlFor="destination">Destination</Label>
          <Input id="destination" placeholder="Enter destination" />
        </div>
        <div>
          <Label htmlFor="checkInDate">Check-in Date</Label>
          <Input id="checkInDate" type="date" />
        </div>
        <div>
          <Label htmlFor="checkOutDate">Check-out Date</Label>
          <Input id="checkOutDate" type="date" />
        </div>
        <div>
          <Label htmlFor="rooms">Rooms</Label>
          <Input id="rooms" type="number" />
        </div>
        <div>
          <Label htmlFor="guests">Guests</Label>
          <Input id="guests" type="number" />
        </div>
        <div className="col-span-4">
          <Button className="w-full">Search Hotels</Button>
        </div>
      </form>
    </div>
    </Card>
    </div>
    </div>
  )
}
