locals {
  resource_project_prefix = "${var.project}-${var.environment}"

  tags = tomap({
    "Owner"       = var.owner,
    "Environment" = var.environment,
    "Project"     = var.project,
    "Management"  = "Terraform",
  })
}
