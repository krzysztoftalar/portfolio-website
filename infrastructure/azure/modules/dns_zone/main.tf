resource "azurerm_dns_zone" "dz" {
  name                = var.dns_zone_name
  resource_group_name = var.rg_name
  tags                = local.tags
}

#
resource "azurerm_dns_a_record" "example" {
  name                = "@"
  zone_name           = azurerm_dns_zone.dz.name
  resource_group_name = var.rg_name
  ttl                 = 3600
  target_resource_id  = var.swa_id
}
