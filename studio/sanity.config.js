import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

const singletonTypes = new Set(["homePage", "aboutPage", "collaborationsPage", "siteSettings"]);

export default defineConfig({
  name: "default",
  title: "NZII Website CMS",

  projectId: "bz23ff6t",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title("Site Settings (Header & Footer)")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            // Singleton: Home Page
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(
                S.document()
                  .schemaType("homePage")
                  .documentId("homePage")
              ),
            // Singleton: About Page
            S.listItem()
              .title("About Page")
              .id("aboutPage")
              .child(
                S.document()
                  .schemaType("aboutPage")
                  .documentId("aboutPage")
              ),
            // Singleton: Collaborations Page
            S.listItem()
              .title("Collaborations Page")
              .id("collaborationsPage")
              .child(
                S.document()
                  .schemaType("collaborationsPage")
                  .documentId("collaborationsPage")
              ),
            S.divider(),
            // Regular document lists for collections
            ...S.documentTypeListItems().filter(
              (item) => !singletonTypes.has(item.getId())
            ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});


