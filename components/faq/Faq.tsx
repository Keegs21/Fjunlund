"use client";
import clsx from "clsx";
import { useState } from "react";
import AnimateHeight from "react-animate-height";

const faqData = [
  {
    id: 1,
    question: "How we can buy and invest token?",
    answer:
      "Molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    id: 2,
    question: "What is a video game genre?",
    answer:
      "The gaming world never sleeps, and neither do we. Stay tuned for more breaking news reviews and insights into the gaming industry. Whether you're a casual gamer or a dedicated enthusiast.",
  },
  {
    id: 3,
    question: "How can I improve my gaming skills?",
    answer:
      "Molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    id: 4,
    question: "Are there any career opportunities in the gaming industry?",
    answer:
      "Molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    id: 5,
    question: "How can I get Matic to pay for the Network Fee (gas)?",
    answer:
      "Molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    id: 6,
    question: "Can I leave a tournament after it begins?",
    answer:
      "Molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    id: 7,
    question: "What are the benefits of multiplayer gaming?",
    answer:
      "Molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    id: 8,
    question: "What are some popular esports tournaments and events?",
    answer:
      "The gaming world never sleeps, and neither do we. Stay tuned for more breaking news reviews and insights into the gaming industry. Whether you're a casual gamer or a dedicated enthusiast.",
  },
  {
    id: 9,
    question: "How do I prevent gaming addiction?",
    answer:
      "Molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    id: 10,
    question: "Are there any career opportunities in the gaming industry?",
    answer:
      "Molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    id: 11,
    question: "What is a crypto currency wallet?",
    answer:
      "Molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    id: 12,
    question: "How much does it cost to enter a tournament?",
    answer:
      "Molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
];

const Faq = () => {
  const [opened, setOpened] = useState<null | number>(1);
  return (
    <div className="faq-section pb-120 pt-120 mt-lg-0 mt-sm-15 mt-10">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-lg-15 mb-10">
            <h2 className="display-four tcn-1 cursor-scale growUp title-anim">
              Faq
            </h2>
          </div>
        </div>

        <div className="container">
          <div className="row g-6">
            <div className="col-lg-6 px-sm-3 px-0">
              <div className="accordion-section faq-accordion d-grid gap-6">
                {faqData.slice(0, 6).map(({ answer, id, question }) => (
                  <div
                    key={id}
                    className={clsx(
                      "accordion-single p-sm-5 p-3 bgn-4 rounded",
                      opened == id && "active"
                    )}>
                    <h5 className="acc-header-area">
                      <button
                        onClick={() =>
                          setOpened((prev) => (prev == id ? null : id))
                        }
                        className="accordion-btn text-start position-relative p-0 w-100 pe-7 fs-five fw-medium"
                        type="button">
                        {question}
                      </button>
                    </h5>
                    <AnimateHeight height={opened == id ? "auto" : 0}>
                      <div className="acc-content-area">
                        <div className="content-body mt-lg-6 mt-4">
                          <p className="tcn-6">{answer}</p>
                        </div>
                      </div>
                    </AnimateHeight>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 px-sm-3 px-0">
              <div className="accordion-section faq-accordion d-grid gap-6">
                {faqData.slice(6).map(({ answer, id, question }) => (
                  <div
                    key={id}
                    className={clsx(
                      "accordion-single p-sm-5 p-3 bgn-4 rounded",
                      opened == id && "active"
                    )}>
                    <h5 className="acc-header-area">
                      <button
                        onClick={() =>
                          setOpened((prev) => (prev == id ? null : id))
                        }
                        className="accordion-btn text-start position-relative p-0 w-100 pe-7 fs-five fw-medium"
                        type="button">
                        {question}
                      </button>
                    </h5>
                    <AnimateHeight height={opened == id ? "auto" : 0}>
                      <div className="acc-content-area">
                        <div className="content-body mt-lg-6 mt-4">
                          <p className="tcn-6">{answer}</p>
                        </div>
                      </div>
                    </AnimateHeight>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
