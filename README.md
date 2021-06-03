# git-tag-corgi-trigger

> A GitHub App built with [Probot](https://github.com/probot/probot) that watches book repos for new tags and triggers CORGI jobs

## Local Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t git-tag-corgi-trigger .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> git-tag-corgi-trigger
```

## Heroku deployment
per the probot [documentation](https://probot.github.io/docs/deployment/#heroku)

Probot runs like any other Node app on Heroku. After creating the GitHub App:

1. Make sure you have the Heroku CLI client installed.

2. Clone the app that you want to deploy. e.g. git clone https://github.com/probot/stale

3. Create the Heroku app with the heroku create command:

```
$ heroku create
Creating arcane-lowlands-8408... done, stack is cedar
http://arcane-lowlands-8408.herokuapp.com/ | git@heroku.com:arcane-lowlands-8408.git
Git remote heroku added
```

4. Go back to your app settings page and update the Webhook URL to the URL of your deployment, e.g. http://arcane-lowlands-8408.herokuapp.com/.

5. Configure the Heroku app, replacing the APP_ID and WEBHOOK_SECRET with the values for those variables, and setting the path for the PRIVATE_KEY:

```
$ heroku config:set APP_ID=aaa \
    WEBHOOK_SECRET=bbb \
    PRIVATE_KEY="$(cat ~/Downloads/*.private-key.pem)"
```

6. Deploy the app to heroku with 

```
git push:

$ git push heroku master
...
-----> Node.js app detected
...
-----> Launching... done
      http://arcane-lowlands-8408.herokuapp.com deployed to Heroku
```

7. Your app should be up and running! To verify that your app is receiving webhook data, you can tail your app's logs:
```
 $ heroku config:set LOG_LEVEL=trace
 $ heroku logs --tail
```

## Note
Make sure to add new osbook-* repos to the github app otherwise they will be ignored.

## Contributing

If you have suggestions for how git-tag-corgi-trigger could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2021 Christopher Kline <ckline.tryptic@gmail.com>
