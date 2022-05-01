# Northflank

[Northflank](https://northflank.com) is a Heroku like platform except it allows you to deploy on AWS, Google Cloud Platform or Microsoft Azure. The reason why I like it is I don't have to worry about Dev Ops and it's cheap compared to the headaches I would have to take in setting up and managing servers.

Full disclosure: Will from Northflank first got in touch with me when I published this repo and invited me to test out Northflank and I almost immediately fell in love with the service.

_As on May 1, 2021. If there's any changes please open an issue._

## Setup

- First, setup your private GitHub repo.
    - I prefer deploying via GitHub, but they have connectors for GitLab and Bitbucket too.
- Head over to [https://northflank.com](https://northflank.com) and signup.
- Head over to projects and create a new project.
    - We are starting with a free one. The paid tier setup is exactly the same except you pay.
    - Add in your project name and choose a region.
- Now, head over to Services and add a new service.
    - Select `Combined` so you have a CI/CD pipeline setup right from GitHub.
    - Add in your service name
    - From the Repository section, select your repository and branch.
    - We'll be using `Buildpack` to create this service since writing a Dockerfile requires knowledge of Docker AND I want the configuration to be as hands off as possible. If you're comfortable with Docker, feel free to use Docker here.
    - In the `Environment Variables` section, head into `Build arguments` and select `ENV`.
        - Add in `NPM_CONFIG_FORCE=true`. This ensures the build command uses `npm i --force` instead of `npm i` or the build will fail 
    - To get your `SHOPIFY_APP_URL`, scroll a little further down into the `Networking` section and you'll have a URL under the entry `Full DNS entry will be`
        - Copy that URL and paste it in the `SHOPIFY_APP_URL` in your `.env` locally.
    - You can modify the `Resources` and `Advanced` if you like, but for now we can let it be at it's default settings.
    - After confirming the settings it should take you to your dashboard, or you can head over there by going to Services (from the left menu) > `Your Service Name`.
    - Now, we need to add in our `.env` variables to the project.
    - Head over to `Dashboard` from the left menu and on the extreme right, click on `New secret`
        - You can add a group name, in `Type`, select `Build and Run`.
        - Under the `Secrets` section, switch to `ENV` and paste your `.env` file.
        - Under Advanced, select `Apply secrets to specific services / jobs` and select your service name from the drop down and create your secret group.
    - You can confirm your server is running by heading over to Containers > Select your container > Logs and the text `Running on  ${PORT}` is displayed!
    - You need to update the values in your partner dashboard to whitelist the URL you got from Northflank to ensure the "URL not whitelisted" issue doesn't pop up while opening the app!

## Notes
- A card is required even for the free tier to prevent abuse.
- Personally, I avoid Dev Ops because I'd rather automate the pipelines and use integrations by paying a little extra if that means all of this hassle is taken care of so I can focus on running the company and not have to hire DevOps people. (Being bootstrapped is difficult)
- If you choose to deploy to Northflank and have feedback to share please feel free to [open a discussion](https://github.com/kinngh/shopify-express-mongodb-app/discussions) in the repo so the community can learn from your experience.

- Northflank or any employees have not sponsored the repo / me personally financially or in kind.
- To test out the account, I was given access to the platform without having to add payment information to check out the build and deployment processes. I currently do not have any special discounts of any kind to deploy my own apps.