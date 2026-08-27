import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import ScrollText from "./ScrollText";

export default function Intro() {
  return (
    <section className="px-3 pt-3">
      <div className="rounded bg-ink px-6 py-20 text-center lg:py-28">
        <Reveal>
          <Image
            src="/images/logo-alt.png"
            alt=""
            width={1024}
            height={283}
            className="mx-auto h-[30px] w-auto opacity-90"
          />
        </Reveal>

        {/* La phrase s'allume mot à mot au fil du défilement : c'est le
            bloc où le visiteur ralentit, autant lui donner le rythme. */}
        <h2 className="mx-auto mt-10 max-w-[940px]">
          <ScrollText className="font-display text-[28px] leading-[1.28] text-paper sm:text-5xl sm:leading-[1.2] lg:text-[60px] lg:leading-[72px]">
            Chaque intérieur a ses dimensions. Nous les relevons, puis nous façonnons la pièce qui leur répond exactement.
          </ScrollText>
        </h2>

        <Reveal delay={0.16}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/collections"
              className="rounded bg-paper px-6 py-3.5 text-base font-medium text-ink transition-opacity hover:opacity-85"
            >
              Voir nos collections
            </Link>
            <Link
              href="/contact"
              className="rounded bg-accent px-6 py-3.5 text-base font-medium text-paper transition-colors hover:bg-accent-hover"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </Reveal>

        {/* Emplacement du bandeau partenaires : y placer les logos des
            architectes, hôtels et enseignes avec qui vous travaillez. */}
      </div>
    </section>
  );
}
