import footer from "@Graphql/queriesgraphcms/getFooterDetials.graphql";
import DESKTOP_MEGA_MENU from "@Graphql/queriesgraphcms/getDesktopMegaMenu.graphql";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { writeFile } from "fs/promises";

export default async function handler(req, res) {
  const dataCategoryListResp = await gqlFetch(
    DESKTOP_MEGA_MENU,
    {
      languages: "English",
      pageSlug: "megamenu",
    },
    "CMS",
  );
  const dataFooter = await gqlFetch(
    footer,
    {
      languages: "English",
      pageSlug: "megamenu",
    },
    "CMS",
  );
  res.status(200).json({
    message: "Hello from Next.js!",
    dataCategoryListResp,
    dataFooter,
  });

  const megaMenuPath = "./static/megaMenu.json";
  const megaMenuData = dataCategoryListResp.data;

  const footerPath = "./static/footer.json";
  const footerData = dataFooter.data;

  try {
    await writeFile(
      megaMenuPath,
      JSON.stringify(megaMenuData, null, 2),
      "utf8",
    );
    await writeFile(footerPath, JSON.stringify(footerData, null, 2), "utf8");
    console.log("Data successfully saved to disk");
  } catch (error) {
    console.log("An error has occurred ", error);
  }
}
