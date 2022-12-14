variable "resource_group_name" {
  description = "(Required) The Resource Group where the resource exists."
  type        = string
}

variable "location" {
  description = "(Required) The Azure Region where the resources should exist."
  type        = string
}

variable "resource_project_suffix" {
  description = "(Required) A suffix of the Application Insights name."
  type        = string
}

variable "tags" {
  description = "(Required) A mapping of tags to assign to the resource."
  type        = map(string)
}
