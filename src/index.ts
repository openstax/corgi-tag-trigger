import { Probot } from "probot";
import * as https from "https";

const CORGI_URL = "corgi.openstax.org/api/jobs/"
// https://github.com/openstax/osbooks-university-physics/blob/main/META-INF/books.xml

export = (app: Probot) => {
  app.on("create", async (context) => {
    // NOTE: if we miss webhooks look into persistence

    // get books in repo
    const contentRequest = context.repo({ path: 'META-INF/books.xml' })
    const contentMetadata = await context.octokit.repos.getContent(contentRequest)
    const contentData = contentMetadata.data as any;
    const content = await context.octokit.request(contentData.download_url)
    app.log.info(content.data);

    // send job details to CORGI API
    // make request per book + job type

    // 3: git-pdf
    // 4: git-distribution-preview

    const repo = 'osbooks-university-physics'
    const slug = 'university-physics-volume-1'
    const options = {
      'method': 'POST',
      'data': {
        'collection_id': `Git: ${repo}/${slug}`,
        'job_type_id': 3
      }
    }

    const result = await https.request(CORGI_URL, options);
    app.log.info(result);
  });
};