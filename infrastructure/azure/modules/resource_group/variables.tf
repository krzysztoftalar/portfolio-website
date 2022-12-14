variable "location" {
  description = "(Required) The Azure Region where the resources should exist."
  type        = string
}

variable "resource_project_suffix" {
  description = "(Required) A suffix of the Resource Group name."
  type        = string
}

variable "tags" {
  description = "(Required) A mapping of tags to assign to the resource."
  type        = map(string)
}
