import { cn } from "@/lib/utils";

type GraphicProps = {
  className?: string;
};

const frameClassName =
  "site-grid-surface aspect-[4/3] w-full overflow-hidden border-[1.5px] border-black bg-[rgb(var(--site-paper-rgb))]";

export function ProjectPulseGraphic({ className }: GraphicProps) {
  return (
    <div className={cn(frameClassName, className)}>
      <svg
        viewBox="0 0 320 240"
        className="h-full w-full text-black"
        aria-hidden
      >
        <rect x="18" y="18" width="284" height="204" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M25 174H72L96 120L124 154L151 94L183 171L212 134L236 156H294"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx="96" cy="120" r="7" fill="currentColor" />
        <circle cx="151" cy="94" r="7" fill="currentColor" />
        <circle cx="212" cy="134" r="7" fill="currentColor" />
        <rect x="34" y="40" width="92" height="24" fill="currentColor" />
        <rect x="140" y="40" width="56" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="208" y="40" width="78" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="44" y="56" fontSize="12" fill="white" letterSpacing="2.5">
          DATA
        </text>
        <text x="152" y="56" fontSize="12" fill="currentColor" letterSpacing="2.5">
          TIME
        </text>
        <text x="221" y="56" fontSize="12" fill="currentColor" letterSpacing="2.5">
          POWER
        </text>
      </svg>
    </div>
  );
}

export function TimelinePosterGraphic({ className }: GraphicProps) {
  return (
    <div className={cn(frameClassName, className)}>
      <svg
        viewBox="0 0 320 240"
        className="h-full w-full text-black"
        aria-hidden
      >
        <rect x="26" y="28" width="268" height="184" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M54 170H268" stroke="currentColor" strokeWidth="3" />
        {[62, 104, 150, 196, 242].map((x, index) => (
          <g key={x}>
            <circle
              cx={x}
              cy="170"
              r={index === 2 ? "10" : "7"}
              fill={index === 2 ? "currentColor" : "white"}
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d={`M${x} 163V${index % 2 === 0 ? 96 : 122}`}
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </g>
        ))}
        <rect x="46" y="62" width="70" height="20" fill="currentColor" />
        <rect x="124" y="114" width="92" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="222" y="80" width="44" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="55" y="76" fontSize="11" fill="white" letterSpacing="2.2">
          2016
        </text>
        <text x="132" y="128" fontSize="11" fill="currentColor" letterSpacing="2.2">
          2020
        </text>
        <text x="228" y="94" fontSize="11" fill="currentColor" letterSpacing="2.2">
          2023
        </text>
      </svg>
    </div>
  );
}

export function DatasetSchemaGraphic({ className }: GraphicProps) {
  return (
    <div className={cn(frameClassName, className)}>
      <svg
        viewBox="0 0 320 240"
        className="h-full w-full text-black"
        aria-hidden
      >
        <rect x="28" y="34" width="112" height="174" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="180" y="34" width="112" height="174" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {[58, 88, 118, 148, 178].map((y) => (
          <path key={y} d={`M28 ${y}H140`} stroke="currentColor" strokeWidth="1" />
        ))}
        {[58, 88, 118, 148, 178].map((y) => (
          <path key={y} d={`M180 ${y}H292`} stroke="currentColor" strokeWidth="1" />
        ))}
        <path
          d="M140 94H170M162 86L170 94L162 102"
          stroke="currentColor"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M140 148H170M162 140L170 148L162 156"
          stroke="currentColor"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="40" y="42" width="56" height="8" fill="currentColor" />
        <rect x="192" y="42" width="56" height="8" fill="currentColor" />
        <rect x="40" y="72" width="76" height="8" fill="currentColor" fillOpacity="0.65" />
        <rect x="192" y="72" width="44" height="8" fill="currentColor" fillOpacity="0.65" />
        <rect x="40" y="132" width="80" height="8" fill="currentColor" fillOpacity="0.4" />
        <rect x="192" y="132" width="76" height="8" fill="currentColor" fillOpacity="0.4" />
        <text x="156" y="116" fontSize="10" fill="currentColor" letterSpacing="2.2">
          JOIN
        </text>
      </svg>
    </div>
  );
}

