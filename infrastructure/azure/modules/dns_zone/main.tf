# DNS Zone
resource "azurerm_dns_zone" "dz" {
  name                = var.dns_zone_name
  resource_group_name = var.rg_name
  tags                = var.tags
}

# A (alias) record for Static Web App
resource "azurerm_dns_a_record" "example" {
  name                = "@"
  zone_name           = azurerm_dns_zone.dz.name
  resource_group_name = var.rg_name
  target_resource_id  = var.swa_id
  ttl                 = 3600
}
