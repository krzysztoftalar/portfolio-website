# Azure Provider source and version being used
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }

  cloud {
    organization = "sivonte"

    workspaces {
      name = "sivonte-workspace"
    }
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
}

# Create a resource group
module "rg" {
  source                  = "./modules/resource_group"
  location                = var.location
  resource_project_prefix = local.resource_project_prefix
  tags                    = local.tags
}

# Create a static web app
module "swa" {
  source                  = "./modules/static_web_app"
  app_name                = "portfolio"
  rg_name                 = module.rg.name
  location                = var.location
  resource_project_prefix = local.resource_project_prefix
  static_web_app_plan_sku = var.static_web_app_plan_sku
  tags                    = local.tags
}
