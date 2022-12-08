variable "resource_project_prefix" {
  description = "(Required) A prefix of the Application Insights name."
  type        = string
}

variable "resource_group_name" {
  description = "(Required) The Resource Group where the resource exists."
  type        = string
}

variable "application_insights_id" {
  description = "(Required) The ID of the Application Insights."
  type        = string
}

