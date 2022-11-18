resource "azurerm_static_site" "swa" {
  name = "${var.resource_project_prefix}-${var.app_name}-${local.static_web_app_suffix}"
  location = var.location
  resource_group_name = var.rg_name
  tags = local.tags

  sku_size = var.static_web_app_plan_sku.size
  sku_tier = var.static_web_app_plan_sku.size
}

