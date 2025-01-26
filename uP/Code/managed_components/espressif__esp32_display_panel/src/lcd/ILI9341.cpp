/*
 * SPDX-FileCopyrightText: 2023-2024 Espressif Systems (Shanghai) CO LTD
 *
 * SPDX-License-Identifier: Apache-2.0
 */

#include "ESP_PanelLog.h"
#include "ILI9341.h"

static const char *TAG = "ILI9341_CPP";

ESP_PanelLcd_ILI9341::ESP_PanelLcd_ILI9341(ESP_PanelBus *bus, uint8_t color_bits, int rst_io):
    ESP_PanelLcd(bus, color_bits, rst_io)
{
}

ESP_PanelLcd_ILI9341::ESP_PanelLcd_ILI9341(ESP_PanelBus *bus, const esp_lcd_panel_dev_config_t &panel_config):
    ESP_PanelLcd(bus, panel_config)
{
}

ESP_PanelLcd_ILI9341::~ESP_PanelLcd_ILI9341()
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

bool ESP_PanelLcd_ILI9341::init(void)
{
    ESP_PANEL_CHECK_NULL_RET(bus, false, "Invalid bus");

    /* Load configurations from bus to vendor configurations */
    ESP_PANEL_CHECK_FALSE_RET(loadVendorConfigFromBus(), false, "Load vendor config from bus failed");

    ESP_PANEL_CHECK_ERR_RET(esp_lcd_new_panel_ili9341(bus->getPanelIO_Handle(), &panel_config, &handle), false, "Create panel failed");

    return true;
}
