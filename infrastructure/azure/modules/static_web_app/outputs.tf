output "name" {
  value = azurerm_static_site.swa.name
}

output "endpoint" {
  value = azurerm_static_site.swa.default_host_name
}

output "id" {
  value = azurerm_static_site.swa.id
}
