variable "resource_project_suffix" {
  description = "(Required) A suffix of the Application Insights name."
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

variable "tags" {
  description = "(Required) A mapping of tags to assign to the resource."
  type        = map(string)
}

