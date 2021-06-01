import { Probot } from "probot";
// import * as https from "https";
import * as sax from "sax"

// const CORGI_URL = "https://corgi-staging.openstax.org/api/jobs/"

export = (app: Probot) => {
  app.on("create", async (context) => {
    // NOTE: if we miss webhooks look into persistence

    // Do we need to filter events?
    app.log.info(context);

    // get books in repo
    const contentRequest = context.repo({ path: 'META-INF/books.xml' })
    const contentMetadata = await context.octokit.repos.getContent(contentRequest)
    const contentData = contentMetadata.data as any;
    const content = await context.octokit.request(contentData.download_url)

    app.log.info(content.data);

    // const repo = context.payload.repository.name

    var books: string[] = [];
    const parser = sax.parser();
    parser.onopentag = (node) => {
      if (node.name == 'BOOK') {
        books.push(node.attributes['SLUG'] as string)
      }
    };
    parser.write(content.data).close()

    // send job details to CORGI API
    // make request per book + job type
    // books.forEach(slug => {
    //   [3, 4].forEach(jobType => {
    //     // 3: git-pdf
    //     // 4: git-distribution-preview

    //     app.log.info(`collection_id: ${repo}/${slug}`)
    //     app.log.info(`job_type_id: ${jobType}`)

    //     const options = {
    //       method: 'POST',
    //     }

    //     const request = https.request(CORGI_URL, options);

    //     request.on('data', (d) => {
    //       app.log.info(d);
    //     });

    //     request.on('response', (r) => {
    //       app.log.info(`${r.statusCode}`);
    //     })

    //     request.on('error', (e) => {
    //       app.log.info(e);
    //     });

    //     const data = {
    //       collection_id: `${repo}/${slug}`,
    //       job_type_id: jobType,
    //       status_id: 1,
    //       version: 'qa' // version from tag
    //       // style: ???
    //     }

    //     request.write(JSON.stringify(data))

    //     request.end()
    //   });
    // });
  });
};