import { createClient } from "contentful";

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_CONETNT_DELIVERY_TOKEN,
});

export { contentfulClient };
