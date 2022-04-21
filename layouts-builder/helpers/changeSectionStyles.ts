import {
  ILayoutSection,
  ISectionStylesProps,
} from 'layouts-builder/interface';

export const changeSectionStyles = (
  currentLayouts: ILayoutSection[],
  sectionId: any,
  styles: ISectionStylesProps,
) => {
  return currentLayouts.map((section) => {
    if (section.id !== sectionId) return section;
    return {
      ...section,
      ...styles,
    };
  });
};
