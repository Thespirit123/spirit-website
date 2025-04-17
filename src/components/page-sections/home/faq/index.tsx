import { Text } from "@/components/custom-ui/text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What services does Spirit Media offer?",
    answer:
      "Getting started is easy! Simply create an account, choose your subscription plan, and start streaming immediately. Our vast library of content is instantly accessible across all your devices.",
  },
  {
    question:
      "Is my data secure?",
    answer: 
      "We're currently working on expanding our services to include utility bill payments (airtime, data, electricity) and foreign number solutions. These features are in development and will be launching soon. Stay tuned to our platform for updates and announcements about these exciting new services.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Yes, our WhatsApp monitoring tool is legal when used with proper consent and for legitimate purposes such as parental control or business monitoring. We recommend reviewing local laws and regulations.",
  },
  {
    question: "What are your business hours?",
    answer:
      "Our customer support team is available 24/7 through multiple channels. You can reach us via live chat, email, or phone. We typically respond to all queries within 2-4 hours.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Our customer support team is available 24/7 through multiple channels. You can reach us via live chat, email, or phone. We typically respond to all queries within 2-4 hours.",
  },
];

export const FAQSection = () => (
<div style={{width:"100%", maxWidth:"1000px", margin:"0 auto"}}>
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
          className=" border-[#009ac475] rounded-lg bg-white shadow-slate-300 px-2 "
          style={{ border:'1px solid #e3e1e1'}}
        >
          <AccordionTrigger className="px-2 py-4 text-lg font-medium hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-4 text-gray-600">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
  </div>
);
