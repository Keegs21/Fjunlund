import { useState } from "react";
import AnimateHeight from "react-animate-height";
const rulesData = [
  {
    id: 1,
    title: "Paritdas",
    content: (
      <p className="tcn-6">
        Molestias excepturi sint occaecati cupiditate non provident, similique
        sunt in culpa qui officia deserunt mollitia animi, id est laborum et
        dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
      </p>
    ),
  },
  {
    id: 2,
    title: "Reglamento",
    content: (
      <ol className="tcn-6 lower-alpha-right-parentheses d-grid gap-3">
        <li>
          Treat all members and staff with courtesy and respect. Discriminatory
          or offensive behavior will not be tolerated.
        </li>
        <li>
          Communication Maintain open and constructive communication. Address
          concerns through the appropriate channels.
        </li>
        <li>
          Emergency Procedures: Familiarize yourself with evacuation procedures
          and the location of emergency exits.
        </li>
        <li>
          Safeguard sensitive information and respect the privacy of others.
        </li>
      </ol>
    ),
  },
  {
    id: 3,
    title: "Discord",
    content: (
      <p>
        Molestias excepturi sint occaecati cupiditate non provident, similique
        sunt in culpa qui officia deserunt mollitia animi, id est laborum et
        dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
      </p>
    ),
  },
];
const Rules = () => {
  const [open, setOpened] = useState<null | number>(1);
  return (
    <div className="row g-6">
      <div className="accordion-section rule-accordion d-grid gap-6">
        {rulesData.map(({ id, content, title }) => (
          <div key={id} className="accordion-single p-sm-5 p-3 bgn-4 rounded">
            <h5 className="acc-header-area">
              <button
                onClick={() => setOpened((prev) => (prev == id ? null : id))}
                className="accordion-btn rule-acc-btn fs-four position-relative ps-8"
                type="button">
                {title}
              </button>
            </h5>
            <AnimateHeight height={open == id ? "auto" : 0}>
              <div className="acc-content-area">
                <div className="content-body mt-lg-6 mt-4">{content}</div>
              </div>
            </AnimateHeight>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;
