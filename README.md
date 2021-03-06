<p align="center">
  <a href="https://wodo.io/" target="blank"><img src="https://github.com/wodo-platform/wodo-branding/blob/main/src/img/branding/logo_purple.png" width="320" alt="Wodo Platform" /></a>
</p>

<div align="center">
<h2> Wodo Gaming Identity and Access Management Service </h2>
</div>

<div align="center">
  <h4>
    <a href="https://wodo.io/">
      Website
    </a>
    <span> | </span>
    <a href="#">
      Product Docs
    </a>
    <span> | </span>
    <a href="#">
      Architecture Docs
    </a>
    <span> | </span>
    <!-- <a href="#"> -->
    <!--   CLI -->
    <!-- </a> -->
    <!-- <span> | </span> -->
    <a href="#/CONTRIBUTING.md">
      Contributing
    </a>
    <span> | </span>
    <a href="https://twitter.com/wodoio">
      Twitter
    </a>
    <span> | </span>
    <a href="https://t.me/wodoio">
      Telegram
    </a>
    <span> | </span>
    <a href="https://discord.gg/fbyns8Egpb">
      Discourd
    </a>
    <span> | </span>
    <a href="https://wodoio.medium.com/">
      Medium
    </a>
    <span> | </span>
    <a href="https://www.reddit.com/r/wodoio">
      Reddit
    </a>
  </h4>
</div>

<h3> Table of Contents </h3> 

- [About](#about)
- [Installation](#installation)
- [Adding wg-iam-service dependency](#adding-wg-iam-service-dependency)
- [Running the app](#running-the-app)
- [Building docker image](#building-docker-image)
- [Publish The Module as NPM Package Locally](#publish-the-module-as-npm-package-locally)
- [CI and Github Workflows](#ci-and-github-workflows)
- [Next Steps](#next-steps)

----

## About

This repo contains implementation details about identity and access management for tradational, non-microservice design.

## Installation

All dependency management and nestjs configurations are already done in the template repo. To add database access capabilities,  wg-iam-service is added to the npm dependency list and prisma client lib is genereated based on prisma.schema file resides in wg-iam-service dependency.

##  Adding wg-iam-service dependency

To be able to add wg-iam-service as npm dependency, you need to authenticate to git remote npm package repository by logging in to npm, use the npm login command, replacing USERNAME with your GitHub username, TOKEN with your personal access token, and PUBLIC-EMAIL-ADDRESS with your email address.

If GitHub Packages is not your default package registry for using npm and you want to use the npm audit command, we recommend you use the --scope flag with the owner of the package when you authenticate to GitHub Packages.

```bash
$ npm login --scope=@wodo-platform --registry=https://npm.pkg.github.com --u your_git_user --p your_token 
```

Once you login successfully, you can run "npm install" command and start to develop your features. 

To run the same steps in the gitflow actions we need to create a secret in org level and set a personal access token as secret value so that when we run a repository, it can reach npn package regidtery of another private repository. GITHUB_TOKEN is generated by the gitflows per repository. It can not access to other private repos. We have WODO_TOKEN storing Serhat's personal access token as value today. TODO: It will be fixed later. 

Granting additional permissions
If you need a token that requires permissions that aren't available in the GITHUB_TOKEN, you can create a personal access token and set it as a secret in your repository:

Use or create a token with the appropriate permissions for that repository. For more information, see "Creating a personal access token."
Add the token as a secret in your workflow's repository, and refer to it using the ${{ secrets.SECRET_NAME }} syntax. For more information, see "Creating and using encrypted secrets."

https://docs.github.com/en/actions/security-guides/automatic-token-authentication#using-the-github_token-in-a-workflow



## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Building docker image

Along with build and run functionality on your command line, we need to build docker images as well. It means we need to build your project from scratch while preparing docker images. You need to run "npm login" command during docker build process. In order to achive that we can generate .npmrc file in Dockerfile with ${NPM_TOKEN} argument. We will provide the token as argument NPM_TOKEN to the docker build process. 

In your repo root folder, run the following command with your own git token. It will build docker image and add it to your configured docker registery on your laptop

```bash
$ docker build -t wp-nodejs-demo-service --build-arg NPM_TOKEN=your_token . 
```

To run the nodejs app on your local laptop, you can run the wollowinf command

```bash
$ docker run -dp 8080:3000 wp-nodejs-demo-service
```

Open the url "http://localhost:8080/api/demos" and "http://localhost:8080/docs" in your browser to see API and swagger doc.

## Publish The Module as NPM Package Locally

You may need to publish npm packages from your local dev env in order to speed up development process. It is sort of workaround and you should do clean-up your published package versions. Official github actions will take care of package publishing eventually.

Please follow the steps below to publish wg-iam-service npm package from your local development environment.

```bash
npm login --scope=@wodo-platform --registry=https://npm.pkg.github.com
```

in your terminal and you???ll be prompted to provide the following. Enter your github username, access token and wodo-platform email:

```bash
Username: YOUR_GITHUB_USERNAME
Password: YOUR_GITHUB_TOKEN
Email (this IS public): wodo-platform@users.noreply.github.com
```

Once you log in successfully, you will see the messafe below:

```bash
Logged in as your_git_user to scope @wodo-platform on https://npm.pkg.github.com/.
```
Publish the package:

```bash
npm publish
```

Verif that wg-iam-service package has been published successfully with the correct version you provided in package.json file. Go to the page below and make sure that your packge is listed on the  published artifact list

```
https://github.com/orgs/wodo-platform/packages
```

> You should increase version number when you need to re-publish a new package version.

Once the package is published, you can add it to the dependencies list in package.json file. In order to retrieve the dependency, you must run **"npm login --scope=@Ywodo-platform --registry=https://npm.pkg.github.com
"** command at least once in your command prompt.

```
"dependencies": {
        "@wodo-platform/wg-iam-service": "1.0.0",

  }
```

More details can be found on <a href="https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry"> this page </a>


## CI and Github Workflows

In order to build and package your repo through CI/CD, please have a a look at the file .github/workflows/pipeline.yml under the root project folder. It is preconfigured githubflow. Whenever you push a change onto the main branch, it is triggered. It will be improved to be able to package and release artifacts based on a release process later.

## Next Steps

Once you compose your new repo, you can create helm charts in wodo-helm-charts repo then conitinue with local deployment and official CI/CD gitops deployment. Please refer to Wodo Platform Local Dev Environment guide.
