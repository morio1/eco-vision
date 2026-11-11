import { add } from '../lib/storage';
import { useState } from 'react';
import { ArrowLeft, Camera, MapPin, AlertTriangle, CheckCircle2, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { BottomNav } from './BottomNav';
import { toast } from 'sonner';

interface NewReportWasteProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export function NewReportWaste({ onBack, onNavigate }: NewReportWasteProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [ticketId] = useState(`ECO-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);

  const issueTypes = [
    { value: 'full', label: 'Full Bin', icon: '🗑️' },
    { value: 'overflow', label: 'Overflow', icon: '⚠️' },
    { value: 'dumping', label: 'Illegal Dumping', icon: '🚫' },
    { value: 'odor', label: 'Bad Odor', icon: '👃' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueType || !location.trim() || !description.trim()) { toast.error('Complete all required fields.'); return; }
    try { add('reports', { ticketId, location: location.trim(), issueType, description: description.trim(), photos, status: 'Saved locally' }); } catch { toast.error('Unable to save. Remove photos or free browser storage.'); return; }
    setShowSuccess(true);
    toast.success('Report saved on this device.');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] to-[#E8F5E9] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center animate-fadeIn">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#FFC107] to-[#FFD54F] rounded-full flex items-center justify-center animate-pulse-eco">
            <CheckCircle2 className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-[#1B5E20] mb-3">Report Submitted!</h2>
          <p className="text-[#558B2F] mb-4">Thank you for helping keep your community clean! 🌿</p>
          
          <Card className="border-[#C8E6C9] rounded-3xl shadow-lg mb-6">
            <CardContent className="p-6">
              <p className="text-sm text-[#558B2F] mb-2">Ticket ID</p>
              <p className="text-xl text-[#4CAF50]">{ticketId}</p>
              <p className="text-xs text-[#558B2F] mt-3">Saved locally; not sent to authorities</p>
            </CardContent>
          </Card>

          <Button
            onClick={onBack}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] to-[#E8F5E9] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FFC107] to-[#FFD54F] text-white sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2>Report Waste Overflow</h2>
            <p className="text-sm text-white/90">Record a waste issue</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 animate-fadeIn">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Issue Type Selection */}
          <div className="space-y-3">
            <Label className="text-[#1B5E20]">
              <AlertTriangle className="w-4 h-4 inline mr-2" />
              Type of Issue
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {issueTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setIssueType(type.value)}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    issueType === type.value
                      ? 'border-[#FFC107] bg-amber-50 scale-105'
                      : 'border-[#C8E6C9] bg-white hover:border-[#FFD54F]'
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <p className="text-sm text-[#1B5E20]">{type.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-[#1B5E20]">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="Street address or landmark"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-12 rounded-2xl border-[#C8E6C9]"
                  required
                />
                <p className="text-xs text-[#558B2F]">📍 Or use current location</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-[#1B5E20]">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="rounded-2xl border-[#C8E6C9] min-h-[120px]"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
            <CardContent className="p-6">
              <Label className="text-[#1B5E20] mb-3 block">
                <Camera className="w-4 h-4 inline mr-2" />
                Add Photos (Optional)
              </Label>
              <input id="report-photos" aria-label="Upload report photos" type="file" accept="image/*" multiple className="block w-full mb-3" onChange={async (event) => {
                const files = Array.from(event.target.files || []).slice(0, 3);
                if (files.some(file => file.size > 500000)) { toast.error('Choose up to 3 images under 500 KB each.'); return; }
                const images = await Promise.all(files.map(file => new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(file); })));
                setPhotos(images);
              }} />
              <div className="flex gap-2">{photos.map((photo, index) => <img key={index} src={photo} alt={'Report photo ' + (index + 1)} className="w-20 h-20 rounded-xl object-cover" />)}</div>
              <button
                type="button"
                onClick={() => document.getElementById('report-photos')?.click()}
                className="w-full border-2 border-dashed border-[#C8E6C9] rounded-2xl p-8 hover:border-[#4CAF50] hover:bg-[#E8F5E9] transition-colors"
              >
                <Upload className="w-12 h-12 text-[#558B2F] mx-auto mb-3" />
                <p className="text-sm text-[#558B2F]">Tap to upload or take photo</p>
                <p className="text-xs text-[#558B2F] mt-1">Photos help us respond faster</p>
              </button>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-amber-200 rounded-3xl shadow-lg bg-amber-50">
            <CardContent className="p-6">
              <h4 className="text-[#1B5E20] mb-3">What happens next?</h4>
              <div className="space-y-2 text-sm text-[#558B2F]">
                <div className="flex gap-2">
                  <span>1️⃣</span>
                  <span>Your report is saved on this device</span>
                </div>
                <div className="flex gap-2">
                  <span>2️⃣</span>
                  <span>Saved on this browser for your records</span>
                </div>
                <div className="flex gap-2">
                  <span>3️⃣</span>
                  <span>Connect a collection service to receive live updates</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
            <Button
              type="submit"
              disabled={!issueType || !location || !description}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#FFC107] to-[#FFD54F] hover:from-[#FFD54F] hover:to-[#FFC107] text-white shadow-lg disabled:opacity-50"
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              Submit Report
            </Button>
          </div>
        </form>
      </div>

      <BottomNav currentPage="reports" onNavigate={onNavigate} />
    </div>
  );
}
