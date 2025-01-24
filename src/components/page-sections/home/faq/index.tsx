import { Text } from "@/components/custom-ui/text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "How do I get started with the movie portal?",
    answer:
      "Getting started is easy! Simply create an account, choose your subscription plan, and start streaming immediately. Our vast library of content is instantly accessible across all your devices.",
  },
  {
    question:
      "When will utility payments and international numbers be available?",
    answer:
      "We're currently working on expanding our services to include utility bill payments (airtime, data, electricity) and international number solutions. These features are in development and will be launching soon. Stay tuned to our platform for updates and announcements about these exciting new services.",
  },
  {
    question: "Is the WhatsApp monitoring tool legal to use?",
    answer:
      "Yes, our WhatsApp monitoring tool is legal when used with proper consent and for legitimate purposes such as parental control or business monitoring. We recommend reviewing local laws and regulations.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Our customer support team is available 24/7 through multiple channels. You can reach us via live chat, email, or phone. We typically respond to all queries within 2-4 hours.",
  },
];

export const FAQSection = () => (
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
