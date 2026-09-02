"use client";

const NAV_LINKS = ["Wearable", "Neural", "Programs", "Updates", "Search"];

export default function Navbar() {
  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-[560px] px-4">
      <nav className="nav-pill flex items-center gap-1 rounded-full bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.25)] px-2 py-2">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 mr-1 shrink-0">
          <StarIcon className="w-4 h-4 text-black" />
        </div>
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="hidden sm:block text-[13px] font-medium text-neutral-800 hover:text-black px-3 py-2 rounded-full hover:bg-neutral-100 transition-colors whitespace-nowrap"
          >
            {link}
          </a>
        ))}
        <a
          href="#"
          className="text-[13px] font-semibold text-white bg-black rounded-full px-4 py-2 ml-1 whitespace-nowrap hover:bg-neutral-800 transition-colors"
        >
          Get Started
        </a>
      </nav>
    </header>
  );
}

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C12 6 14 10 18 12C14 14 12 18 12 24C12 18 10 14 6 12C10 10 12 6 12 0Z" />
    </svg>
  );
}
