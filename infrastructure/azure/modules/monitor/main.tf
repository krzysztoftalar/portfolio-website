# Monitor Action Group
resource "azurerm_monitor_action_group" "developers_group" {
  name                = "Developers"
  short_name          = "Developers"
  resource_group_name = var.resource_group_name

  email_receiver {
    name                    = "Krzysztof Talar"
    email_address           = "krzysztof.talar@protonmail.com"
    use_common_alert_schema = true
  }
}

# Monitor Alert
resource "azurerm_monitor_smart_detector_alert_rule" "failure_anomalies" {
  name                = "Failure Anomalies - ${var.resource_project_prefix}"
  resource_group_name = var.resource_group_name
  severity            = "Sev0"
  frequency           = "PT1M"
  detector_type       = "FailureAnomaliesDetector"
  description         = "Failure Anomalies notifies you of an unusual rise in the rate of failed HTTP requests or dependency calls."
  scope_resource_ids  = [var.application_insights_id]

  action_group {
    ids = [azurerm_monitor_action_group.developers_group.id]
  }
}
