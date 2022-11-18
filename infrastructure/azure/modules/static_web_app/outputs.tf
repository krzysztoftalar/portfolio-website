output "name" {
  value = azurerm_app_service.swa.name
}

output "endpoint" {
  value = azurerm_app_service.as.default_site_hostname
}
