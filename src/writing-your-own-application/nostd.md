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

> ⚠️ **注意**：在 [`esp-hal`][esp-hal] 的 [`examples`][esp-hal-example] 文件夹下有若干示例，涵盖了特定外设的使用方法。针对给定示例的运行方式和设备兼容性等信息，可以参考 [`examples` README][examples-readme] 。

[no-std-book]: https://esp-rs.github.io/no_std-training/
[no-std-repository]: https://github.com/esp-rs/no_std-training
[esp-rust-board]: https://github.com/esp-rs/esp-rust-board
[hello-world]: https://github.com/esp-rs/no_std-training/tree/main/intro/hello-world
[panic]: https://github.com/esp-rs/no_std-training/tree/main/intro/panic
[blinky]: https://github.com/esp-rs/no_std-training/tree/main/intro/blinky
[button]: https://github.com/esp-rs/no_std-training/tree/main/intro/button
[button-interrupt]: https://github.com/esp-rs/no_std-training/tree/main/intro/button-interrupt
[esp-hal]: https://github.com/esp-rs/esp-hal
[esp-hal-example]: https://github.com/esp-rs/esp-hal/tree/main/examples
[examples-readme]: https://github.com/esp-rs/esp-hal/blob/main/examples/README.md
