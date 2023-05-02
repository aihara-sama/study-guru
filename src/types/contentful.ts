import type { Asset, EntryFields } from "contentful";

interface IMetadata {
  tags: string[];
}

interface ISys {
  id: string;
  linkType: string;
  type: string;
}

export interface IEntry<IFields> {
  fields: IFields;
  metadata: IMetadata;
  sys: {
    id: string;
    locale: string;
    revision: number;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: ISys;
    };
    space: {
      sys: ISys;
    };
  };
}

export interface ICourseFields {
  title: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  thumbnail: Asset<"WITHOUT_LINK_RESOLUTION">;
  featuredImage: Asset<"WITHOUT_LINK_RESOLUTION">;
  description: EntryFields.Symbol;
  lessons: IEntry<ILessonFields>[];
}

export interface ILessonFields {
  title: EntryFields.Symbol;
  content: EntryFields.RichText;
  watchTime: EntryFields.Integer;
  thumbnail: Asset<"WITHOUT_LINK_RESOLUTION">;
  video: Asset<"WITHOUT_LINK_RESOLUTION">;
  slug: EntryFields.Symbol;
}
