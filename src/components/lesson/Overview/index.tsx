import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Box } from "@mui/material";
import type { EntryFields } from "contentful";
import type { FunctionComponent } from "react";

interface IOverviewProps {
  text: EntryFields.RichText;
}

const Overview: FunctionComponent<IOverviewProps> = ({ text }) => {
  return <Box>{documentToReactComponents(text)}</Box>;
};

export default Overview;
