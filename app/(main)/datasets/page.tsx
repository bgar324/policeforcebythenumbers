import {
  PageHeader,
  PageShell,
  pageDescriptionWideClassName,
  pageMetaLabelClassName,
  pageSectionEyebrowClassName,
  pageTitleStrongClassName,
} from "@/app/components/page-chrome";
import { SiteButton } from "@/app/components/SiteButton";

type FieldDefinition = {
  name: string;
  description: string;
  type: string;
  example: string;
  options?: string[];
  note?: string;
};

const DATA_REPOSITORY_URL =
  "https://github.com/washingtonpost/data-police-shootings/tree/master/v2";
const DEATH_RECORDS_CSV_URL =
  "https://raw.githubusercontent.com/washingtonpost/data-police-shootings/master/v2/fatal-police-shootings-data.csv";
const AGENCIES_CSV_URL =
  "https://raw.githubusercontent.com/washingtonpost/data-police-shootings/master/v2/fatal-police-shootings-agencies.csv";
const CLEANED_CSV_URL = "/static/police_shootings.csv";
const US_POPULATION_CSV_URL = "/static/data/US%20population%201950-2025.csv";

const INCIDENT_FIELDS: FieldDefinition[] = [
  {
    name: "id",
    description: "Unique identifier for each fatal police shooting incident.",
    type: "number",
    example: "2",
  },
  {
    name: "date",
    description: "Date of the fatal shooting.",
    type: "string (YYYY-MM-DD)",
    example: "2020-06-25",
  },
  {
    name: "body_camera",
    description:
      "Whether reporting indicates an officer was wearing a body camera that may have captured part of the incident.",
    type: "boolean",
    example: "True",
  },
  {
    name: "city",
    description: "Municipality where the fatal shooting took place.",
    type: "string",
    example: "New Orleans",
  },
  {
    name: "county",
    description: "County where the fatal shooting took place.",
    type: "string",
    example: "Brown",
  },
  {
    name: "state",
    description:
      "Two-letter postal abbreviation for the state where the shooting occurred.",
    type: "string",
    example: "LA",
  },
  {
    name: "latitude",
    description:
      "Latitude in WGS84 coordinates, geocoded from incident location reporting.",
    type: "decimal number",
    example: "47.246826",
  },
  {
    name: "longitude",
    description:
      "Longitude in WGS84 coordinates, geocoded from incident location reporting.",
    type: "decimal number",
    example: "-123.121592",
  },
  {
    name: "location_precision",
    description:
      "Precision level of the location input used to generate coordinates.",
    type: "string",
    example: "block",
    options: [
      "address: specific address (e.g., 1 Main St.)",
      "poi_small: small point of interest",
      "intersection: road intersection",
      "poi_large: large point of interest",
      "block: block-level location",
      "road: road name",
      "highway: highway name",
      "not_available: entered before current geocoding method",
    ],
  },
];

const VICTIM_FIELDS: FieldDefinition[] = [
  {
    name: "name",
    description: "Name of the victim.",
    type: "string",
    example: "John Doe",
  },
  {
    name: "age",
    description: "Age of the victim at the time of the incident.",
    type: "number",
    example: "23",
  },
  {
    name: "gender",
    description:
      "Gender of the victim, using self-identified gender when reporting indicates it differs from biological sex.",
    type: "string",
    example: "male",
    options: ["male", "female", "non-binary", "-- (unknown)"],
  },
  {
    name: "race",
    description:
      "Race and ethnicity where known. Multiple values can appear for multi-racial or multi-ethnic identification.",
    type: "string",
    example: "B;H",
    options: [
      "W: White",
      "B: Black",
      "A: Asian heritage",
      "N: Native American",
      "H: Hispanic",
      "O: Other",
      "--: Unknown",
    ],
  },
  {
    name: "race_source",
    description: "Method used to determine race information.",
    type: "string",
    example: "public_record",
    options: [
      "public_record",
      "clip",
      "photo",
      "other",
      "not_available",
      "undetermined",
      "null",
    ],
  },
  {
    name: "was_mental_illness_related",
    description:
      "Whether reporting indicates mental health history, distress, or suicidal intent at the time of the shooting.",
    type: "boolean",
    example: "True",
  },
  {
    name: "threat_type",
    description: "Actions the victim took leading up to the fatal shooting.",
    type: "string",
    example: "point",
    options: [
      "shoot: fired a weapon",
      "point: pointed a weapon",
      "attack: attacked with force or another weapon",
      "threat: had a weapon visible to officers",
      "move: moving in a threatening way",
      "flee: fleeing",
      "accident: recorded as accidental circumstances in source reporting",
      "undetermined",
    ],
    note: "This is not necessarily tied to flee_status.",
  },
  {
    name: "armed_with",
    description:
      "Weapon classification, using federal-style categories aligned with NIBRS terminology.",
    type: "string",
    example: "gun;knife",
    options: [
      "gun",
      "knife",
      "blunt_object",
      "other",
      "replica",
      "undetermined",
      "unknown",
      "unarmed",
      "vehicle",
    ],
  },
  {
    name: "flee_status",
    description:
      "How, if at all, the victim was moving relative to officers before the shooting.",
    type: "string",
    example: "foot",
    options: ["foot", "car", "other", "not"],
    note: "This is not necessarily tied to threat_type.",
  },
  {
    name: "agency_ids",
    description:
      "Semicolon-separated agency IDs associated with the incident, used to join with the agencies file.",
    type: "string",
    example: "1;2",
  },
];

