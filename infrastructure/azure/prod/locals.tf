locals {
  resource_project_suffix = "${var.project}-${var.environment}"

  tags = tomap({
    "Owner"       = var.owner,
    "Environment" = var.environment,
    "Project"     = var.project,
    "Management"  = "Terraform Cloud - Remote",
  })
}
