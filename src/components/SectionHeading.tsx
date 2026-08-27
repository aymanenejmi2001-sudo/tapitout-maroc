import Link from "next/link";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

type Props = {
  eyebrow: string;
  title: string;
  link?: { label: string; href: string };
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  link,
  align = "left",
}: Props) {
  const centered = align === "center";

  return (
    <div className={centered ? "text-center" : ""}>
      <Reveal>
        <p className="eyebrow text-accent">{eyebrow}</p>
      </Reveal>

      <div
        className={`mt-4 flex flex-wrap items-end gap-6 ${
          centered ? "justify-center" : "justify-between"
        }`}
      >
        <TextReveal
          as="h2"
          delay={0.06}
          className="font-display text-[40px] leading-[1.05] text-ink lg:text-[60px]"
        >
          {title}
        </TextReveal>

        {link && (
          <Reveal delay={0.12}>
            {/* Un lien de section doit se voir comme une action : contour,
                surface cliquable généreuse, et flèche qui avance au survol. */}
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2.5 rounded border border-ink/20 px-6 py-3.5 text-base font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              {link.label}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        )}
      </div>
    </div>
  );
}
