import { Text } from "@/components/custom-ui/text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Is the app detectable?",
    answer:
      "Our monitoring solution operates completely in stealth mode. The app runs invisibly in the background with no visible icon, ensuring discreet monitoring without detection.",
  },
  {
    question: "What devices are supported?",
    answer:
      "The app is compatible with both Android (version 5.0 and above) and iOS devices. For Android devices, physical access is required for initial installation. For iOS devices, the app is available directly through the App Store. Installation typically takes less than 5 minutes on either platform.",
  },
  {
    question: "Is installation complicated?",
    answer:
      "Not at all. Our step-by-step installation guide makes the process simple and quick. Once installed, the app works automatically in the background with no additional configuration needed.",
  },
  {
    question: "How is data secured?",
    answer:
      "All monitored data is encrypted using military-grade encryption before being transmitted to our secure servers. Access to your dashboard is protected by two-factor authentication, ensuring only you can view the collected information.",
  },
];

export const WhatsappFAQSection = () => (
  <section className="py-20 w-full bg-gradient-to-b from-[#008EA8] to-[#D5F9FF]">
    <div className="w-11/12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <Text variant="h2" className="text-white font-semibold">
          Frequent Questions
        </Text>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqData.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-l-[3px] border-[#009ac475] rounded-lg bg-white shadow-slate-300 px-6 py-4"
          >
            <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
