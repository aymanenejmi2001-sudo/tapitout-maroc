import Image from "next/image";
import Section from "./Section";
import Reveal from "./Reveal";
import { services } from "@/lib/site";

/* Les six prestations, en vis-à-vis alterné image / texte.

   La version précédente empilait six cartes de texte identiques : sur un
   site qui vend de la matière, six blocs blancs à la suite ne donnent
   aucune envie de descendre. Ici chaque prestation a son image, et le sens
   de lecture s'inverse à chaque étape — c'est ce basculement qui entretient
   l'attention sur une page longue. */
export default function Services() {
  return (
    <Section>
      <div className="space-y-20 lg:space-y-28">
        {services.map((service, i) => {
          const inverse = i % 2 === 1;

          return (
            <article
              key={service.title}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <Reveal className={inverse ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.1} className={inverse ? "lg:order-1" : ""}>
                <div className="max-w-[540px]">
                  <p className="flex items-center gap-3 text-sm font-medium text-accent">
                    <span aria-hidden className="h-px w-7 bg-accent" />
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-5 font-display text-[30px] leading-[1.1] text-ink lg:text-[42px]">
                    {service.title}
                  </h2>
                  <p className="mt-6 text-lg leading-[1.6] text-ink/75">
                    {service.body}
                  </p>
                </div>
              </Reveal>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
