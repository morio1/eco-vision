import { ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface FAQsProps {
  onBack: () => void;
}

export function FAQs({ onBack }: FAQsProps) {
  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is ECO-VISION?',
          a: 'ECO-VISION is a smart waste management platform designed for African communities. We help connect citizens with waste collection services, recycling centers, and provide tools to report environmental issues.',
        },
        {
          q: 'Which countries does ECO-VISION operate in?',
          a: 'We currently operate in Nigeria and Kenya, with plans to expand to more African countries soon.',
        },
        {
          q: 'Is ECO-VISION free to use?',
          a: 'Yes, our basic services including scheduling pickups and reporting waste issues are completely free. Some premium services may have associated fees.',
        },
      ],
    },
    {
      category: 'Pickups',
      questions: [
        {
          q: 'How do I schedule a waste pickup?',
          a: 'Simply navigate to the "Schedule Pickup" section, fill in your location details, select the type of waste, and choose your preferred date. Our team will confirm your booking within 24 hours.',
        },
        {
          q: 'What types of waste can be collected?',
          a: 'We collect general waste, recyclable materials (plastic, paper, metal, glass), organic waste, electronic waste, and certain hazardous materials. Specific restrictions may apply based on your location.',
        },
        {
          q: 'How far in advance should I schedule a pickup?',
          a: 'We recommend scheduling at least 2-3 days in advance to ensure availability. Emergency pickups may be available for an additional fee.',
        },
        {
          q: 'Can I cancel or reschedule a pickup?',
          a: 'Yes, you can cancel or reschedule up to 24 hours before the scheduled pickup time through your account dashboard.',
        },
      ],
    },
    {
      category: 'Recycling',
      questions: [
        {
          q: 'Where can I find recycling kiosks?',
          a: 'Use our "Recycling Kiosks Near Me" feature to find the closest drop-off points. You can filter by country and see details including accepted materials, hours, and contact information.',
        },
        {
          q: 'What materials can be recycled?',
          a: 'Common recyclable materials include plastic bottles and containers, paper and cardboard, metal cans, glass bottles, and electronic waste. Always check with your local kiosk for specific guidelines.',
        },
        {
          q: 'Do I need to clean recyclables before dropping them off?',
          a: 'Yes, please rinse food containers and remove any non-recyclable components to help the recycling process.',
        },
      ],
    },
    {
      category: 'Reporting',
      questions: [
        {
          q: 'What should I do if I see waste overflow?',
          a: 'Use our "Report Waste Overflow" feature to alert the authorities. Provide the location, severity, and a description. Photos are helpful but optional.',
        },
        {
          q: 'How long does it take for reported issues to be resolved?',
          a: 'Response times vary based on severity. Critical issues are typically addressed within 24-48 hours, while minor issues may take 3-5 days.',
        },
        {
          q: 'Can I track the status of my report?',
          a: 'Yes, you can view all your reports and their current status in your account dashboard.',
        },
      ],
    },
  ];

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
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-green-800">Frequently Asked Questions</h1>
            </div>
          </div>
          <p className="text-green-600">Find answers to common questions about ECO-VISION</p>
        </div>

        <div className="space-y-6">
          {faqs.map((category, idx) => (
            <Card key={idx} className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">{category.category}</CardTitle>
                <CardDescription>Common questions about {category.category.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, qIdx) => (
                    <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                      <AccordionTrigger className="text-green-800 hover:text-green-900">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-green-700">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-green-100 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-green-800 mb-3">Still have questions?</p>
              <Button className="bg-green-600 hover:bg-green-700">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
