# Application Insights
resource "azurerm_application_insights" "ai" {
  name                = "${var.resource_project_prefix}-${local.application_insights_suffix}"
  application_type    = "web"
  location            = var.location
  resource_group_name = var.rg_name
  workspace_id        = azurerm_log_analytics_workspace.law.id
  tags                = var.tags
}

# Log Analytics Workspace
resource "azurerm_log_analytics_workspace" "law" {
  name                = "${var.resource_project_prefix}-${local.log_analytics_workspace_suffix}"
  location            = var.location
  resource_group_name = var.rg_name
  retention_in_days   = 90
  tags                = var.tags
}
