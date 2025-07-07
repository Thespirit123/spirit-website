"use client";

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
      "At Spirit Media, we pride ourselves as The Plug for All Things. Our services include Foreign Numbers, Airtime & Data, Cracked Apps, Movies, and much more.",
  },
  {
    question:
      "Is my data secure?",
    answer: 
      "Absolutely. We value your privacy. Your data is 100% secure — we never share or sell it. Our top-tier security experts work round the clock to prevent any data breaches.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team via email at Theespiritmedia@gmail.com. Alternatively, visit the Community Section for assistance and updates.",
  },
  {
    question: "What are your business hours?",
    answer:
      "We're available 24/7 to serve you anytime, any day.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we do. Refunds are considered if there's an issue with our service or if a product is faulty.",
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
