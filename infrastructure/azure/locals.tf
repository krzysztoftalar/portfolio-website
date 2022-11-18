locals {
  resource_prefix = "${substr(var.owner, 0, 1)}${substr(var.environment, 0, 1)}"
  resource_project_prefix = "${local.resource_prefix}-${var.project}"

  tags = tomap({
    "Owner" = var.owner,
    "Environment" = var.environment,
    "Project" = var.project,
    "Management" = "Terraform",
  })
}