export function AnalysisThreadsGraphic({ className }: GraphicProps) {
  return (
    <div className={cn(frameClassName, className)}>
      <svg
        viewBox="0 0 320 240"
        className="h-full w-full text-black"
        aria-hidden
      >
        <rect x="24" y="30" width="272" height="180" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M54 182V58H272" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path
          d="M56 162C92 152 110 118 138 108C166 98 196 100 226 84C240 76 252 66 270 54"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M56 138C88 144 116 136 146 120C177 104 214 82 270 78"
          stroke="currentColor"
          strokeWidth="2.2"
          fill="none"
          strokeDasharray="7 5"
        />
        <path
          d="M56 110C92 120 128 126 164 118C206 109 235 100 270 108"
          stroke="currentColor"
          strokeWidth="2.2"
          fill="none"
        />
        <circle cx="138" cy="108" r="6" fill="currentColor" />
        <circle cx="226" cy="84" r="6" fill="white" stroke="currentColor" strokeWidth="2" />
        <rect x="66" y="44" width="64" height="18" fill="currentColor" />
        <text x="74" y="56" fontSize="10" fill="white" letterSpacing="2">
          PATTERNS
        </text>
      </svg>
    </div>
  );
}

export function LeavingInterstitialGraphic({ className }: GraphicProps) {
  return (
    <div className={cn("relative aspect-square w-full max-w-[640px]", className)}>
      <svg
        viewBox="0 0 640 640"
        className="h-full w-full text-black"
        aria-hidden
      >
        <path
          d="M0 320H640M320 0V640"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1.5"
        />
        <circle
          cx="320"
          cy="320"
          r="258"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />
        <ellipse
          cx="320"
          cy="320"
          rx="182"
          ry="258"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.14"
          strokeWidth="1.5"
        />
        <ellipse
          cx="320"
          cy="320"
          rx="258"
          ry="182"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.14"
          strokeWidth="1.5"
        />
        <rect
          x="172"
          y="172"
          width="296"
          height="296"
          fill="#ffffff"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <svg x="220" y="220" width="200" height="200" viewBox="0 0 32 32">
          <rect width="32" height="32" rx="4" fill="black" />
          <g transform="translate(6.4 25.1) scale(1.18)">
            <path
              fill="white"
              d="M0.99-8.33C0.90-7.88 0.94-7.42 1.09-7.00L1.65-7.00C1.64-7.02 1.64-7.05 1.64-7.08C1.65-7.32 1.72-7.56 1.88-7.74C1.97-7.84 2.08-7.91 2.19-7.97C2.31-8.02 2.44-8.05 2.57-8.06C2.83-8.09 3.35-8.08 3.35-8.08C3.48-8.08 3.62-8.08 3.76-8.08L3.76-3.59C2.34-2.86 1.13-1.72 0.36-0.32L0.91-0.32C1.68-1.15 2.68-1.76 3.76-2.07L3.76 1.99L3.76 2.68L7.13 2.68L8.63 2.68L8.63 1.99L8.63 1.99L8.63-1.41C8.96-1.20 9.28-0.97 9.56-0.71L15.86-4.10L15.86-15.34C15.46-15.89 15.01-16.41 14.53-16.90C14.02-17.40 13.47-17.86 12.89-18.26L8.63-15.16L8.63-17.69L7.94-17.69L7.94-14.66L7.13-14.07L7.13-14.50C7.13-14.87 7.12-15.25 7.05-15.61C6.98-15.98 6.84-16.33 6.62-16.64C6.40-16.94 6.12-17.20 5.79-17.38C5.46-17.56 5.10-17.67 4.73-17.71C4.13-17.78 3.52-17.67 2.97-17.42C2.42-17.17 1.95-16.76 1.62-16.26C1.32-15.80 1.15-15.27 1.13-14.72L1.71-14.72C1.74-14.92 1.81-15.11 1.92-15.29C2.08-15.55 2.32-15.76 2.61-15.84C2.75-15.88 2.91-15.88 3.06-15.85C3.20-15.81 3.34-15.73 3.44-15.62C3.59-15.48 3.68-15.28 3.72-15.07C3.76-14.87 3.76-14.66 3.76-14.45L3.76-10.48C3.34-10.50 2.91-10.42 2.52-10.25C2.13-10.08 1.78-9.81 1.52-9.48C1.25-9.15 1.06-8.75 0.99-8.33ZM8.63-9.91C8.63-11.41 8.63-12.91 8.63-14.41L10.55-15.77C10.92-15.49 11.29-15.20 11.64-14.89C12.05-14.53 12.44-14.14 12.80-13.73L12.80-12.01ZM8.63-9.14L12.80-11.24L12.80-9.49L8.63-7.39ZM8.63-6.62L12.80-8.72L12.80-3.25L12.27-2.94C11.20-3.72 9.94-4.23 8.63-4.42ZM7.94-13.93C7.94-10.78 7.94-7.64 7.94-4.49C7.67-4.51 7.40-4.51 7.13-4.50L7.13-13.35ZM7.94-1.77C7.94-0.51 7.94 0.74 7.94 1.99L7.13 1.99L7.13-2.06C7.40-1.98 7.68-1.88 7.94-1.77Z"
            />
          </g>
        </svg>
      </svg>
    </div>
  );
}
