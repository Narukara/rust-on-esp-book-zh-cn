# 编写 `no_std` 应用
如果你想要学习如何开发 `no_std` 应用，可以阅读以下材料：
- 书：[Embedded Rust (`no_std`) on Espressif][no-std-book]
- 仓库：[`no_std-training`][no-std-repository]

这个教程是基于 [ESP32-C3-DevKit-RUST-1][esp-rust-board] 开发板的。也可以使用其他乐鑫开发板，但是可能需要修改代码和项目配置。

这个教程包含：
* 入门示例：
   * [基本的 hello-world][hello-world]
   * [panic 示例][panic]
   * [点灯示例][blinky]
   * [按钮示例][button]
   * [按钮+中断示例][button-interrupt]

> ⚠️ **注意**：每个 SoC [`esp-hal`][esp-hal] 的示例文件夹下都有几个示例，涵盖了特定外设的使用方法。例如 [`esp32c3-hal/examples`][esp32c3-hal-examples]。

[no-std-book]: https://esp-rs.github.io/no_std-training/
[no-std-repository]: https://github.com/esp-rs/no_std-training
[esp-rust-board]: https://github.com/esp-rs/esp-rust-board
[hello-world]: https://github.com/esp-rs/no_std-training/tree/main/intro/hello-world
[panic]: https://github.com/esp-rs/no_std-training/tree/main/intro/panic
[blinky]: https://github.com/esp-rs/no_std-training/tree/main/intro/blinky
[button]: https://github.com/esp-rs/no_std-training/tree/main/intro/button
[button-interrupt]: https://github.com/esp-rs/no_std-training/tree/main/intro/button-interrupt
[esp-hal]: https://github.com/esp-rs/esp-hal
[esp32c3-hal-examples]: https://github.com/esp-rs/esp-hal/tree/main/esp32c3-hal/examples
