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
module "rg" {
  source                  = "./modules/resource_group"
  location                = var.location
  resource_project_prefix = local.resource_project_prefix
  tags                    = local.tags
}

# Static Web App
module "swa" {
  source                  = "./modules/static_web_app"
  rg_name                 = module.rg.name
  dns_zone_name           = module.dns_zone.name
  location                = var.location
  static_web_app_plan_sku = var.static_web_app_plan_sku
  resource_project_prefix = local.resource_project_prefix
  tags                    = local.tags
}

# DNS Zone
module "dns_zone" {
  source                  = "./modules/dns_zone"
  dns_zone_name           = var.dns_zone_name
  rg_name                 = module.rg.name
  swa_id                  = module.swa.id
  tags                    = local.tags
}
