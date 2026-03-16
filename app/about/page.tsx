"use client";

export default function About() {
  return (
    <section className="min-h-screen flex justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start animate-in fade-in slide-in-from-bottom duration-700">

        {/* Linker kolom */}
        <div className="text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6">
            Over Mij
          </h1>

          <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4 sm:mb-6">
            Creatieve ontwikkelaar met oog voor detail
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. 
            Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
            Praesent mauris. Fusce nec tellus sed augue semper porta.
          </p>
        </div>

        {/* Rechter kolom */}
        <div className="flex justify-center md:justify-end mt-8 md:mt-0">
          <img
            src="/about-image.jpg"
            alt="About afbeelding"
            className="rounded-3xl shadow-2xl max-w-xs sm:max-w-sm md:max-w-md w-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}