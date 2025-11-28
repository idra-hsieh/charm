"use client";

import { useRouter } from "next/navigation";
import React from "react";

function SignupPlaceholder() {
  const router = useRouter();

  return (
    <main className="fixed inset-0 z-40 overflow-hidden">
      {/* Placeholder Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("/images/signup-placeholder.png")`,
          backgroundSize: "contain",
          backgroundColor: "black",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />

      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="absolute top-10 left-10 lg:top-15 lg:left-15 z-20 text-white/80 hover:text-accent hover:-translate-y-[1px] active:text-accent active:-translate-y-[1px] transition-colors duration-150 font-semibold text-3xl lg:text-4xl"
        aria-label="Go back"
      >
        ←
      </button>

      {/* Centered Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center animate-fade-in">
        <h1 className="text-accent lg:text-6xl text-5xl font-semibold font-primary">
          Coming Soon...
        </h1>
        <p className="font-primary text-white/80 mt-6 text-md lg:text-lg">
          This feature is under development.
        </p>
      </div>
    </main>
  );
}

export default SignupPlaceholder;
