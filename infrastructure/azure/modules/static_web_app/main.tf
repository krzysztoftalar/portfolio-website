# ----------------------------------------------
# Static Web App
# ----------------------------------------------
resource "azurerm_static_site" "this" {
  name                = "${local.static_web_app_prefix}-${var.resource_project_suffix}"
  location            = var.location
  resource_group_name = var.resource_group_name
  tags                = var.tags

  sku_size = var.static_web_app_plan_sku.size
  sku_tier = var.static_web_app_plan_sku.size
}

# ----------------------------------------------
# www.sivonte.com domain - manually set in Azure Portal as default.
# ----------------------------------------------
resource "azurerm_static_site_custom_domain" "sub" {
  static_site_id  = azurerm_static_site.this.id
  domain_name     = "${azurerm_dns_cname_record.this.name}.${var.dns_zone_name}"
  validation_type = "cname-delegation"
}

resource "azurerm_dns_cname_record" "this" {
  name                = "www"
  zone_name           = var.dns_zone_name
  resource_group_name = var.resource_group_name
  ttl                 = 3600
  record              = azurerm_static_site.this.default_host_name
}

# ----------------------------------------------
# sivonte.com domain
# ----------------------------------------------
resource "azurerm_static_site_custom_domain" "main" {
  static_site_id  = azurerm_static_site.this.id
  domain_name     = var.dns_zone_name
  validation_type = "dns-txt-token"
}

resource "azurerm_dns_txt_record" "this" {
  name                = "@"
  zone_name           = var.dns_zone_name
  resource_group_name = var.resource_group_name
  ttl                 = 3600

  record {
    # Workaround for empty validation_token after successful TXT validation by azurerm_static_site_custom_domain.
    value = coalesce(azurerm_static_site_custom_domain.main.validation_token, "validated")
  }
}
