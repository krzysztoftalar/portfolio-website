variable "dns_zone_name" {
  type = string
  description = "(Required) The name of the DNS Zone."
}

variable "rg_name" {
  type = string
  description = "(Required) The Resource Group where the resource exists."
}

variable "swa_id" {
  type = string
  description = "(Required) Id of the Static Web App."
}

variable "tags" {
  type = map(string)
  description = "(Required) A mapping of tags to assign to the resource."
}
