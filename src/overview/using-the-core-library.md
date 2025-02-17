# 使用核心库（`no_std`）

嵌入式 Rust 开发者可能更熟悉使用 `no_std`。这种开发方式不使用 `std`（Rust [`标准`][rust-lib-std]库），而使用它的一个子集，即[`核心`][rust-lib-core]库。[The Embedded Rust Book][embedded-rust-book] 中的[一章][embedded-rust-book-no-std]介绍了相关的知识。

需要注意的是，`no_std` 使用 Rust `核心`库。由于该库是 Rust `标准`库的一部分，因此 `no_std` crate 可以在 `std` 环境中编译。反之则不然：`std` crate 无法在 `no_std` 环境中编译。在决定选择哪个库时，请记住这一点。

[embedded-rust-book]: https://docs.rust-embedded.org/
[embedded-rust-book-no-std]: https://docs.rust-embedded.org/book/intro/no-std.html
[rust-lib-core]: https://doc.rust-lang.org/core/index.html
[rust-lib-std]: https://doc.rust-lang.org/std/index.html

## 当前支持情况

下表展示了目前各类乐鑫产品对 `no_std` 的支持情况。

|          | [HAL][esp-hal] | [Wi-Fi/BLE/ESP-NOW][esp-wifi] | [Backtrace][esp-backtrace] | [Storage][esp-storage] |
| -------- | :------------: | :---------------------------: | :------------------------: | :--------------------: |
| ESP32    |       ✅        |               ✅               |             ✅              |           ✅            |
| ESP32-C2 |       ✅        |               ✅               |             ✅              |           ✅            |
| ESP32-C3 |       ✅        |               ✅               |             ✅              |           ✅            |
| ESP32-C6 |       ✅        |               ✅               |             ✅              |           ✅            |
| ESP32-H2 |       ✅        |               ✅               |             ✅              |           ✅            |
| ESP32-S2 |       ✅        |               ✅               |             ✅              |           ✅            |
| ESP32-S3 |       ✅        |               ✅               |             ✅              |           ✅            |

> ⚠️ **注意**:
>
> - Wi-Fi/BLE/ESP-NOW 一列中的 ✅ 表示此目标支持其中至少一种功能。详细情况参见 esp-wifi 仓库中的 [Current support][esp-wifi-current-support] 表格。
> - [ESP8266 HAL][esp8266-hal] 处于维护状态，后续不会对此芯片做进一步开发。

[esp-hal]: https://github.com/esp-rs/esp-hal/tree/main/esp-hal "Hardware abstraction layer"
[esp-wifi]: https://github.com/esp-rs/esp-hal/tree/main/esp-wifi "Wi-Fi, BLE and ESP-NOW support"
[esp-backtrace]: https://github.com/esp-rs/esp-hal/tree/main/esp-backtrace "Exception and panic handlers"
[esp-storage]: https://github.com/esp-rs/esp-hal/tree/main/esp-storage "Embedded-storage traits to access unencrypted flash memory"
[esp-wifi-current-support]: https://github.com/esp-rs/esp-hal/tree/main/esp-wifi#current-support
[esp8266-hal]: https://github.com/esp-rs/esp8266-hal "ESP8266 Hardware abstraction layer"

### `esp-rs` 相关的 Crate

| 仓库                       | 描述                                                |
| -------------------------------- | ---------------------------------------------------------- |
| [`esp-hal`][esp-hal]             | 硬件抽象层                                 |
| [`esp-pacs`][esp-pacs]           | 外设访问 crate（PAC）                                   |
| [`esp-wifi`][esp-wifi]           | Wi-Fi、BLE 和 ESP-NOW 支持                             |
| [`esp-alloc`][esp-alloc]         | 简单的堆分配器                                      |
| [`esp-println`][esp-println]     | `print!` 和 `println!`                                      |
| [`esp-backtrace`][esp-backtrace] | 异常和恐慌（panic）处理程序                               |
| [`esp-storage`][esp-storage]     | 用于访问未加密 flash 的嵌入式存储 trait |

### 何时适合使用核心库（`no_std`）

- 内存占用小：如果你的嵌入式系统资源有限，并且需要较小的内存占用，采用裸机开发方式可能较好。因为引入 `std` 会极大增加最终生成的二进制程序尺寸和编译时间。
- 直接的硬件控制：如果你的嵌入式系统需要对硬件进行更直接的控制，例如底层设备驱动或访问专用的硬件功能，采用裸机开发可能较好。因为 `std` 引入了额外的抽象层，使得直接与硬件交互变得更加困难。
- 实时性约束或时间关键型应用：如果你的嵌入式系统需要较强的实时性，或较低的响应延迟时间。因为 `std` 可能会引入不可预测的延迟和开销，从而影响实时性。
- 自定义需求：裸机开发允许对应用程序的行为进行更多自定义和细粒度的控制，这在专用或非标准环境中非常有用。

[esp-pacs]: https://github.com/esp-rs/esp-pacs "Peripheral access crates"
[esp-alloc]: https://github.com/esp-rs/esp-hal/tree/main/esp-alloc "Simple heap allocator"
[esp-println]: https://github.com/esp-rs/esp-hal/tree/main/esp-println "print!, println!"
