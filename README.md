<h1 align="center">Portfolio</h1>

<p align="center">
<img src="https://img.shields.io/badge/-GatsbyJS-blueviolet?logo=gatsby" alt="Icon"/>

<img src="https://img.shields.io/badge/-TypeScript-%233178C6" alt="Icon"/>

<img src="https://img.shields.io/badge/-GraphQL-%23e535ab%20?logo=graphql" alt="Icon"/>

<img src="https://img.shields.io/badge/-MobX-orange" alt="Icon"/>

<img src="https://img.shields.io/badge/-Azure-%230078D4?logo=Microsoft%20Azure" alt="Icon"/>

<img src="https://img.shields.io/badge/-Terraform-%237B42BC?logo=terraform" alt="Icon"/>

<img src="https://img.shields.io/badge/license-MIT-green" alt="Icon"/>
</p>

## About The Project

I built this website in Gatsby.js.
The MobX library was used to manage the state of the application,
while Styled Components and Framer Motion were used for page styling and animations.
Application pages are dynamically created by GraphQL queries that retrieve data from markdown files.
Also, like all my React projects, this one is built with TypeScript to write safer and better code.

<br/>

<p align="center">
  <img src="./gatsby-app/src/data/projects/portfolio-website/portfolio-1.webp" width="70%" alt="Website">
</p>

## Features

- Dark and light theme,
- Canvas eraser effect ,
- Custom cursor,
- Markdown files as a source content.

## Built With

| Application                                         | Infrastructure                                                    |
|-----------------------------------------------------|-------------------------------------------------------------------|
| [GatsbyJS v5](https://www.gatsbyjs.com/)            | [Azure](https://azure.microsoft.com/en-us/)                       |
| [MobX](https://mobx.js.org/README.html)             | [GitHub](https://github.com/)                                     |
| [TypeScript](https://www.typescriptlang.org/)       | [GitHub Actions](https://docs.github.com/en/actions)              |
| [GraphQL](https://graphql.org/)                     | [Terraform](https://developer.hashicorp.com/terraform)            |
| [Markdown](https://www.markdownguide.org/)          | [Terraform Cloud](https://cloud.hashicorp.com/products/terraform) |
| [Styled Components](https://styled-components.com/) | [OVH](https://www.ovhcloud.com)                                   |
| [Framer Motion](https://www.framer.com/api/)        | [Google Analytics](https://analytics.google.com/analytics/web/)   |
| [IcoMoon](https://icomoon.io/)                      | [diagrams.net](https://www.diagrams.net/)                         |
| [Eslint](https://eslint.org/)                       |                                                                   |
| [Prettier](https://prettier.io/)                    |                                                                   |


## Local launch

### Prerequisites

- Node.js v18.

### Installation

1. Navigate into `.\gatsby-app` directory and run the following command to download packages:

```shell
npm install
```

1. Start the development environment:

```shell
gatsby develop
```

Your site is now running at `http://localhost:8000`.

## Infrastructure

### Infrastructure Resources

- Azure Service Principal - Terraform Cloud to Azure authentication,
- Azure Resource Group - a container for Azure resources,
- Azure DNS Zones - domain hosting and management,
- Azure Static Web App - web hosting for static site `.\gatsby-app`,
- Terraform Cloud - remote state management of infrastructure,
- OVH - domain registration,
- GitHub / GitHub Actions - git repository and CI/CD tool,
- Google Analytics - website traffic.

### Infrastructure Architecture

![Infrastructure Architecture](docs/infrastructure_architecture.svg)

## Deployment

### Application Deployment

1. Connect Google Analytics to Gatsby application:
    - create an `Account` and a `Property` in Google Analytics,
    - create a `Web` as a data stream for the Property set above and copy the `Measurement Id`,
    - in your repository create a secret named **GOOGLE_ANALYTICS_TRACKING_ID**, setting the Measurement Id,
    - if you want to track page data while debugging your app locally then set the property **GOOGLE_ANALYTICS_TRACKING_ID**
      in **.\gatsby-app\.env.development**.
    ```dotenv
      GOOGLE_ANALYTICS_TRACKING_ID=YOUR_GOOGLE_ANALYTICS_MEASUREMENT_ID
    ```
2. Connect Terraform Cloud to Azure using a [Azure Service
   Principal with a Client Secret](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/service_principal_client_secret):
    - register an application with Azure AD and create a Service Principal using
      the [Azure Portal](https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal)
      or [Azure PowerShell](https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-authenticate-service-principal-powershell),
    - assign a **Contributor** role to the application,
    - create an application secret and copy it,
    - create a workspace in Terraform Cloud with `API-driven workflow`,
    - create variables in workspace:
        - **ARM_SUBSCRIPTION_ID** - the ID of the Azure Subscription where resources will be created,
        - **ARM_TENANT_ID** - this is the Azure Directory (tenant) ID of the Service Principal,
        - **ARM_CLIENT_ID** - this is the Application (client) ID of the Service Principal,
        - **ARM_CLIENT_SECRET** - mark as sensitive, this is the Application Secret for the Service Principal.
3. Connect Terraform Cloud
   to [GitHub Actions](https://developer.hashicorp.com/terraform/tutorials/automation/github-actions):
    - create API token in Terraform Cloud,
    - in your repository create a secret named **TERRAFORM_CLOUD_API_TOKEN**, setting the Terraform Cloud API token.
4. In **.\infrastructure\azure\env\prod.tfvars** set your domain name.
   ```terraform
      dns_zone_name = "your_domain_name"
   ```
5. Run `Deploy Infrastructure to Azure` workflow in GitHub Actions.
6. The first run will fail because you need to:
    - [delegate your domain to Azure](https://learn.microsoft.com/en-us/azure/dns/dns-delegate-domain-azure-dns) - on
      the DNS management page of your existing registrar provider, replace the DNS server records
      with name servers that you created in the previous step in the Azure DNS Zones,
    - in your repository create a secret named **AZURE_STATIC_WEB_APPS_API_TOKEN**, setting the Static Web App (created
      in the previous step) `Deployment token`.
7. Run `Deploy Infrastructure to Azure` again.

### Deployment Architecture

![Deployment Architecture](docs/deployment_architecture.svg)

## License

This project is licensed under the MIT License.

## Contact

**Krzysztof Talar** - [Linkedin](https://www.linkedin.com/in/ktalar/) - krzysztof.talar@protonmail.com
