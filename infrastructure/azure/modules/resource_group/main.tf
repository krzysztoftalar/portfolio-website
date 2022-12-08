# Resource Group
resource "azurerm_resource_group" "this" {
  name     = "${var.resource_project_prefix}-${local.resource_group_suffix}"
  location = var.location
  tags     = var.tags
}

