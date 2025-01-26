/*
 * SPDX-FileCopyrightText: 2023-2024 Espressif Systems (Shanghai) CO LTD
 *
 * SPDX-License-Identifier: Apache-2.0
 */

#include "soc/soc_caps.h"

#if SOC_MIPI_DSI_SUPPORTED
#include "ESP_PanelLog.h"
#include "JD9365.h"

static const char *TAG = "JD9365_CPP";

ESP_PanelLcd_JD9365::ESP_PanelLcd_JD9365(ESP_PanelBus *bus, uint8_t color_bits, int rst_io):
    ESP_PanelLcd(bus, color_bits, rst_io)
{
    disabled_functions.set_gap = 1;
    disabled_functions.swap_xy = 1;
}

ESP_PanelLcd_JD9365::ESP_PanelLcd_JD9365(ESP_PanelBus *bus, const esp_lcd_panel_dev_config_t &panel_config):
    ESP_PanelLcd(bus, panel_config)
{
    disabled_functions.set_gap = 1;
    disabled_functions.swap_xy = 1;
}

ESP_PanelLcd_JD9365::~ESP_PanelLcd_JD9365()
{
    ESP_PANEL_ENABLE_TAG_DEBUG_LOG();

    if (handle == NULL) {
        goto end;
    }

    if (!del()) {
        ESP_LOGE(TAG, "Delete device failed");
    }

end:
    ESP_LOGD(TAG, "Destroyed");
}

bool ESP_PanelLcd_JD9365::init(void)
{
    ESP_PANEL_CHECK_NULL_RET(bus, false, "Invalid bus");

    /* Load MIPI-DSI configurations from bus to vendor configurations */
    ESP_PANEL_CHECK_FALSE_RET(loadVendorConfigFromBus(), false, "Load vendor config from bus failed");

    /* Create panel handle */
    ESP_PANEL_CHECK_ERR_RET(
        esp_lcd_new_panel_jd9365(bus->getPanelIO_Handle(), &panel_config, &handle), false, "Create panel failed"
    );

    return true;
}

#endif
