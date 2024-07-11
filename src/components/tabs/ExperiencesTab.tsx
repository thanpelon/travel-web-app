import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "../ui/card"

export function ExperiencesTab() {
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
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" type="date" />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" type="date" />
        </div>
        <div>
          <Label htmlFor="guests">Number of Guests</Label>
          <Input id="guests" type="number" />
        </div>
        <div className="col-span-4">
          <Button className="w-full">Search Experiences</Button>
        </div>
        </form>
        </div>
      </Card>
      </div>
      </div>
      
  )
}
