import type { Asset, EntryFields } from "contentful";

export interface ICourseFields {
  title: EntryFields.Symbol;
  name: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  thumbnail: Asset<"WITHOUT_LINK_RESOLUTION">;
  featuredImage: Asset;
  topics: EntryFields.Symbol[];
  watchingTime: EntryFields.Integer;
  description: EntryFields.Symbol;
  content?: EntryFields.RichText;
}
