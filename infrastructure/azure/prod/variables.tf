variable "owner" {
  type        = string
  description = "(Required) Company to which the projects belong."
}

variable "environment" {
  type        = string
  description = "(Required) The name of the environment."
}

variable "project" {
  type        = string
  description = "(Required) The name of the project."
}

variable "location" {
  type        = string
  description = "(Required) The Azure Region where the resources should exist."
}

variable "dns_zone_name" {
  type        = string
  description = "(Required) The name of the DNS Zone."
}

variable "static_web_app_plan_sku" {
  type = object({
    tier = string
    size = string
  })
  description = "(Required) SKU size and tier of the Static Web App."
}
