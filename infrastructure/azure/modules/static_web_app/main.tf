# Static Web App
resource "azurerm_static_site" "this" {
  name                = "${var.resource_project_prefix}-${local.static_web_app_suffix}"
  location            = var.location
  resource_group_name = var.resource_group_name
  tags                = var.tags

  sku_size = var.static_web_app_plan_sku.size
  sku_tier = var.static_web_app_plan_sku.size
}

# www.sivonte.com domain
resource "azurerm_dns_cname_record" "this" {
  name                = "www"
  zone_name           = var.dns_zone_name
  resource_group_name = var.resource_group_name
  ttl                 = 3600
  record              = azurerm_static_site.this.default_host_name
}

resource "azurerm_static_site_custom_domain" "sub" {
  static_site_id  = azurerm_static_site.this.id
  domain_name     = "${azurerm_dns_cname_record.this.name}.${var.dns_zone_name}"
  validation_type = "cname-delegation"
}

# sivonte.com domain
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

resource "azurerm_static_site_custom_domain" "main" {
  static_site_id  = azurerm_static_site.this.id
  domain_name     = var.dns_zone_name
  validation_type = "dns-txt-token"
}

