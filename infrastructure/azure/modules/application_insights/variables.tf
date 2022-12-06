variable "rg_name" {
  type = string
  description = "(Required) The Resource Group where the resource exists."
}

variable "location" {
  type = string
  description = "(Required) The Azure Region where the resources should exist."
}

variable "resource_project_prefix" {
  type        = string
  description = "(Required) A prefix of the Application Insights name."
}

variable "tags" {
  type        = map(string)
  description = "(Required) A mapping of tags to assign to the resource."
}
