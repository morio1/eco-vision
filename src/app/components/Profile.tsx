import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Award, Trash2, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface ProfileProps {
  onBack: () => void;
}

export function Profile({ onBack }: ProfileProps) {
  const user = {
    name: 'John Adebayo',
    email: 'john.adebayo@example.com',
    phone: '+234 803 456 7890',
    location: 'Lagos, Nigeria',
    country: '🇳🇬',
    joinDate: 'January 2025',
    membershipLevel: 'Gold',
  };

  const recentActivity = [
    { date: 'Nov 5, 2025', action: 'Scheduled pickup', status: 'Completed' },
    { date: 'Nov 3, 2025', action: 'Reported waste overflow', status: 'In Progress' },
    { date: 'Oct 28, 2025', action: 'Visited recycling kiosk', status: 'Completed' },
    { date: 'Oct 20, 2025', action: 'Scheduled pickup', status: 'Completed' },
  ];

  const stats = [
    { label: 'Total Pickups', value: '15', icon: Trash2 },
    { label: 'Recycled (kg)', value: '45', icon: Award },
    { label: 'Reports Filed', value: '8', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-green-700 hover:text-green-800 hover:bg-green-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-green-800 mb-2">Account Overview</h1>
          <p className="text-green-600">Manage your profile and view your activity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-green-100">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="bg-green-600 text-white text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-green-800">{user.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-2">
                  <span>{user.country}</span>
                  <Badge className="bg-amber-500 hover:bg-amber-600">
                    {user.membershipLevel}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-green-700">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-green-700">{user.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-green-700">{user.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-green-700">Joined {user.joinDate}</span>
                </div>
                <Separator />
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-sm text-green-700">{stat.label}</span>
                    </div>
                    <span className="text-green-800">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Activity & Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Recent Activity</CardTitle>
                <CardDescription>Your latest actions on ECO-VISION</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-green-100 last:border-0">
                      <div>
                        <p className="text-green-800">{activity.action}</p>
                        <p className="text-sm text-green-600">{activity.date}</p>
                      </div>
                      <Badge 
                        variant={activity.status === 'Completed' ? 'default' : 'secondary'}
                        className={activity.status === 'Completed' ? 'bg-green-600' : 'bg-orange-500'}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-800">Upcoming Pickups</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-green-800">General Waste</p>
                      <p className="text-sm text-green-600">Nov 10, 2025</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-green-800">Recyclables</p>
                      <p className="text-sm text-green-600">Nov 15, 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-800">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        🌟
                      </div>
                      <div>
                        <p className="text-green-800">Eco Warrior</p>
                        <p className="text-sm text-green-600">10+ pickups</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        ♻️
                      </div>
                      <div>
                        <p className="text-green-800">Recycling Champion</p>
                        <p className="text-sm text-green-600">50kg recycled</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
