import Image from "next/image";
import screenshotImg from "../../public/images/sp_ref_screenshot.png";
import crDetailImg from "../../public/images/cr-detail.png";
import crListImg from "../../public/images/cr-list.png";

const flows = [
  "Discord conversation -> memory artifact -> searchable context",
  "Voice meeting -> transcript + summary -> linked artifacts",
  "Knowledge source sync -> docs and repo content become queryable",
  "Operator prompt -> runtime action -> updated workflow state",
  "Config through chat -> space policy and memory behavior can evolve in place",
];

export function ReferenceImplSection() {
  return (
    <section
      id="workflow"
      className="w-full border-t border-border scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto py-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
              System View
            </p>
            <h2 className="text-4xl font-bold mb-6">From community activity to usable context</h2>
            <p className="text-muted-foreground mb-4">
              Prism Stack is not just a chat interface. It is a coordination
              system that captures community activity and turns it into memory,
              knowledge, and operator-facing workflows.
            </p>
            <p className="text-muted-foreground mb-8">
              The goal is to help communities preserve continuity, reduce
              repeated synthesis work, and make AI operate on shared context
              instead of isolated prompts.
            </p>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
              Reference Flows
            </p>
            <ul className="space-y-2">
              {flows.map((flow) => (
                <li
                  key={flow}
                  className="font-mono text-sm text-foreground flex items-center gap-2"
                >
                  <span className="text-primary">•</span>
                  {flow}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="border border-border bg-card">
              <Image
                src={screenshotImg}
                alt="Prism Stack reference screenshot"
                className="w-full h-auto"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-border bg-card p-3">
                <Image
                  src={crDetailImg}
                  alt="Change request detail review screen"
                  className="w-full h-auto mb-3"
                />
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Review and Approval
                </p>
                <p className="text-sm text-muted-foreground">
                  Operator work is surfaced as explicit request state, review
                  steps, and branch-aware execution instead of disappearing into
                  ad hoc chat.
                </p>
              </div>
              <div className="border border-border bg-card p-3">
                <Image
                  src={crListImg}
                  alt="Change request list view"
                  className="w-full h-auto mb-3"
                />
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Queue and Coordination
                </p>
                <p className="text-sm text-muted-foreground">
                  Communities can coordinate multiple requests, triage work, and
                  keep workflow state visible across operators and agents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
