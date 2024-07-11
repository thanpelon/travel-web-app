"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator";
import { ArrowRightIcon, ChevronsUpDownIcon, MinusIcon, PlusIcon, ShuffleIcon, ShoppingBagIcon, MenuIcon, FolderOutputIcon } from "@/components/ui/icons"

export function ButtonLoading() {
  return (
    <Button disabled className="w-full">
      <Loader2 className="mr-2 h-4 w-4 animate-spin w-full" />
    </Button>
  )
}

export function FlightsTab() {
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  })
  const [departureDate, setDepartureDate] = useState<Date | null>(null)
  const [returnDate, setReturnDate] = useState<Date | null>(null)
  const [tripType, setTripType] = useState("roundtrip")
  const [origin, setOrigin] = useState("LON")
  const [destination, setDestination] = useState("NYC")
  const [travelClass, setTravelClass] = useState("ECONOMY")
  const [currency, setCurrency] = useState("USD")
  const [nonStop, setNonStop] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [carrierDictionary, setCarrierDictionary] = useState({})
  
  const resultsPerPage = 15

  const incrementPassenger = (type) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }))
  }

  const decrementPassenger = (type) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(prev[type] - 1, 0),
    }))
  }

  const handleSearch = async () => {
    setLoading(true)
    const params = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate ? departureDate.toISOString().split("T")[0] : "",
      adults: passengers.adults,
      children: passengers.children,
      infants: passengers.infants,
      travelClass,
      currencyCode: currency,
      nonStop: nonStop ? "true" : "false",
      max: resultsPerPage,
      offset: (currentPage - 1) * resultsPerPage,
    }

    if (tripType === 'roundtrip') {
      params.returnDate = returnDate.toISOString().split("T")[0]
    }

    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`/test/api/flights/offers/search?${queryString}`)
    const data = await response.json()

    setCarrierDictionary(data.dictionaries.carriers || {})
    setSearchResults(data.data || [])
    setTotalResults(data.meta?.total || 0)
    setLoading(false)
  }

  const handleShowMore = async () => {
    setLoading(true)
    const params = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate ? departureDate.toISOString().split("T")[0] : "",
      adults: passengers.adults,
      children: passengers.children,
      infants: passengers.infants,
      travelClass,
      currencyCode: currency,
      nonStop: nonStop ? "true" : "false",
      max: resultsPerPage,
      offset: currentPage * resultsPerPage,
    }

    if (tripType === 'roundtrip') {
      params.returnDate = returnDate.toISOString().split("T")[0]
    }

    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`/test/api/flights/offers/search?${queryString}`)
    const data = await response.json()

    setCarrierDictionary(data.dictionaries.carriers || {})
    setSearchResults((prevResults) => [...prevResults, ...data.data])
    setCurrentPage((prevPage) => prevPage + 1)
    setLoading(false)
  }

  const handleSwitch = () => {
    setOrigin((prevOrigin) => {
      setDestination(prevOrigin)
      return destination
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-2 md:p-2">
      <div className="grid gap-6">
        <Card>
          <CardContent className="grid gap-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-4">
            <div className="grid gap-2">
              <Label htmlFor="origin">Origin</Label>
              <div className="flex items-center">
                <Input
                  id="origin"
                  placeholder="Enter origin"
                  maxLength={3}
                  pattern="[A-Z]{3}"
                  title="Please enter a valid 3-letter IATA airport code"
                  required
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                />
                <Button variant="ghost" size="icon" className="rounded-full ml-2" onClick={handleSwitch}>
                  <ShuffleIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="Enter destination"
                maxLength={3}
                pattern="[A-Z]{3}"
                title="Please enter a valid 3-letter IATA airport code"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value.toUpperCase())}
              />
            </div>
          </div>

              <div className="grid gap-2">
                <Label htmlFor="currency">Currency</Label>
                <Select id="currency" onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                    <SelectItem value="AUD">AUD</SelectItem>
                    <SelectItem value="PHP">PHP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="departure-date">Departure Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center justify-between w-full">
                      <span>{departureDate ? departureDate.toLocaleDateString() : "Select departure date"}</span>
                      <ChevronsUpDownIcon className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 max-w-[276px]">
                  <Calendar
                    mode="single"
                    initialFocus
                    onSelect={(date) => setDepartureDate(date)}
                    fromDate={new Date()} // Disable past dates
                    selected={departureDate} // Highlight selected date
                  />
                </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="return-date">Return Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center justify-between w-full" disabled={tripType === "oneway"}>
                      <span>{returnDate ? returnDate.toLocaleDateString() : "Select return date"}</span>
                      <ChevronsUpDownIcon className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 max-w-[276px]">
                  <Calendar
                    mode="single"
                    initialFocus
                    onSelect={(date) => setReturnDate(date)}
                    fromDate={departureDate || new Date()} // Disable dates before departure date
                    selected={returnDate} // Highlight selected date
                  />
                </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
            <Label htmlFor="passengers">Passengers</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center justify-between w-full">
                  <span>
                    {passengers.adults} Adult{passengers.adults !== 1 && "s"}, {passengers.children} Child
                    {passengers.children !== 1 && "ren"}, {passengers.infants} Infant
                    {passengers.infants !== 1 && "s"}
                  </span>
                  <ChevronsUpDownIcon className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4 grid gap-4">
                <div className="flex items-center justify-between">
                  <span>Adults</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => decrementPassenger("adults")}
                    >
                      <MinusIcon className="w-4 h-4" />
                    </Button>
                    <Input
                      type="text"
                      value={passengers.adults}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                        setPassengers({ ...passengers, adults: Math.max(0, Number(value)) });
                      }}
                      className="w-16 text-center"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => incrementPassenger("adults")}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Children</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => decrementPassenger("children")}
                    >
                      <MinusIcon className="w-4 h-4" />
                    </Button>
                    <Input
                      type="text"
                      value={passengers.children}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                        setPassengers({ ...passengers, children: Math.max(0, Number(value)) });
                      }}
                      className="w-16 text-center"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => incrementPassenger("children")}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Infants</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => decrementPassenger("infants")}
                    >
                      <MinusIcon className="w-4 h-4" />
                    </Button>
                    <Input
                      type="text"
                      value={passengers.infants}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                        setPassengers({ ...passengers, infants: Math.max(0, Number(value)) });
                      }}
                      className="w-16 text-center"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => incrementPassenger("infants")}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
              <div className="grid gap-2">
                <Label htmlFor="travel-class">Travel Class</Label>
                <Select id="travel-class" onValueChange={setTravelClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select travel class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ECONOMY">Economy</SelectItem>
                    <SelectItem value="PREMIUM_ECONOMY">Premium Economy</SelectItem>
                    <SelectItem value="BUSINESS">Business</SelectItem>
                    <SelectItem value="FIRST">First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="trip-type">Trip Type</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant={tripType === "roundtrip" ? "secondary" : "outline"}
                    onClick={() => setTripType("roundtrip")}
                    className={tripType === "roundtrip" ? "text-black" : "text-gray-400"}
                  >
                    Round-Trip
                  </Button>
                  <Button
                    variant={tripType === "oneway" ? "secondary" : "outline"}
                    onClick={() => setTripType("oneway")}
                    className={tripType === "oneway" ? "text-black" : "text-gray-400"}
                  >
                    One-way
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="non-stop">Non-stop Flights</Label>
                <Checkbox id="non-stop" checked={nonStop} onCheckedChange={(checked) => setNonStop(checked)} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {loading ? (
              <ButtonLoading />
            ) : (
              <Button className="w-full" onClick={handleSearch}>Search Flights</Button>
            )}
          </CardFooter>
        </Card>
        <div>
          <div className="grid gap-4">
            {searchResults.map((result) => (
              <Card key={result.id}>
                <CardContent className="grid gap-4 mt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{result.itineraries[0].segments[0].departure.iataCode}</div>
                      <ArrowRightIcon className="w-4 h-4" />
                      <div className="font-medium">{result.itineraries[0].segments[result.itineraries[0].segments.length - 1].arrival.iataCode}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">Departure: {new Date(result.itineraries[0].segments[0].departure.at).toLocaleTimeString()}</div>
                      <Separator orientation="vertical" className="h-6" />
                      <div className="text-sm text-muted-foreground">Arrival: {new Date(result.itineraries[0].segments[result.itineraries[0].segments.length - 1].arrival.at).toLocaleTimeString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{carrierDictionary[result.itineraries[0].segments[0].carrierCode]}</div>
                      <Separator orientation="vertical" className="h-6" />
                      <div className="font-medium">{result.itineraries[0].segments[0].carrierCode}{result.itineraries[0].segments[0].number}</div>
                    </div>
                    <div className="font-bold text-2xl">{result.price.currency} {result.price.total}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{result.travelerPricings[0].fareDetailsBySegment[0].cabin}</div>
                      <Separator orientation="vertical" className="h-6" />
                      <div className="font-medium">{result.itineraries[0].segments.length === 1 ? "Non-stop" : `${result.itineraries[0].segments.length - 1} Stop${result.itineraries[0].segments.length > 2 ? "s" : ""}`}</div>
                      <Separator orientation="vertical" className="h-6" />
                      <div className="font-medium">Duration: {result.itineraries[0].duration}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShoppingBagIcon className="w-4 h-4" />
                      <MenuIcon className="w-4 h-4" />
                      <FolderOutputIcon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Booking Class: {result.travelerPricings[0].fareDetailsBySegment[0].class}</div>
                      <Separator orientation="vertical" className="h-6" />
                      <div className="font-medium">{result.instantTicketingRequired ? "Instant Ticketing" : "Standard Ticketing"}</div>
                    </div>
                  </div>
                  <Button className="w-full" variant="secondary">
                    Select
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {totalResults > searchResults.length && (
            <div className="flex justify-center mt-6">
              <Button onClick={handleShowMore} disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Show More'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
