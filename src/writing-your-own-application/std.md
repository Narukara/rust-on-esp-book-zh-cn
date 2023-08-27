# 编写 `std` 应用

如果你想要学习如何开发 `std` 应用，可以阅读这些我们与 [Ferrous Systems][ferrous-systems] 合作编写的材料：
- 书：[Embedded Rust on Espressif][std-book]
- 仓库：[`std-training`][std-repository]

这个教程是基于 [ESP32-C3-DevKit-RUST-1][esp-rust-board] 开发板的。也可以使用其他乐鑫开发板，但是可能需要修改代码和项目配置。

这个教程包含两个部分：

* [入门示例][intro]：
   * [基本硬件检查][hardware-check]
   * [HTTP 客户端][http-client]
   * [HTTP 服务器][http-server]
   * [MQTT 客户端][mqtt]
* [进阶示例][advanced]：
   * 底层 GPIO
   * 中断
   * [I2C 驱动][i2c-driver]
   * [读取 I2C 传感器][i2c-sensor-reading]
   * [GPIO/按钮中断][button-interrupt]
   * 驱动 RGB LED

> ⚠️ **注意**：[`esp-idf-hal`][esp-idf-hal] 的示例文件夹下有几个示例，涵盖了特定外设的使用方法。即 [`esp-idf-hal/examples`][esp-idf-hal-examples]。

[ferrous-systems]: https://ferrous-systems.com/
[std-book]: https://esp-rs.github.io/std-training/
[std-repository]: https://github.com/esp-rs/std-training
[esp-rust-board]: https://github.com/esp-rs/esp-rust-board
[intro]: https://github.com/esp-rs/std-training/tree/main/intro
[hardware-check]: https://github.com/esp-rs/std-training/tree/main/intro/hardware-check
[http-client]: https://github.com/esp-rs/std-training/tree/main/intro/http-client
[http-server]: https://github.com/esp-rs/std-training/tree/main/intro/http-server
[mqtt]: https://github.com/esp-rs/std-training/tree/main/intro/mqtt
[advanced]: https://github.com/esp-rs/std-training/tree/main/advanced
[i2c-driver]: https://github.com/esp-rs/std-training/tree/main/advanced/i2c-driver
[i2c-sensor-reading]: https://github.com/esp-rs/std-training/tree/main/advanced/i2c-sensor-reading
[button-interrupt]: https://github.com/esp-rs/std-training/tree/main/advanced/button-interrupt
[esp-idf-hal-examples]: https://github.com/esp-rs/esp-idf-hal/tree/master/examples
[esp-idf-hal]: https://github.com/esp-rs/esp-idf-hal
