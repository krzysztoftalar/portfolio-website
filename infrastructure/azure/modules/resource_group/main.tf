# ----------------------------------------------
# Resource Group
# ----------------------------------------------
resource "azurerm_resource_group" "this" {
  name     = "${local.resource_group_prefix}-${var.resource_project_suffix}"
  location = var.location
  tags     = var.tags
}

