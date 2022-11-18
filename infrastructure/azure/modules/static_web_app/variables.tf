variable "app_name" {
  type = string
}

variable "rg_name" {
  type = string
}

variable "tags" {
  type = map(string)
}

variable "location" {
  type = string
}

variable "resource_project_prefix" {
  type = string
}

variable "static_web_app_plan_sku" {
  type = object({
    tier = string
    size = string
  })
}
