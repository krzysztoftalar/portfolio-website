terraform {
  # Terraform Cloud setup
  cloud {
    organization = "sivonte"

    workspaces {
      name = "portfolio-prod"
    }
  }

  # Terraform version
  required_version = ">= 1.3.5"

  # Azure Provider source and version being used
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.35.0"
    }
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
}
