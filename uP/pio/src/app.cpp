/*
 * SPDX-FileCopyrightText: 2024 Espressif Systems (Shanghai) CO LTD
 *
 * SPDX-License-Identifier: CC0-1.0
 */

#include <Arduino.h>
#include <ESP_Panel_Library.h>
#include <lvgl.h>
#include "lvgl_port_v8.h"
#include <panel/ESP_Panel.h>
// #include <lv_api_map_v8.h>

/**
/* To use the built-in examples and demos of LVGL uncomment the includes below respectively.
 * You also need to copy `lvgl/examples` to `lvgl/src/examples`. Similarly for the demos `lvgl/demos` to `lvgl/src/demos`.
 */
// #include <demos/lv_demos.h>
// #include <examples/lv_examples.h>

void setup()
{
    String title = "LVGL porting example";

    Serial.begin(115200);
    Serial.println(title + " start");

    Serial.println("Initialize panel device");
    ESP_Panel *panel = new ESP_Panel();
    panel->init();





    panel->begin();

    Serial.println("Initialize LVGL");
    lvgl_port_init(panel->getLcd(), panel->getTouch());




    Serial.println("Create UI");
    /* Lock the mutex due to the LVGL APIs are not thread-safe */

    Serial.println(title + " end");
}

void loop()
{

    uint16_t data = analogRead(GPIO_NUM_4);
    std::string string = "ADC VAL: " + std::to_string(data);


    data = data / 200;





    // DISPLAY CODE //
    lvgl_port_lock(-1);

    // DISPLAY TEXT //
    lv_obj_clean(lv_scr_act());
    /* Create a simple label */
    lv_obj_t *label = lv_label_create(lv_scr_act());
    lv_label_set_text(label, string.c_str());
    static lv_style_t style;
    lv_style_init(&style);
    // Set the font in the style (using a built-in font)
    lv_style_set_text_font(&style, &lv_font_montserrat_20);
    // Apply the style to the label
    lv_obj_add_style(label, &style, LV_PART_MAIN);
    lv_obj_align(label, LV_ALIGN_CENTER, -100,-100);



    // DISPLAY GRAPH //
    lvgl_port_unlock();

    Serial.println("IDLE loop");
    //delay(1000);
}
