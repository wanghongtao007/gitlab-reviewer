# GitLab Reviewer

**❗ This project is abandoned and no longer actively maintained.**

[![Netlify Status](https://api.netlify.com/api/v1/badges/80c95e9b-a3a7-4b2a-a115-5508fc98a619/deploy-status)](https://app.netlify.com/sites/gitlab-reviewer/deploys)

UI to see all GitLab merge requests of your team in one place.

![gitlab-reviewer](screenshot.png)

## Requirements

* [GitLab](https://about.gitlab.com/)

## Installation

### Clone the project

```shell
$ git clone https://github.com/Akollade/gitlab-reviewer.git
$ cd gitlab-reviewer
```

### Install dependencies

```shell
$ yum install yarnpkg
$ yarn
```

## Run the server

After configuration, you have to build the code and launch the server.

```shell
$ export NODE_OPTIONS=--openssl-legacy-provider
## 或者是修改package.json里面的内容，"start": "set NODE_OPTIONS=--openssl-legacy-provider & yarn run watch:css & react-scripts start"

$ yarn start
```

Then open `http://localhost:3000` in your browser.

### Inspiration

Thanks :
* [TheRedDot/MergeRequestsCI](https://github.com/TheRedDot/MergeRequestsCI)
* [M6Web](https://tech.m6web.fr/) ([Github Team Reviewer](https://github.com/M6Web/GithubTeamReviewer))

## License

[gitlab-reviewer](https://github.com/Akollade/gitlab-reviewer) is licensed under the [MIT license](LICENSE).
