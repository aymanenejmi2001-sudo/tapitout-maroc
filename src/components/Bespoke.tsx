import fs from "node:fs";
import path from "node:path";
import BespokeStage from "./BespokeStage";
import { bespoke } from "@/lib/site";

/* Bloc expertise. Les fichiers absents sont écartés au rendu : le bloc ne
   montre jamais d'image cassée. */
export default function Bespoke() {
  const slides = bespoke.images.filter((img) =>
    fs.existsSync(path.join(process.cwd(), "public", img.src)),
  );

  if (slides.length === 0) {
    return (
      <section className="px-6 py-16 lg:px-9">
        <div className="flex flex-col items-center justify-center gap-2 rounded bg-sand py-24 text-center">
          <p className="text-base font-medium text-ink">Photos à déposer</p>
          <p className="max-w-[340px] px-6 text-sm text-ink/60">
            Enregistrez vos visuels sous{" "}
            <code className="rounded bg-paper px-1.5 py-0.5">
              public/images/bespoke-1.jpg
            </code>{" "}
            et suivants.
          </p>
        </div>
      </section>
    );
  }

  return <BespokeStage slides={slides} />;
}
