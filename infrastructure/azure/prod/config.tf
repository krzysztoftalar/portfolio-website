terraform {
  # Terraform Cloud setup
  cloud {
    organization = "sivonte"

    workspaces {
      name = "portfolio-prod"
    }
  }

  # Terraform version
  required_version = "~> 1.14.5"

  # Azure Provider source and version being used
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.60.0"
    }
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
}
