terraform {
  # Terraform Cloud setup
  cloud {
    organization = "sivonte"

    workspaces {
      name = "sivonte"
    }
  }

  # Azure Provider source and version being used
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
}

# Resource Group
module "resource_group" {
  source                  = "../modules/resource_group"
  location                = var.location
  resource_project_prefix = local.resource_project_prefix
  tags                    = local.tags
}

# Static Web App
module "static_web_app" {
  source                  = "../modules/static_web_app"
  resource_group_name     = module.resource_group.name
  dns_zone_name           = module.dns_zone.name
  location                = var.location
  static_web_app_plan_sku = var.static_web_app_plan_sku
  resource_project_prefix = local.resource_project_prefix
  tags                    = local.tags
}

# DNS Zone
module "dns_zone" {
  source              = "../modules/dns_zone"
  dns_zone_name       = var.dns_zone_name
  resource_group_name = module.resource_group.name
  static_web_app_id   = module.static_web_app.id
  tags                = local.tags
}

# Application Insights with Log Analytics Workspace
module "application_insights" {
  source                  = "../modules/application_insights"
  location                = var.location
  resource_group_name     = module.resource_group.name
  resource_project_prefix = local.resource_project_prefix
  tags                    = local.tags
}

# Monitor Alerts and Monitor Action Groups
module "monitor" {
  source                  = "../modules/monitor"
  resource_group_name     = module.resource_group.name
  application_insights_id = module.application_insights.id
  resource_project_prefix = local.resource_project_prefix
}
