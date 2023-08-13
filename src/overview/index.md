# 开发方式总览

在 Espressif 芯片上使用 Rust 开发，有以下两种方式：

- 使用 `std` 库，即标准库。
- 使用 `core` 库（`no_std`），即裸机开发。

两种方式各有各的优缺点，因此需要根据项目需求选取。本章包含对两种开发方式的概述。

- [使用标准库 (`std`)][rust-esp-book-std]
- [使用核心库 (`no_std`)][rust-esp-book-no-std]

另请参阅 [The Embedded Rust Book][embedded-rust-book-intro-std] 中对不同运行时的比较。

GitHub 上的 [esp-rs 组织][esp-rs organization] 有多个存储库，与在 Espressif 芯片上运行 Rust 相关。大多数所需的 crate 的源代码都托管在这里。

[rust-esp-book-std]: ./using-the-standard-library.md
[rust-esp-book-no-std]: ./using-the-core-library.md
[embedded-rust-book-intro-std]: https://docs.rust-embedded.org/book/intro/no-std.html#a-no_std-rust-environment
[esp-rs organization]: https://github.com/esp-rs/

## 存储库命名约定

在 [esp-rs 组织][esp-rs organization]中，我们使用以下命名约定：
- 以 `esp-` 开头的存储库关注 `no_std` 方式。例如 `esp-hal`
  - `no_std` 在裸机上运行，因此 `esp-` 代表 Espressif 芯片
- 以 `esp-idf-` 开头的存储库关注 `std` 方式。例如 `esp-idf-hal`
  - `std` 在裸机之上，还需要一个[额外的封装层][additional layer]，即 `esp-idf-`

[additional layer]: https://github.com/espressif/esp-idf

## 对 Espressif 产品的支持

> ⚠️ **注意**：
>
> - ✅ - 此功能已实现或支持
> - ⏳ - 此功能正在开发
> - ❌ - 不支持此功能

| 芯片     | `std` | `no_std` |
| -------- | :---: | :------: |
| ESP32    |   ✅   |    ✅     |
| ESP32-C2 |   ✅   |    ✅     |
| ESP32-C3 |   ✅   |    ✅     |
| ESP32-C6 |   ✅   |    ✅     |
| ESP32-S2 |   ✅   |    ✅     |
| ESP32-S3 |   ✅   |    ✅     |
| ESP32-H2 |   ✅   |    ✅     |
| ESP8266  |   ❌   |    ✅     |

> ⚠️ **注意**： ESP8266 系列不在本书的讨论范围内。Rust 对
> ESP8266 系列的支持有限，且并未得到 Espressif 的官方支持。

在一定情况下支持的产品，在本书中称为“支持的 Espressif 产品”。
