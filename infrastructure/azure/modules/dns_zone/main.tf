# DNS Zone
resource "azurerm_dns_zone" "this" {
  name                = var.dns_zone_name
  resource_group_name = var.resource_group_name
  tags                = var.tags
}

# A (alias) record for Static Web App
resource "azurerm_dns_a_record" "this" {
  name                = "@"
  zone_name           = azurerm_dns_zone.this.name
  resource_group_name = var.resource_group_name
  target_resource_id  = var.static_web_app_id
  ttl                 = 3600
}
