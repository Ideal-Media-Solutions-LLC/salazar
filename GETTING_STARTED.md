# Getting Started

_Your guide to getting the tests and services inside `./modules` working_


*Other examples:* 

https://github.com/componentjs/guide/blob/master/component/getting-started.md
https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md

## External dependencies:

You will need a `.env` file with a value for `GITHUB_TOKEN` in the `./modules` directory. see [./modules/example.env](modules/example.env)

This token must have ALL repo permissions and must have READ access to org teams and projects.

### [Click here to create a token.](https://github.com/settings/tokens/new)

</br>
<details>
<summary>Expand this dropdown to see an example.</summary>
<br>

- [x] repo
  - [x] repo:status _Access commit status_
  - [x] repo_deployment _Access deployment status_
  - [x] public_repo _Access public repositories_
  - [x] repo:invite _Access repository invitations_
  - [x] security_events _Read and write security events_
- workflow
- write:packages
- delete:packages
- [ ] admin:org
  - [ ] write:org
  - [x] read:org
- admin:public_key

![GitHub Personal Access Token Permissions](github_token_permissions.jpg)

</details>
</br>

## Web server

### Nest

https://docs.nestjs.com/first-steps

#### install global dependencies

`npm i -g @nestjs/cli`
