export function LogoQuantum() {
  return (
    <div className="group relative cursor-pointer">
      <div className="absolute -inset-4 rounded-full bg-[#1de0b1]/20 opacity-0 blur-2xl transition-all duration-700 animate-pulse group-hover:opacity-100" />
      <svg
        className="relative z-10 h-14 w-14"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="qGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1de0b1" />
            <stop offset="50%" stopColor="#00f2ff" />
            <stop offset="100%" stopColor="#1de0b1" />
          </linearGradient>
        </defs>
        <path
          d="M50 10L90 30V70L50 90L10 70V30L50 10Z"
          stroke="url(#qGrad)"
          strokeWidth="1.5"
          className="animate-[spin_10s_linear_infinite]"
          style={{ transformOrigin: "center" }}
        />
        <path
          d="M50 25L75 38V62L50 75L25 62V38L50 25Z"
          fill="url(#qGrad)"
          fillOpacity="0.1"
          stroke="url(#qGrad)"
          strokeWidth="0.5"
        />
        <circle cx="50" cy="50" r="10" className="fill-[#1de0b1]">
          <animate
            attributeName="r"
            values="8;12;8"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <path
          d="M50 10V25M50 75V90M10 30L25 38M75 38L90 30M10 70L25 62M75 62L90 70"
          stroke="url(#qGrad)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
