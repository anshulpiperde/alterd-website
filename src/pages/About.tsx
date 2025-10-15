import React from 'react';

const About: React.FC = () => {
  return (
    <main className="bg-zara-white">
      <section className="py-16 border-b border-zara-medium-gray">
        <div className="max-w-[960px] mx-auto px-6">
          <h1 className="text-4xl font-bold tracking-tight mb-6 text-zara-near-black">About Us</h1>
          <div className="space-y-6 text-zara-charcoal leading-relaxed">
            <p>
              Alterd is not just a fashion label — it is a philosophy of identity. Born from the belief that every
              woman holds multitudes within her, Alterd is an ode to the alter ego — that hidden, unapologetic side that
              longs to be revealed.
            </p>
            <p>
              We design for women who refuse to be defined by one version of themselves. She is soft yet unbreakable,
              elegant yet daring, grounded yet untamed. Her style shifts with her mood, her story, her moment — and so
              should her wardrobe.
            </p>
            <p>
              At Alterd, each piece is crafted to embody conscious luxury: timeless silhouettes, versatile forms, and
              customisable details that let every woman shape clothing to her individuality. Our collections blur the
              lines between prêt and couture, between everyday wear and statement ensembles — offering her freedom,
              fluidity, and transformation.
            </p>
            <p>
              We believe clothing is not just something you wear; it is a mirror, a whisper, a rebellion, a revelation.
              With every Alterd creation, she steps closer to the woman she already is, and the woman the world has yet
              to meet.
            </p>
            <p className="font-medium text-zara-near-black">
              Because a woman is never just one. She is infinite.
            </p>
            <p className="font-semibold tracking-wide text-zara-near-black">Alterd. For every self you own.</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[960px] mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-zara-near-black">Brand Story</h2>
          <div className="space-y-6 text-zara-charcoal leading-relaxed">
            <p>
              Every woman carries an alter ego. The side she shows the world, and the side she saves for herself. The
              dreamer. The rebel. The lover. The leader. She is never just one — she is many.
            </p>
            <p>
              Alterd was born from this truth. We set out to create a space where fashion is not about fitting in, but
              about becoming — stepping into the versions of yourself that have always existed beneath the surface.
            </p>
            <p>
              Our pieces are designed as extensions of personality, crafted consciously and shaped to be as versatile as
              the women who wear them. From silhouettes that whisper softness to forms that command attention, Alterd
              moves fluidly between moods, occasions, and identities.
            </p>
            <p>
              We are not just building a wardrobe — we are building a mirror. A mirror that reflects not what she’s told
              to be, but everything she already is, and everything she dares to become.
            </p>
            <p>
              Alterd is the story of duality, desire, and transformation. A brand for women who choose not between
              selves, but embrace them all.
            </p>
            <p className="font-medium text-zara-near-black">Because she is not one. She is infinite.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
