import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import type {
  TutorialDetailItem,
  TutorialDetailSection,
  TutorialDetailSubsection,
} from '@site/src/data/tutorialDetails';

type TutorialDetailContentProps = {
  item: TutorialDetailItem;
};

export default function TutorialDetailContent({item}: TutorialDetailContentProps): ReactNode {
  return (
    <>
      <p>{item.overview}</p>

      {item.sections.map((section) => (
        <section key={section.title}>
          <Heading as="h2">{section.title}</Heading>
          <RenderBlock section={section} />
        </section>
      ))}

      {item.references?.length ? (
        <section>
          <Heading as="h2">References</Heading>
          <ul>
            {item.references.map((reference) => (
              <li key={`${reference.label}-${reference.url}`}>
                <a href={reference.url} target="_blank" rel="noreferrer">
                  {reference.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}

function RenderBlock({
  section,
}: {
  section: TutorialDetailSection | TutorialDetailSubsection;
}): ReactNode {
  return (
    <>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {section.bullets?.length ? (
        <ul>
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}

      {section.ordered?.length ? (
        <ol>
          {section.ordered.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      ) : null}

      {section.subsections?.map((subsection) => (
        <section key={subsection.title}>
          <Heading as="h3">{subsection.title}</Heading>
          <RenderBlock section={subsection} />
        </section>
      ))}
    </>
  );
}
