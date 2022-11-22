resource "azurerm_static_site" "swa" {
  name                = "${var.resource_project_prefix}-${local.static_web_app_suffix}"
  location            = var.location
  resource_group_name = var.rg_name
  tags                = local.tags

  sku_size = var.static_web_app_plan_sku.size
  sku_tier = var.static_web_app_plan_sku.size
}

# Setup www.sivonte.com domain
resource "azurerm_dns_cname_record" "swa_cname_record" {
  name                = "www"
  zone_name           = var.dns_zone_name
  resource_group_name = var.rg_name
  ttl                 = 3600
  record              = azurerm_static_site.swa.default_host_name
}

resource "azurerm_static_site_custom_domain" "swa_sub_domain" {
  static_site_id  = azurerm_static_site.swa.id
  domain_name     = "www.sivonte.com"
  validation_type = "cname-delegation"
}

# Setup sivonte.com domain
resource "azurerm_dns_txt_record" "swa_txt_record" {
  name                = "@"
  zone_name           = var.dns_zone_name
  resource_group_name = var.rg_name
  ttl                 = 3600
  record {
    value = azurerm_static_site_custom_domain.swa_main_domain.validation_token == "" ? "validated" : azurerm_static_site_custom_domain.swa_main_domain.validation_token
  }
}

resource "azurerm_static_site_custom_domain" "swa_main_domain" {
  static_site_id  = azurerm_static_site.swa.id
  domain_name     = "sivonte.com"
  validation_type = "dns-txt-token"
}

