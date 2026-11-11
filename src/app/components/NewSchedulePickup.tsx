import { add } from '../lib/storage';
import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Trash2, Clock, CheckCircle2, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { BottomNav } from './BottomNav';
import { toast } from 'sonner';

interface NewSchedulePickupProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export function NewSchedulePickup({ onBack, onNavigate }: NewSchedulePickupProps) {
  const [step, setStep] = useState(1);
  const [wasteType, setWasteType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const wasteTypes = [
    { value: 'organic', label: 'Organic Waste', icon: '🥬', color: 'from-green-400 to-green-600' },
    { value: 'plastic', label: 'Plastic', icon: '♻️', color: 'from-blue-400 to-blue-600' },
    { value: 'ewaste', label: 'E-waste', icon: '📱', color: 'from-purple-400 to-purple-600' },
    { value: 'mixed', label: 'Mixed Waste', icon: '🗑️', color: 'from-gray-400 to-gray-600' },
  ];

  const handleSubmit = () => {
    if (!wasteType || !date || !time || !address.trim() || date < new Date().toLocaleDateString('en-CA')) { toast.error('Enter a valid pickup date, time, waste type and address.'); return; }
    try { add('pickups', { wasteType, date, time, address: address.trim(), notes, status: 'Saved locally' }); } catch { toast.error('Unable to save. Your browser storage may be full.'); return; }
    setShowSuccess(true);
    toast.success('Pickup saved on this device.');
    setTimeout(() => {
      onBack();
    }, 2500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] to-[#E8F5E9] flex items-center justify-center p-4">
        <div className="text-center animate-fadeIn">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-full flex items-center justify-center animate-pulse-eco">
            <CheckCircle2 className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-[#1B5E20] mb-3">Pickup Scheduled!</h2>
          <p className="text-[#558B2F] mb-2">Thank you for keeping your city clean! 🌿</p>
          <p className="text-sm text-[#558B2F]">Saved on this device. Collection is not yet connected to a service.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] to-[#E8F5E9] pb-24">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#C8E6C9] sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#E8F5E9] hover:bg-[#C8E6C9] flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#4CAF50]" />
          </button>
          <div>
            <h2 className="text-[#1B5E20]">Schedule Pickup</h2>
            <p className="text-sm text-[#558B2F]">Step {step} of 3</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="px-4 pb-4">
          <div className="h-2 bg-[#E8F5E9] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] transition-all duration-300 rounded-full"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 animate-fadeIn">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-[#1B5E20] mb-2">Select Waste Type</h3>
              <p className="text-sm text-[#558B2F]">Choose the type of waste you want to schedule</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {wasteTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setWasteType(type.value)}
                  className={`p-6 rounded-3xl border-2 transition-all ${
                    wasteType === type.value
                      ? 'border-[#4CAF50] bg-[#E8F5E9] scale-105 shadow-lg'
                      : 'border-[#C8E6C9] bg-white hover:border-[#A5D6A7]'
                  }`}
                >
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center text-3xl shadow-md`}>
                    {type.icon}
                  </div>
                  <p className="text-sm text-[#1B5E20]">{type.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[#1B5E20] mb-2">Choose Date & Time</h3>
              <p className="text-sm text-[#558B2F]">When should we collect your waste?</p>
            </div>

            <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-[#1B5E20]">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Pickup Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-12 rounded-2xl border-[#C8E6C9]"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-[#1B5E20]">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Preferred Time
                  </Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger id="time" className="h-12 rounded-2xl border-[#C8E6C9]">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8-10">8:00 AM - 10:00 AM</SelectItem>
                      <SelectItem value="10-12">10:00 AM - 12:00 PM</SelectItem>
                      <SelectItem value="2-4">2:00 PM - 4:00 PM</SelectItem>
                      <SelectItem value="4-6">4:00 PM - 6:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[#1B5E20] mb-2">Confirm Location</h3>
              <p className="text-sm text-[#558B2F]">Where should we pick up from?</p>
            </div>

            <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-[#1B5E20]">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Pickup Address
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your full address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="rounded-2xl border-[#C8E6C9] min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-[#1B5E20]">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="rounded-2xl border-[#C8E6C9]"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="border-[#C8E6C9] rounded-3xl shadow-lg bg-[#E8F5E9]">
              <CardContent className="p-6">
                <h4 className="text-[#1B5E20] mb-3">Pickup Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#558B2F]">Waste Type:</span>
                    <span className="text-[#1B5E20]">{wasteTypes.find(t => t.value === wasteType)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#558B2F]">Date:</span>
                    <span className="text-[#1B5E20]">{date || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#558B2F]">Time:</span>
                    <span className="text-[#1B5E20]">{time ? `${time.split('-')[0]}:00 - ${time.split('-')[1]}:00` : 'Not set'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
        <div className="flex gap-3">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1 h-12 rounded-2xl border-[#C8E6C9] text-[#4CAF50] hover:bg-[#E8F5E9]"
            >
              Back
            </Button>
          )}
          <Button
            onClick={step === 3 ? handleSubmit : () => setStep(step + 1)}
            disabled={
              (step === 1 && !wasteType) ||
              (step === 2 && (!date || !time)) ||
              (step === 3 && !address)
            }
            className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] hover:from-[#66BB6A] hover:to-[#81C784] text-white shadow-lg disabled:opacity-50"
          >
            {step === 3 ? 'Confirm Pickup' : 'Continue'}
          </Button>
        </div>
      </div>

      <BottomNav currentPage="pickups" onNavigate={onNavigate} />
    </div>
  );
}
