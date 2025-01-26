/*
 * SPDX-FileCopyrightText: 2021-2024 Espressif Systems (Shanghai) CO LTD
 *
 * SPDX-License-Identifier: Apache-2.0
 */

#pragma once

#include "sdkconfig.h"
#include "soc/soc_caps.h"
#if SOC_LCD_RGB_SUPPORTED
#include "esp_lcd_panel_rgb.h"
#endif
#if SOC_MIPI_DSI_SUPPORTED
#include "esp_lcd_mipi_dsi.h"
#endif

#ifdef __cplusplus
extern "C" {
#endif

/**
 * @brief LCD panel initialization commands.
 *
 */
typedef struct {
    int cmd;                /*<! The specific LCD command */
    const void *data;       /*<! Buffer that holds the command specific data */
    size_t data_bytes;      /*<! Size of `data` in memory, in bytes */
    unsigned int delay_ms;  /*<! Delay in milliseconds after this command */
} esp_lcd_panel_vendor_init_cmd_t;

/**
 * @brief LCD panel vendor configuration.
 *
 * @note  This structure needs to be passed to the `vendor_config` field in `esp_lcd_panel_dev_config_t`.
 *
 */
typedef struct {
    const esp_lcd_panel_vendor_init_cmd_t *init_cmds;   /*!< Pointer to initialization commands array. Set to NULL if using default commands.
                                                         *   The array should be declared as `static const` and positioned outside the function.
                                                         *   Please refer to `vendor_specific_init_default` in source file.
                                                         */
    unsigned int init_cmds_size;                        /*<! Number of commands in above array */

#if SOC_LCD_RGB_SUPPORTED
    const esp_lcd_rgb_panel_config_t *rgb_config;       /*!< RGB panel configuration. */
#endif
#if SOC_MIPI_DSI_SUPPORTED
    struct {
        uint8_t  lane_num;                      /*!< Number of MIPI-DSI lanes, defaults to 2 if set to 0 */
        esp_lcd_dsi_bus_handle_t dsi_bus;               /*!< MIPI-DSI bus configuration */
        const esp_lcd_dpi_panel_config_t *dpi_config;   /*!< MIPI-DPI panel configuration */
    } mipi_config;
#endif

    struct {
        unsigned int mirror_by_cmd: 1;              /*<! The `mirror()` function will be implemented by LCD command if set to 1.
                                                     *   Otherwise, the function will be implemented by software.
                                                     */
        union {
            unsigned int auto_del_panel_io: 1;
            unsigned int enable_io_multiplex: 1;
        };  /*<! Delete the panel IO instance automatically if set to 1. All `*_by_cmd` flags will be invalid.
             *   If the panel IO pins are sharing other pins of the RGB interface to save GPIOs,
             *   Please set it to 1 to release the panel IO and its pins (except CS signal).
             *   This flag is only valid for the RGB interface.
             */
        unsigned int use_spi_interface: 1;          /*<! Set to 1 if use SPI interface */
        unsigned int use_qspi_interface: 1;         /*<! Set to 1 if use QSPI interface */
        unsigned int use_rgb_interface: 1;          /*<! Set to 1 if use RGB interface */
        unsigned int use_mipi_interface: 1;         /*<! Set to 1 if using MIPI interface */
    } flags;
} esp_lcd_panel_vendor_config_t;

#ifdef __cplusplus
}
#endif
