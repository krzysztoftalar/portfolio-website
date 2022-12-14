# ----------------------------------------------
# Monitor Action Group
# ----------------------------------------------
resource "azurerm_monitor_action_group" "developers_group" {
  name                = "${local.action_group_prefix}-developers-${var.resource_project_suffix}"
  short_name          = "developers"
  resource_group_name = var.resource_group_name

  email_receiver {
    name                    = "Krzysztof Talar"
    email_address           = "krzysztof.talar@protonmail.com"
    use_common_alert_schema = true
  }

  tags = var.tags
}

# ----------------------------------------------
# Monitor Alert - built-in FailureAnomaliesDetector
# ----------------------------------------------
resource "azurerm_monitor_smart_detector_alert_rule" "failure_anomalies" {
  name                = "${local.alert_rule_prefix}-failure-anomalies-${var.resource_project_suffix}"
  resource_group_name = var.resource_group_name
  severity            = "Sev0" // Critical
  frequency           = "PT1M" // 1 min
  detector_type       = "FailureAnomaliesDetector"
  description         = "Failure Anomalies notifies you of an unusual rise in the rate of failed HTTP requests or dependency calls."
  scope_resource_ids  = [var.application_insights_id]

  action_group {
    ids = [azurerm_monitor_action_group.developers_group.id]
  }

  tags = var.tags
}
