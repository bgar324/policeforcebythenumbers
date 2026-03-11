"use client";

import {
  PageHeader,
  PageShell,
  pageDescriptionWideClassName,
  pageMetaLabelClassName,
  pageTitleStrongClassName,
} from "@/app/components/page-chrome";
import { SiteButton } from "@/app/components/SiteButton";
import { useEffect, useRef, useState } from "react";

type BibliographyEntry = {
  citation: string;
  summary: string;
  fullAnnotation: string;
  sourceUrl: string;
};

const BIBLIOGRAPHY_ENTRIES: BibliographyEntry[] = [
  {
    citation:
      "Charbonneau, Amanda, et al. “Understanding Racial Disparities in Police Use of Lethal Force: Lessons from Fatal Police-on-Police Shootings.” Journal of Social Issues, vol. 73, no. 4, Dec. 2017, pp. 744–67. EBSCOhost, https://doi.org/10.1111/josi.12246.",
    summary:
      "Charbonneau, Spencer, and Glaser argue that the striking racial disparity in fatal mistaken-identity police-on-police shootings reveals how racialized threat perception operates within police decision-making.",
    fullAnnotation:
      "Charbonneau, Spencer, and Glaser argue that the striking racial disparity in fatal mistaken-identity police-on-police shootings, particularly among off-duty officers, reveals how racialized threat perception operates within police decision-making. The authors analyze 26 fatal cases from 1981 to 2009 using FBI LEOKA data, New York State Task Force reports, Bureau of Justice Statistics demographic benchmarks, probability modeling, and psychological research on implicit bias, weapon perception, and shooter bias. This source is especially important because it isolates cases in which the victims were definitively not criminal threats, allowing racial disparity to be examined without debates over civilian culpability or crime rates, since the victims were off-duty police officers. For our analysis, which draws on the Washington Post fatal police shootings dataset focused primarily on civilian victims, this article provides a critical comparative frame: even when the victims are police officers themselves, similar racial disparities persist. By shifting the focus away from civilian behavior, mental health status, or geographic location and toward perception, ambiguity, and institutional decision-making, this source strengthens our argument that the disparities reflected in the Washington Post dataset are embedded in broader structures of threat classification and racialized interpretation.",
    sourceUrl: "https://doi.org/10.1111/josi.12246",
  },
  {
    citation:
      "Culhane, Scott E., and Jessie L. Wiser. “Juvenile Fatalities in Law Enforcement Encounters.” Journal of Criminal Justice, vol. 95, Nov. 2024, p. 102292. DOI.org (Crossref), https://doi.org/10.1016/j.jcrimjus.2024.102292.",
    summary:
      "This resource argues that even in juvenile cases, race is a major factor in fatal police shootings.",
    fullAnnotation:
      "This resource argues that even in juvenile cases, race is a major factor in fatal police shootings. This resource uses many sources of evidence, mainly the FBI’s annual Law Enforcement Officers Killed and Assaulted (LEOKA) publication. This source is important because it explores the relationship between age and race in fatal police shootings. This source is helpful for our thesis because we can potentially find a link between two of the variables in our data set (race and age).",
    sourceUrl: "https://doi.org/10.1016/j.jcrimjus.2024.102292",
  },
  {
    citation:
      "Hemenway, David, et al. “Variation in Rates of Fatal Police Shootings across US States: The Role of Firearm Availability.” Journal of Urban Health : Bulletin of the New York Academy of Medicine, vol. 96, no. 1, Feb. 2019, pp. 63–73. PubMed Central, https://doi.org/10.1007/s11524-018-0313-z.",
    summary:
      "Hemenway and colleagues analyze state-level variation in fatal police shootings and explore how firearm availability contributes to those differences.",
    fullAnnotation:
      "Hemenway and colleagues analyze state-level variation in fatal police shootings in the United States and explore how firearm availability contributes to these differences. They note that the U.S. experiences around 1,000 civilian deaths annually in police encounters, most from gunshots. The authors compile data from media-based tracking repositories that are more complete than federal systems, which allows them to assess the relationship between fatal shootings and predictors like violent crime rates and firearm prevalence. Their findings suggest that states with higher gun availability tend to have higher rates of police-involved shootings even after accounting for violent crime. This work situates police homicides within broader public health and policy discussions about firearm regulation and law enforcement practices. The article underscores the importance of structural factors like access to firearms in shaping lethal outcomes in police-civilian encounters and prompts consideration of policy strategies to reduce such deaths.",
    sourceUrl: "https://doi.org/10.1007/s11524-018-0313-z",
  },
  {
    citation:
      "Henderson, Howard, et al. “Police Shootings, Violent Crime, Race and Socio‐economic Factors in Municipalities in the United States of America.” Criminal Behaviour and Mental Health, vol. 34, no. 3, June 2024, pp. 296–310. DOI.org (Crossref), https://doi.org/10.1002/cbm.2333.",
    summary:
      "This article argues that socio-economic conditions and community factors play a larger role in police shootings than race alone when controls are applied.",
    fullAnnotation:
      "This article argues that socio-economic conditions and community factors play a larger role in police shootings than race alone when statistical controls are applied. The authors use regression analysis of publicly available health, crime, and police-shooting data from the 100 largest U.S. municipalities to test relationships among race, mental health indicators, and violence rates. It provides a data-driven framework for interpreting patterns in fatal police shootings beyond individual incidents, with a conclusion being drawn that police shootings are mainly correlated to community level mental health concerns, food insecurity and the municipality's violent crime rate. These findings can help contextualize trends, like mental health and race, in our dataset within broader structural factors that influence fatal police shootings across communities.",
    sourceUrl: "https://doi.org/10.1002/cbm.2333",
  },
  {
    citation:
      "Khan, Harun, et al. “Fatal Police Shootings of Victims with Mental Health Crises: A Descriptive Analysis of Data from the 2014–2015 National Violent Death Reporting System.” Journal of Urban Health : Bulletin of the New York Academy of Medicine, vol. 101, no. 2, Apr. 2024, pp. 262–71. PubMed Central, https://doi.org/10.1007/s11524-024-00833-3.",
    summary:
      "Khan and colleagues analyze fatal police shootings involving people experiencing a mental health crisis using NVDRS data.",
    fullAnnotation:
      "Khan and colleagues analyze fatal police shootings in the U.S. that involved people experiencing a mental health crisis, using data from the National Violent Death Reporting System. They document that a substantial share of lethal police encounters involve individuals with signs of a mental health condition, including crisis indicators or substance use, and that these encounters disproportionately result in fatalities compared with other officer-involved shootings. The authors examine demographic patterns, situational characteristics, and precipitating factors, noting that many fatal incidents involve calls for help by family members or emergency services where mental health symptoms were evident. Consistent with broader public health research, they find that individuals in crisis are often treated as criminal legal system problems rather than medical or community health issues, which contributes to escalated use of force and fatal outcomes even when less lethal responses could be deployed. Their analysis suggests that alternative response systems, such as mental health–led crisis teams or enhanced de-escalation training for police, may reduce fatal encounters by shifting initial responses away from traditional law enforcement. They also discuss racial and social disparities in these shootings, mirroring documented patterns of structural disadvantage and policing harms noted in related literature. Khan et al. highlight the need for better data collection on nonfatal police encounters and mental health interactions to inform prevention and policy strategies.",
    sourceUrl: "https://doi.org/10.1007/s11524-024-00833-3",
  },
  {
    citation:
      "Kim, Taeho. “Facilitating Police Reform: Body Cameras, Police-Involved Homicides, and Law Enforcement Outcomes.” Journal of Public Economics, vol. 248, Aug. 2025, p. 105424. ScienceDirect, https://doi.org/10.1016/j.jpubeco.2025.105424.",
    summary:
      "Kim investigates how body-worn camera adoption influences deadly-force outcomes across U.S. law enforcement agencies.",
    fullAnnotation:
      "Kim investigates how the adoption of body-worn cameras (BWCs) influences police use of deadly force and related outcomes across U.S. law enforcement agencies. Using a quasi-experimental event study design with data from 593 agencies, he finds that reductions in police-involved homicides occur mainly in areas with high prior levels of such incidents and where agencies have stricter camera activation policies. The study shows that the impact of BWCs is not uniform; places with weaker policies or low baseline incidents see little change. Kim also examines whether cameras affect agency-wide measures like arrest rates and overall crime but finds no clear evidence of major trade-offs in these outcomes. His analysis highlights the conditions under which BWCs are most likely to improve police accountability and reduce lethal interventions while maintaining other aspects of law enforcement performance.",
    sourceUrl: "https://doi.org/10.1016/j.jpubeco.2025.105424",
  },
  {
    citation:
      "Lett, Elle, et al. “Racial Inequity in Fatal US Police Shootings, 2015–2020.” Journal of Epidemiology and Community Health (1979-), vol. 75, no. 4, 2021, pp. 394–97. JSTOR, https://www.jstor.org/stable/27350890. Accessed 6 Feb. 2026.",
    summary:
      "Lett et al. argues that fatal police shootings are a sustained public health crisis marked by persistent racial inequities.",
    fullAnnotation:
      "Lett et al. argues that fatal police shootings account for a sustained public health crisis marked by measurable and persistent racial inequities, particularly for Black, Hispanic, and Native American communities, including among unarmed victims. Using data from the Washington Post database (2015–2020), the authors use statistical models to measure death rates and years of life lost by race, while categorizing victims as “unarmed” and removing cases with missing racial data. This source is important because it showcases how the statistical structuring of a publicly curated dataset transforms individual deaths into quantifiable patterns of inequity, making structural disparities visible over time. For our project, which relies on the same Washington Post dataset, this article offers both methodological grounding and a model for reading the data critically: the way victims are categorized, counted, and excluded directly shapes the narrative the dataset tells. By showing that disparities remain steady over time and extend to unarmed victims, this source strengthens our claim that the patterns in the dataset are not accidental, but the product of calculated systems of racialized threat perception and institutional power.",
    sourceUrl: "https://www.jstor.org/stable/27350890",
  },
  {
    citation:
      "Lum, Cynthia, et al. “Body‐worn Cameras’ Effects on Police Officers and Citizen Behavior: A Systematic Review.” Campbell Systematic Reviews, vol. 16, no. 3, Sept. 2020, p. e1112. PubMed Central, https://doi.org/10.1002/cl2.1112.",
    summary:
      "Lum et al. argue that body-worn cameras do not produce clear or consistent effects across most officer and citizen behavior outcomes.",
    fullAnnotation:
      "Lum et al. argue that body-worn cameras (BWCs) do not produce clear or consistent effects on most measured officer or citizen behaviors, and that any benefits likely depend on implementation conditions. They support this by systematically synthesizing 30 independent studies and coding 116 effect sizes, then using inverse-variance weighted random-effects meta-analysis (with RIRR-based effects) across multiple behavioral outcomes. This review is important because it tests a popular “tech fix” reform using the strongest available causal evidence base rather than anecdotes or single-city results. For a thesis evaluating what reforms plausibly reduce harmful policing outcomes, it provides a defensible baseline: BWCs alone are unlikely to reliably shift behavior, so claims of effectiveness should be tied to policy design and complementary reforms rather than mere adoption.",
    sourceUrl: "https://doi.org/10.1002/cl2.1112",
  },
  {
    citation:
      "Peeples, Lynne. “What the Data Say about Police Brutality and Racial Bias — and Which Reforms Might Work.” Nature, vol. 583, no. 7814, June 2020, pp. 22–24. www.nature.com, https://doi.org/10.1038/d41586-020-01846-z.",
    summary:
      "Lynne Peeples synthesizes empirical research on police violence and racial disparities, while reviewing proposed reforms and data limits.",
    fullAnnotation:
      "Lynne Peeples synthesizes emerging empirical research on police violence and racial disparities in the United States. The article reviews multiple large-scale datasets and academic studies, highlighting consistent evidence that Black Americans face a higher risk of police use of force compared with white Americans, even after accounting for some contextual factors. Peeples also discusses the limitations of existing data, emphasizing gaps in national reporting systems and the methodological challenges researchers face when measuring police misconduct and bias. Importantly, the piece evaluates several proposed reforms—such as body cameras, de-escalation training, and policy changes—while noting that the evidence for their effectiveness is mixed and still developing. This source is useful for providing an evidence-based overview of the current research landscape on policing and racial bias. Because it appears in Nature, a highly reputable scientific journal, the article is credible and grounded in peer-reviewed studies, though it functions as a secondary synthesis rather than original research. I can use this source to support claims about what the data do—and do not—show regarding racial disparities in police use of force, as well as to introduce the complexity and uncertainty surrounding proposed reforms.",
    sourceUrl: "https://doi.org/10.1038/d41586-020-01846-z",
  },
  {
    citation:
      "Peeples, Lynne. “What the Data Say about Police Shootings.” Nature, vol. 573, no. 7772, Sept. 2019, pp. 24–26, https://doi.org/10.1038/d41586-019-02601-9.",
    summary:
      "Peeples argues that while datasets show racial disparities, evidence on which reforms reduce bias and violence remains limited and inconsistent.",
    fullAnnotation:
      "Peeples argues that while there are increasing datasets that reveal clear racial disparities in police use of force, the scientific evidence for which reforms actually reduce bias and violence remains limited and inconsistent. The article summarizes findings from criminology, economics, and public health research, drawing on national datasets, studies of body cameras and de-escalation training, administrative police records, and large-scale analyses of 911 call responses to examine both patterns of racial bias and proposed interventions. This source is important because it emphasizes that policing data are often incomplete, inconsistently collected, and shaped by voluntary reporting, which directly affects what researchers are able to measure and what the public sees and understands. By acknowledging that federal datasets rely on voluntary participation and that most agencies do not systematically collect use-of-force data, the article highlights how institutional choices shape the visibility of racial disparities in the first place. For our project in particular, which relies on the Washington Post fatal police shootings dataset, this article provides critical context for thinking about how data are constructed and where gaps may exist, especially within the racial/ethnic groups. By highlighting both the insights and the limits of existing data, this source strengthens our argument that datasets do not simply record police violence, but actively shape how racial bias and reform are interpreted.",
    sourceUrl: "https://doi.org/10.1038/d41586-019-02601-9",
  },
  {
    citation:
      "Petersson, Ulf, et al. “Police Officer Involved Shootings - Retrospective Study of Situational Characteristics.” Police Practice & Research [ABINGDON], vol. 18, no. 3, 2017, pp. 306–21, https://doi.org/10.1080/15614263.2017.1291592.",
    summary:
      "In this retrospective study, Petersson and colleagues examine situational factors surrounding police officer-involved shootings.",
    fullAnnotation:
      "In this retrospective study, Petersson and colleagues examine the situational factors surrounding police officer–involved shootings. Using case data, the authors analyze patterns such as suspect behavior, weapon presence, environmental context, and officer characteristics to identify common conditions under which shootings occur. Their findings suggest that most incidents involve rapidly evolving, high-threat situations—often including armed suspects—which highlights the role of situational risk rather than any single causal factor. The study emphasizes the importance of understanding the contextual dynamics of encounters when evaluating police use of deadly force and designing training or policy interventions. This source is useful because it provides a situational and practice-oriented perspective that complements broader statistical analyses of racial disparities. Published in the peer-reviewed journal Police Practice & Research, the article offers empirical evidence that can inform discussions about officer decision-making and use-of-force training. I can use this study to add nuance to arguments about police shootings by incorporating the role of immediate situational characteristics alongside structural or demographic explanations.",
    sourceUrl: "https://doi.org/10.1080/15614263.2017.1291592",
  },
  {
    citation:
      "Scott, Kendra, et al. “A Social Scientific Approach toward Understanding Racial Disparities in Police Shooting: Data from the Department of Justice (1980-2000).” Journal of Social Issues, vol. 73, no. 4, Dec. 2017, pp. 701–722, https://doi.org/10.1111/josi.12243.",
    summary:
      "Scott and colleagues analyze DOJ data from 213 metropolitan areas over 21 years to investigate racial disparities in police shootings.",
    fullAnnotation:
      "Scott and colleagues analyze Department of Justice data from 213 U.S. metropolitan areas over a 21-year period to investigate racial disparities in police shootings. The authors test two competing explanations: racial bias by police versus differences in suspect behavior (proxied by crime and arrest rates). Using multivariate statistical models that control for demographic and crime variables, the study finds that police are more likely to shoot Black suspects than White suspects even after accounting for racial differences in criminal activity. The authors also discuss how training, exposure, and situational factors may influence officers’ decision-making processes. This source is valuable because it provides large-scale quantitative evidence on racial disparities using official DOJ data and explicit statistical controls. Published in the peer-reviewed Journal of Social Issues, the article is methodologically rigorous and directly relevant to debates about whether disparities reflect bias or contextual factors. I can use this study to support claims about persistent racial disparities in police shootings and to introduce the competing theoretical frameworks that scholars use to interpret these patterns.",
    sourceUrl: "https://doi.org/10.1111/josi.12243",
  },
  {
    citation:
      "Shrikant, Natasha, and Rahul Sambaraju. “‘A Police Officer Shot a Black Man’: Racial Categorization, Racism, and Mundane Culpability in News Reports of Police Shootings of Black People in the United States of America.” British Journal of Social Psychology, vol. 60, no. 4, Oct. 2021, pp. 1196–217. DOI.org (Crossref), https://doi.org/10.1111/bjso.12490.",
    summary:
      "The article looks into how news language and racial categorization shape interpretations of responsibility in reports about police shootings.",
    fullAnnotation:
      "The article looks into the way news media language and racial categorization shapes how responsibility and culpability are interpreted in reports about police shootings of Black individuals. The authors analyze news coverage from May–October 2020 using membership categorization analysis to examine how journalists frame police officers, victims, and accountability. The significance behind this article is that it shows how public understanding of police shootings is influenced not only by data but also by media framing and discourse, such as racial categorizations of victims in ways that foreground their moral characters and racial categorizations of police officers to highlight racism as an explanation for shootings. This article can help provide context for how narratives about race and police violence may shape interpretation of patterns in our dataset and whether these patterns are still present years later.",
    sourceUrl: "https://doi.org/10.1111/bjso.12490",
  },
  {
    citation:
      "Thomas, Marilyn D, et al. “Black and Unarmed: Statistical Interaction between Age, Perceived Mental Illness, and Geographic Region among Males Fatally Shot by Police Using Case-Only Design.” Annals of Epidemiology, vol. 53, Jan. 2021, pp. 42-49.e3. PubMed Central, https://doi.org/10.1016/j.annepidem.2020.08.014.",
    summary:
      "Thomas et al. argue that racial disparities in fatal police shootings are context-dependent across age, region, and perceived mental illness.",
    fullAnnotation:
      "Thomas et al. argue that racial disparities in fatal police shootings are context-dependent, showing that race and armed status can interact differently across age groups, perceived mental illness status, and geographic region among men fatally shot by police. They use The Washington Post’s fatal shooting database (2015–2019) for Black and White males with known armed status (N=3,090) and apply a case-only design with adjusted logistic regression to estimate multiplicative interaction. This is important because it demonstrates that disparities are not uniform and identifies specific strata where the “Black and unarmed” pattern is most pronounced and it models interaction in a way that avoids needing a traditional population control group. For a thesis arguing that lethal policing disparities are shaped by intersecting demographic and regional factors, this article provides both the statistical framework and concrete subgroup findings (e.g., stronger unarmed disparity among men over 54, those showing mental illness signs, and those killed in the South).",
    sourceUrl: "https://doi.org/10.1016/j.annepidem.2020.08.014",
  },
  {
    citation:
      "Walsh, Anthony. “The Rhetoric and Reality of Police Shootings and the Black Lives Matter Movement.” Mankind Quarterly, vol. 63, no. 2, 2022, pp. 323–50. DOI.org (Crossref), https://doi.org/10.46469/mq.2022.63.2.11.",
    summary:
      "This paper talks about how Black people are disproportionately shot and killed by police officers than any other race.",
    fullAnnotation:
      "This paper talks about how Black people are disproportionately shot and killed by police officers than any other race. It uses key facts from police shootings statistics around the country. This resource is important because it provides a more specific context for our research. This source focuses on Black individuals and how fatal police shootings affect their community. One of our research questions focuses on how different patterns in race affect the number of fatal police shootings in the area. This source helps with explaining how the Black community suffers more from this.",
    sourceUrl: "https://doi.org/10.46469/mq.2022.63.2.11",
  },
  {
    citation:
      "Ward, Julie A., et al. “National Burden of Injury and Deaths From Shootings by Police in the United States, 2015‒2020.” American Journal of Public Health, vol. 114, no. 4, Apr. 2024, pp. 387–97. PubMed Central, https://doi.org/10.2105/AJPH.2023.307560.",
    summary:
      "This article compares fatal and nonfatal police shootings nationally and argues that fatal-only counts underestimate injury disparities.",
    fullAnnotation:
      "This article looks into describing all-outcome injurious shootings by police and compares the characteristics that are found in fatal versus nonfatal police shootings nationally, determining that injury disparities are underestimated by fatal shootings alone. The authors use a nationwide dataset compiled from the Gun Violence Archive and manually reviewed records of injurious shootings between 2015 and 2020, applying statistical models to compare fatal and nonfatal outcomes across demographic and situational variables. This article is important because it provides large-scale empirical data on injury outcomes, mental-health involvement, and demographic patterns. The emphasis on mental and behavioral health related victims being more frequently fatally shot can bolster the patterns seen in our dataset regarding mental health status.",
    sourceUrl: "https://doi.org/10.2105/AJPH.2023.307560",
  },
  {
    citation:
      "“Why US Police Shootings Are so Deadly ― and Why Some Police Forces Do Better.” Nature, vol. 641, no. 8061, May 2025, pp. 11–11. DOI.org (Crossref), https://doi.org/10.1038/d41586-025-01271-0.",
    summary:
      "This source argues that repeated gunfire per incident likely contributes to high police-shooting death tolls in the U.S.",
    fullAnnotation:
      "This source argues that the tendency for police officers to shoot at an individual multiple times is a likely cause for the high death tolls of police shootings in America. Additionally, they give examples of police forces from different countries around the U.S. and show how some police forces have a lower death toll than others. The sources uses police shootings statistics from various different cities around the country for evidence. This resource is important because it talks about two main variables that we are using in our research: location and number of gunshots. One of our research questions is about how the geographical location of a shooting may change the outcome. This resource helps us explore that question because it gives statistics from different cities,",
    sourceUrl: "https://doi.org/10.1038/d41586-025-01271-0",
  },
  {
    citation:
      "Zare, Hossein, et al. “Analyzing Fatal Police Shootings: The Roles of Social Vulnerability, Race, and Place in the U.S.” American Journal of Preventive Medicine, vol. 68, no. 1, Jan. 2025, pp. 126–36. ScienceDirect, https://doi.org/10.1016/j.amepre.2024.09.002.",
    summary:
      "Zare et al. argue that fatal police shootings are strongly shaped by place-based structural conditions, particularly social vulnerability.",
    fullAnnotation: `Zare et al. argue that fatal police shootings are strongly shaped by place-based structural
conditions, particularly social vulnerability, and that these conditions intersect with racial
disparities. They link fatal police shooting data (2015–2022) to ZIP-code–level measures and estimate associations using negative binomial regression, treating the Social Vulnerability Index (SVI) as a core predictor. The study is important because it moves beyond incident-by-incident framing and quantifies how community-level vulnerability relates to where lethal police violence concentrates. For a thesis claiming that fatal police shootings reflect structural inequality (not just individual behavior), this paper supplies concrete effect sizes such as shootings rising 8.3 times from low to high SVI areas and higher modeled rates in moderate/high-SVI ZIP codes. Supporting an argument for upstream, place-targeted interventions.`,
    sourceUrl: "https://doi.org/10.1016/j.amepre.2024.09.002",
  },
  {
    citation:
      "Zare, Hossein, et al. “How Place and Race Drive the Numbers of Fatal Police Shootings in the US: 2015–2020.” Preventive Medicine [SAN DIEGO], vol. 161, no. 107132, 2022, https://doi.org/10.1016/j.ypmed.2022.107132.",
    summary:
      "This resource compares how likely certain races are to be fatally shot by police officers in the U.S. from 2015 through 2020.",
    fullAnnotation:
      "This resource compares how likely certain races are to be fatally shot by police officers in the U.S. between the years of 2015 through 2020. The article uses data from the Washington Post Fatal Force Data. This source is important because it explains how race is an important factor in fatal police shootings, which is one of the variables in our data set. One of our research questions is “How has the racial distribution of people killed in fatal police shootings in the United States changed from 2015 to the present?” This source will help us answer that question because it uses data from 2015 through 2020.",
    sourceUrl: "https://doi.org/10.1016/j.ypmed.2022.107132",
  },
];

