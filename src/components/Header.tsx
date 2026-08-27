"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { navLinks, socialLinks } from "@/lib/site";

const panel = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)" },
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  /* La barre s'efface quand on descend et revient dès qu'on remonte :
     la page respire, la navigation reste à portée. */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    if (open) return;
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > 200 && y > previous);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 bg-paper"
      >
        <div className="flex items-center justify-between px-3 py-3 sm:px-4">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-black/10 bg-paper px-3 py-2 text-[13px] text-ink transition-colors hover:bg-surface sm:px-4 sm:py-2.5 sm:text-sm"
            aria-expanded={open}
          >
            {open ? "Fermer" : "Menu"}
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block leading-none"
            >
              +
            </motion.span>
          </button>

          <Link
            href="/"
            aria-label="Tapitout — retour à l'accueil"
            className="absolute left-1/2 -translate-x-1/2 py-3"
          >
            <Image
              src="/images/logo-red.png"
              alt="Tapitout"
              width={1024}
              height={283}
              priority
              className="h-5 w-auto sm:h-7"
            />
          </Link>

          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className="rounded-lg bg-accent px-3 py-2 text-[13px] text-paper transition-colors hover:bg-accent-hover sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <span className="sm:hidden">Contact</span>
            <span className="hidden sm:inline">Nous contacter</span>
          </Link>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-x-3 bottom-3 top-[68px] z-40 overflow-hidden rounded bg-surface"
          >
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
              <div className="flex h-full flex-col justify-between p-8 sm:p-12">
                <nav className="flex flex-col gap-2 pt-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.25 + i * 0.06,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`font-display text-[38px] leading-[1.15] transition-colors hover:text-ink sm:text-5xl ${
                          pathname === link.href ? "text-ink" : "text-muted"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-black/10 pt-6 text-sm text-ink/70">
                  {socialLinks
                    .filter((s) => s.href)
                    .map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-ink"
                      >
                        {s.label}
                      </a>
                    ))}
                </div>
              </div>

              <div className="relative hidden md:block">
                <Image
                  src="/images/menu.jpg"
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
