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
