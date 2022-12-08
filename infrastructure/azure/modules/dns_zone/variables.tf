variable "dns_zone_name" {
  description = "(Required) The name of the DNS Zone."
  type = string
}

variable "resource_group_name" {
  description = "(Required) The Resource Group where the resource exists."
  type = string
}

variable "static_web_app_id" {
  description = "(Required) Id of the Static Web App."
  type = string
}

variable "tags" {
  description = "(Required) A mapping of tags to assign to the resource."
  type = map(string)
}