const AGENCY_FIELDS: FieldDefinition[] = [
  {
    name: "id",
    description: "Department database ID.",
    type: "integer",
    example: "1",
  },
  {
    name: "name",
    description: "Department or agency name.",
    type: "string",
    example: "Davis County Sheriff's Office",
  },
  {
    name: "type",
    description: "Agency classification.",
    type: "string",
    example: "state_other",
    options: [
      "local_police",
      "local_other",
      "sheriff",
      "other",
      "state_police",
      "state_other",
      "federal",
    ],
  },
  {
    name: "state",
    description: "State where the agency is located.",
    type: "string",
    example: "UT",
  },
  {
    name: "oricodes",
    description:
      "Semicolon-separated federal ORI codes tied to the agency. A single agency may map to multiple ORI codes.",
    type: "string",
    example: "ABC123;XYZ987",
  },
  {
    name: "total_shootings",
    description:
      "Total number of death records in which the agency is involved.",
    type: "integer",
    example: "2",
  },
];

const POPULATION_FIELDS: FieldDefinition[] = [
  {
    name: "Year",
    description:
      "Calendar year used to align annual population totals with the year extracted from incident dates in the shootings data.",
    type: "integer",
    example: "2024",
  },
  {
    name: "Population",
    description:
      "Total U.S. population recorded for that year, used as a reference denominator for contextual and proportional comparisons.",
    type: "integer",
    example: "341814420",
  },
];

