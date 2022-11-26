variable "tags" {
  type = map(string)
  description = "(Required) A mapping of tags to assign to the resource."
}

variable "location" {
  type = string
  description = "(Required) The Azure Region where the resources should exist."
}

variable "resource_project_prefix" {
  type = string
  description = "(Required) A prefix of the Resource Group name."
}
