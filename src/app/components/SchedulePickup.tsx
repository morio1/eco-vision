import { ArrowLeft, Calendar, MapPin, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

interface SchedulePickupProps {
  onBack: () => void;
}

export function SchedulePickup({ onBack }: SchedulePickupProps) {
  const [address, setAddress] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pickup scheduled successfully! We will contact you soon.');
    // Reset form
    setAddress('');
    setWasteType('');
    setDate('');
    setNotes('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-green-700 hover:text-green-800 hover:bg-green-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-green-800 mb-2">Schedule a Pickup</h1>
          <p className="text-green-600">Book a waste collection from your location</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Pickup Details</CardTitle>
                <CardDescription>Fill in the information below to schedule your pickup</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address">Pickup Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="address"
                        placeholder="Enter your full address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waste-type">Type of Waste</Label>
                    <Select value={wasteType} onValueChange={setWasteType} required>
                      <SelectTrigger id="waste-type">
                        <SelectValue placeholder="Select waste type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Waste</SelectItem>
                        <SelectItem value="recyclable">Recyclable Materials</SelectItem>
                        <SelectItem value="organic">Organic Waste</SelectItem>
                        <SelectItem value="electronic">Electronic Waste</SelectItem>
                        <SelectItem value="hazardous">Hazardous Waste</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Pickup Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special instructions or information"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Schedule Pickup
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-green-100 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">How it Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-green-800">Fill the form</p>
                    <p className="text-sm text-green-600">Provide pickup details</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-green-800">Confirmation</p>
                    <p className="text-sm text-green-600">Receive confirmation call</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-green-800">Pickup</p>
                    <p className="text-sm text-green-600">Waste collected on time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Pickup Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-green-700">
                <p>• Separate recyclables from general waste</p>
                <p>• Place waste in appropriate containers</p>
                <p>• Ensure accessibility to pickup location</p>
                <p>• Be available for verification if needed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