function DatasetFieldList({
  heading,
  fields,
  withBottomBorder = true,
}: {
  heading: string;
  fields: FieldDefinition[];
  withBottomBorder?: boolean;
}) {
  return (
    <section
      className={`${withBottomBorder ? "border-b border-black" : ""} px-6 py-10 sm:px-10 sm:py-12`}
    >
      <p className={pageSectionEyebrowClassName}>{heading}</p>

      <div className="mt-5 grid gap-0 border-y border-black">
        {fields.map((field, index) => (
          <article
            key={field.name}
            className={`px-5 py-5 sm:px-6 ${
              index > 0 ? "border-t border-black" : ""
            }`}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-4xl">
                <h3 className="text-2xl font-semibold leading-tight sm:text-[1.9rem]">
                  <code>{field.name}</code>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/80 sm:text-base">
                  {field.description}
                </p>

                {field.options ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {field.options.map((option) => (
                      <li
                        key={option}
                        className="border border-black/20 bg-black/[0.03] px-2 py-1 text-xs leading-relaxed text-black/75"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {field.note ? (
                  <p className="mt-3 text-sm leading-relaxed text-black/70">
                    <span className="font-semibold">Note:</span> {field.note}
                  </p>
                ) : null}
              </div>

              <dl className="grid w-full grid-cols-2 gap-4 border-t border-black pt-4 text-sm lg:w-[260px] lg:border-t-0 lg:pt-0">
                <div>
                  <dt className={pageMetaLabelClassName}>Type</dt>
                  <dd className="mt-1 text-black/80">{field.type}</dd>
                </div>
                <div>
                  <dt className={pageMetaLabelClassName}>Example</dt>
                  <dd className="mt-1 break-words font-mono text-black/80">
                    {field.example}
                  </dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function DatasetsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Data"
        title="Datasets"
        titleClassName={pageTitleStrongClassName}
        description="This project combines Washington Post fatal police shooting records with agency metadata, a cleaned analysis file, and a U.S. population reference series used for contextual comparison."
        descriptionClassName={pageDescriptionWideClassName}
      >
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-black/80">
          Browse the Washington Post source files and documentation in the{" "}
          <a
            href={DATA_REPOSITORY_URL}
            target="_blank"
            rel="noreferrer"
            className="border-b border-black text-black transition-colors duration-150"
            aria-label="Open the Washington Post repository directory in a new tab"
          >
            repository directory
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          . Project-specific cleaned and reference CSVs are available below.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <SiteButton asChild variant="action">
            <a
              href={DEATH_RECORDS_CSV_URL}
              download="fatal-police-shootings-data.csv"
            >
              Preview Death Records CSV
            </a>
          </SiteButton>
          <SiteButton asChild variant="action">
            <a
              href={AGENCIES_CSV_URL}
              download="fatal-police-shootings-agencies.csv"
            >
              Preview Agencies CSV
            </a>
          </SiteButton>
          <SiteButton asChild variant="action">
            <a href={CLEANED_CSV_URL} download="police_shootings.csv">
              Download Cleaned CSV
            </a>
          </SiteButton>
        </div>
      </PageHeader>

      <section className="border-b border-black px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-0 lg:grid-cols-[200px_1fr]">
          <aside className="border-b border-black pb-5 lg:border-r lg:border-b-0 lg:pr-6 lg:pb-0">
            <p className={pageSectionEyebrowClassName}>Data Structure</p>
          </aside>
          <div className="pt-5 lg:pl-6 lg:pt-0">
            <p className="max-w-4xl text-base leading-relaxed text-black/80">
              The project uses four CSV files: Washington Post death records,
              Washington Post agency records, a cleaned incident file used for
              analysis, and a U.S. population reference series. Join the death
              and agency files by matching <code>agency_ids</code> in the death
              records with <code>id</code> in the agencies dataset. For
              population-based comparisons, extract the year from{" "}
              <code>date</code> in the shootings data and align it with{" "}
              <code>Year</code> in the population file.
            </p>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-black/80">
              Agency names were standardized to support consistent analysis, and
              ORI code coverage was expanded through matching work using FBI and
              Department of Justice reference data. Because agency hierarchy
              differs across states, some parent agencies include multiple
              associated ORI codes. The cleaned project file preserves the
              incident-level structure used in our charts while simplifying
              downstream analysis work.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black px-6 py-10 sm:px-10 sm:py-12">
        <p className={pageSectionEyebrowClassName}>File</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
          Death Records
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-black/75">
          <code>/fatal-police-shootings-data.csv</code>
        </p>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-black/80">
          This file contains incident-level and victim-level data, including
          location, demographic fields, and reported circumstances around the
          shooting.
        </p>
      </section>

      <DatasetFieldList
        heading="Incident Information Fields"
        fields={INCIDENT_FIELDS}
      />
      <DatasetFieldList
        heading="Victim Information Fields"
        fields={VICTIM_FIELDS}
      />

      <section className="border-b border-black px-6 py-10 sm:px-10 sm:py-12">
        <p className={pageSectionEyebrowClassName}>File</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
          Agencies
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-black/75">
          <code>/fatal-police-shootings-agencies.csv</code>
        </p>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-black/80">
          This file contains department records for agencies tied to one or more
          fatal police shooting incidents. Use it to classify agencies and
          analyze involvement totals.
        </p>
      </section>

      <DatasetFieldList heading="Agency Fields" fields={AGENCY_FIELDS} />

      <section className="border-b border-black px-6 py-10 sm:px-10 sm:py-12">
        <p className={pageSectionEyebrowClassName}>File</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
          U.S. Population Reference
        </h2>
        {/* <p className="mt-4 text-sm leading-relaxed text-black/75">
          <code>/static/data/US population 1950-2025.csv</code>
        </p> */}
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-black/80">
          This supplementary CSV contains annual U.S. population totals from
          1950 through 2025. It is not an incident file; it provides year-level
          context for population-share and denominator-based comparisons used in
          analysis.
        </p>
        <SiteButton asChild variant="action" className = "mt-8">
          <a
            href={US_POPULATION_CSV_URL}
            download="us-population-1950-2025.csv"
          >
            Download U.S. Population CSV
          </a>
        </SiteButton>
      </section>

      <DatasetFieldList
        heading="Population Reference Fields"
        fields={POPULATION_FIELDS}
        withBottomBorder={false}
      />
    </PageShell>
  );
}
