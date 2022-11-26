variable "rg_name" {
  type        = string
  description = "(Required) The Resource Group where the resource exists."
}

variable "dns_zone_name" {
  type        = string
  description = "(Required) The name of the DNS Zone."
}

variable "location" {
  type        = string
  description = "(Required) The Azure Region where the resources should exist."
}

variable "resource_project_prefix" {
  type        = string
  description = "(Required) A prefix of the Static Web App name."
}

variable "static_web_app_plan_sku" {
  type = object({
    tier = string
    size = string
  })
  description = "(Required) SKU size and tier of the Static Web App."
}

variable "tags" {
  type        = map(string)
  description = "(Required) A mapping of tags to assign to the resource."
}
