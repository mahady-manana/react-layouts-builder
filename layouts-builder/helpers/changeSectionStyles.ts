import { ILayoutSection } from 'layouts-builder/interface';

export const changeSectionStyles = (
  section: ILayoutSection[],
  sectionId: any,
  key: string,
  value: any,
) => {
  const newSection = section.map((sect) => {
    if (sect.id === sectionId) {
      return {
        ...sect,
        [key]: value,
      };
    }
    return sect;
  });
  return newSection;
};
