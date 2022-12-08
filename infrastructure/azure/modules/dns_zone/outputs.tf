output "dns_zone_name" {
  description = "The Name of the DNS Zone."
  value = azurerm_dns_zone.this.name
}

