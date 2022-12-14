variable "owner" {
  description = "(Required) Company to which the projects belong."
  type        = string
}

variable "environment" {
  description = "(Required) The name of the environment."
  type        = string
}

variable "project" {
  description = "(Required) The name of the project."
  type        = string
}

variable "location" {
  description = "(Required) The Azure Region where the resources should exist."
  type        = string
}

variable "dns_zone_name" {
  description = "(Required) The name of the DNS Zone."
  type        = string
}

variable "static_web_app_plan_sku" {
  description = "(Required) SKU size and tier of the Static Web App."
  type        = object({
    tier = string
    size = string
  })
}
