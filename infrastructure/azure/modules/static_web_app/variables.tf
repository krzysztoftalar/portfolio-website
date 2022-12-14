variable "resource_group_name" {
  description = "(Required) The Resource Group where the resource exists."
  type        = string
}

variable "dns_zone_name" {
  description = "(Required) The name of the DNS Zone."
  type        = string
}

variable "location" {
  description = "(Required) The Azure Region where the resources should exist."
  type        = string
}

variable "resource_project_suffix" {
  description = "(Required) A suffix of the Static Web App name."
  type        = string
}

variable "static_web_app_plan_sku" {
  description = "(Required) SKU size and tier of the Static Web App."
  type        = object({
    tier = string
    size = string
  })
}

variable "tags" {
  description = "(Required) A mapping of tags to assign to the resource."
  type        = map(string)
}
