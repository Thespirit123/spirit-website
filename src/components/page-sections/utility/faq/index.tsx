import { Text } from "@/components/custom-ui/text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Which mobile networks are supported?",
    answer:
      "We support all major Nigerian networks including MTN, Glo, Airtel, and 9mobile. Our service ensures seamless top-up transactions across these providers, with plans to add more networks in the future.",
  },
  {
    question: "Are there minimum or maximum top-up limits?",
    answer:
      "Yes, we have flexible limits to suit your needs. The minimum top-up amount is ₦100, while the maximum is ₦50,000 per transaction. For larger amounts, you can process multiple transactions.",
  },
  {
    question: "How quickly is airtime credited?",
    answer:
      "Our top-up service is designed for instant transfers. Most transactions are processed within 5 minutes, ensuring you get your mobile credits when you need them most.",
  },
  {
    question: "What if the top-up fails?",
    answer:
      "In the rare event of a failed transaction, your money is automatically refunded within 24 hours. You can also contact our 24/7 support team for immediate assistance and resolution.",
  },
];

export const UtilityFAQSection = () => (
  <section className="py-20 w-11/12 max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <Text variant="h2" className="text-brand-primary-dark font-semibold">
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
  </section>
);
