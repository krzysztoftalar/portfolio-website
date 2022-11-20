variable "owner" {
  type = string
}

variable "environment" {
  type = string
}

variable "project" {
  type = string
}

variable "location" {
  type = string
}

variable "dns_zone_name" {
  type = string
}

variable "static_web_app_plan_sku" {
  type = object({
    tier = string
    size = string
  })
}