export default function BibliographyPage() {
  const [activeAnnotation, setActiveAnnotation] = useState<
    BibliographyEntry | null
  >(
    null,
  );
  const sourceDialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = sourceDialogRef.current;
    if (!dialog) {
      return;
    }

    if (activeAnnotation) {
      if (!dialog.open) {
        dialog.showModal();
      }
      return;
    }

    if (dialog.open) {
      dialog.close();
    }
  }, [activeAnnotation]);

  useEffect(() => {
    if (!activeAnnotation) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;
    const scrollbarCompensation = Math.max(
      0,
      window.innerWidth - html.clientWidth,
    );

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    if (scrollbarCompensation > 0) {
      body.style.paddingRight = `${scrollbarCompensation}px`;
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
    };
  }, [activeAnnotation]);

  return (
    <>
      <PageShell>
        <PageHeader
          eyebrow="About"
          title="Bibliography"
          titleClassName={pageTitleStrongClassName}
          description="Citations, short summaries, and full annotations."
          descriptionClassName={pageDescriptionWideClassName}
        />

        <section>
          {BIBLIOGRAPHY_ENTRIES.map((entry, index) => {
            return (
              <article
                key={entry.citation}
                className={`grid gap-0 lg:grid-cols-[120px_1fr] ${
                  index < BIBLIOGRAPHY_ENTRIES.length - 1
                    ? "border-b border-black"
                    : ""
                }`}
              >
                <aside className="border-b border-black px-6 py-6 sm:px-10 lg:border-r lg:border-b-0 lg:px-6 lg:py-8">
                  <p className={pageMetaLabelClassName}>Source</p>
                  <p className="mt-2 text-3xl font-semibold leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </aside>

                <div className="px-6 py-6 sm:px-10 sm:py-8">
                  <p className="max-w-5xl text-sm leading-relaxed text-black/90 sm:text-base">
                    {entry.citation}
                  </p>

                  <p className="mt-3 max-w-5xl text-sm leading-relaxed text-black/75 sm:text-base">
                    {entry.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <SiteButton
                      variant="actionCompact"
                      onClick={() => setActiveAnnotation(entry)}
                    >
                      read full annotation
                    </SiteButton>

                    <SiteButton asChild variant="actionCompact">
                      <a href={entry.sourceUrl} target="_blank" rel="noreferrer">
                        open source
                      </a>
                    </SiteButton>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </PageShell>

      <dialog
        ref={sourceDialogRef}
        aria-label="Full annotation"
        onClose={() => setActiveAnnotation(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setActiveAnnotation(null);
          }
        }}
        className="fixed left-1/2 top-1/2 m-0 h-min max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-[calc(100vw-1.5rem)] -translate-x-1/2 -translate-y-1/2 border border-black bg-white p-0 backdrop:bg-white/10 backdrop:backdrop-blur-[2px] sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-2rem)] lg:w-1/2 lg:max-w-none"
      >
        {activeAnnotation ? (
          <div className="relative h-full w-full overflow-y-auto p-4 sm:p-5">
            <SiteButton
              variant="utilityIcon"
              onClick={() => setActiveAnnotation(null)}
              aria-label="Close annotation modal"
              className="absolute right-0 top-0 m-2 sm:m-3"
            >
              X
            </SiteButton>

            <p className={pageMetaLabelClassName}>Full Annotation</p>
            <p className="mt-3 pr-10 text-sm leading-relaxed text-black/90 sm:pr-8 sm:text-base">
              {activeAnnotation.citation}
            </p>
            <div className="mt-4 border border-black p-4">
              <p className="max-w-5xl whitespace-pre-line text-sm leading-relaxed text-black/85 sm:text-base">
                {activeAnnotation.fullAnnotation}
              </p>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
