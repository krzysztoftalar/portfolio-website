# ----------------------------------------------
# Application Insights
# ----------------------------------------------
resource "azurerm_application_insights" "this" {
  name                = "${local.application_insights_prefix}-${var.resource_project_suffix}"
  application_type    = "web"
  location            = var.location
  resource_group_name = var.resource_group_name
  workspace_id        = azurerm_log_analytics_workspace.this.id
  tags                = var.tags
}

# ----------------------------------------------
# Log Analytics Workspace
# ----------------------------------------------
resource "azurerm_log_analytics_workspace" "this" {
  name                = "${local.log_analytics_workspace_prefix}-${var.resource_project_suffix}"
  location            = var.location
  resource_group_name = var.resource_group_name
  retention_in_days   = 90
  tags                = var.tags
}
