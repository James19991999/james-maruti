"use client";

import { useId, useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const idBase = useId();

  return (
    <div className="divide-y divide-outline-variant/20 border-t border-b border-outline-variant/20">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${idBase}-button-${index}`;
        const panelId = `${idBase}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 py-6 text-left"
              >
                <span className="font-headline-md text-lg text-primary">{item.question}</span>
                <span
                  className="material-symbols-outlined text-secondary shrink-0 transition-transform duration-200"
                  style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  aria-hidden="true"
                >
                  add
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 pr-10"
            >
              <p className="text-on-surface-variant">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
