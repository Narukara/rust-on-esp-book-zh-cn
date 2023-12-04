# `esp-idf-template` 简介

既然我们已经了解了如何[生成一个 `std` 项目][generate-std]，让我们看看生成的项目里有哪些东西，并尝试理解它的各个部分。

[generate-std]: ./index.md

## 检查生成的项目

从 [`esp-idf-template`][esp-idf-template] 创建项目，使用以下配置：
- Which MCU to target? · `esp32c3`
- Configure advanced template options? · `false`

在本节中，我们使用默认配置。如果需要进一步修改，请参阅 [additional prompts][prompts]。

应该会生成类似这样的文件结构：

```text
├── .cargo
│   └── config.toml
├── src
│   └── main.rs
├── .gitignore
├── build.rs
├── Cargo.toml
├── rust-toolchain.toml
└── sdkconfig.defaults
```

在进一步讨论之前，让我们看看这些文件的用途。

- [`.cargo/config.toml`][config-toml]
    - Cargo 的配置
    - 包含项目的目标
    - 包含 `runner = "espflash flash --monitor"` - 这意味着你可以用 `cargo run` 来烧写并监视代码
    - 包含要使用的链接器，在这里是 [`ldproxy`][ldproxy]
    - 启用了不稳定的 Cargo 特性 `build-std`
    - 包含 `ESP-IDF-VERSION` 环境变量，用于告知 [`esp-idf-sys`][esp-idf-sys] 本项目要使用哪个版本的 ESP-IDF
- `src/main.rs`
    - 项目的主要源文件
    - 关于它的详细信息，请参阅下面的 [`main.rs` 简介][main-rs]
- [`.gitignore`][gitignore]
    - 指示 `git` 要忽略哪些目录和文件
- [`build.rs`][build-rs]
    - 将链接参数传递给 `ldproxy`
- [`Cargo.toml`][cargo-toml]
    - Cargo 清单（manifest），通常声明了一些元数据和项目的依赖项
- [`rust-toolchain.toml`][rust-toolchain-toml]
    - 定义要使用的 Rust 工具链的种类
      - 根据目标设备，工具链可以是 `nightly` 或 `esp`
- [`sdkconfig.defaults`][sdkconfig-defaults]
    - 包含一些配置，用于覆盖 ESP-IDF 的默认值

[esp-idf-template]: https://github.com/esp-rs/esp-idf-template
[prompts]: https://github.com/esp-rs/esp-idf-template#generate-the-project
[main-rs]:#mainrs-简介
[config-toml]: https://doc.rust-lang.org/cargo/reference/config.html
[ldproxy]: https://github.com/esp-rs/embuild/tree/master/ldproxy
[esp-idf-sys]: https://github.com/esp-rs/esp-idf-sys
[gitignore]: https://git-scm.com/docs/gitignore
[build-rs]: https://doc.rust-lang.org/cargo/reference/build-scripts.html
[cargo-toml]: https://doc.rust-lang.org/cargo/reference/manifest.html
[rust-toolchain-toml]: https://rust-lang.github.io/rustup/overrides.html#the-toolchain-file
[sdkconfig-defaults]: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/build-system.html#custom-sdkconfig-defaults

### `main.rs` 简介

```rust,ignore
1 use esp_idf_sys as _; // If using the `binstart` feature of `esp-idf-sys`, always keep this module imported
2
3 fn main() {
4     // It is necessary to call this function once. Otherwise some patches to the runtime
5     // implemented by esp-idf-sys might not link properly. See https://github.com/esp-rs/esp-idf-template/issues/71
6     esp_idf_sys::link_patches();
7     println!("Hello, world!");
8 }
```

第一行是一个导入语句，定义了 ESP-IDF 的入口点（当根 crate 是定义了 main 函数的二进制 crate 时）。

然后，下面是一个普通的 main 函数，其中有几行代码：
- 调用 `esp_idf_sys::link_patches` 函数，确保一些用 Rust 实现的 ESP-IDF 补丁能够被链接到最终的可执行文件里。
- 在控制台里打印著名的 “Hello, world!”

## 运行代码

构建和运行这段代码只需：

```shell
cargo run
```

这会根据配置构建代码，并执行 [`espflash`][espflash] 将其烧写到板子上。

由于 [`runner` 配置][runner-config]还会将 `--monitor` 参数传递给 [`espflash`][espflash]，屏幕上将显示打印的内容。

确保已经安装了 [`espflash`][espflash]，否则此步骤会失败。执行此命令以安装 [`espflash`][espflash]：
`cargo install espflash`

屏幕上应该会显示类似这样的内容：

```text
[2023-04-18T08:05:09Z INFO ] Connecting...
[2023-04-18T08:05:10Z INFO ] Using flash stub
[2023-04-18T08:05:10Z WARN ] Setting baud rate higher than 115,200 can cause issues
Chip type:         esp32c3 (revision v0.3)
Crystal frequency: 40MHz
Flash size:        4MB
Features:          WiFi, BLE
MAC address:       60:55:f9:c0:39:7c
App/part. size:    478,416/4,128,768 bytes, 11.59%
[00:00:00] [========================================]      13/13      0x0
[00:00:00] [========================================]       1/1       0x8000
[00:00:04] [========================================]     227/227     0x10000
[2023-04-18T08:05:15Z INFO ] Flashing has completed!
Commands:
    CTRL+R    Reset chip
    CTRL+C    Exit

...
I (344) cpu_start: Starting scheduler.
Hello, world!
```

如你所见，这些是第一和第二阶段 bootloader 产生的信息，然后是我们的 “Hello, world!”。

可以按 `CTRL+R` 重启，或按 `CTRL+C` 退出。

如果在构建项目时遇到了什么问题，请查看 [Troubleshooting][troubleshooting] 章节。

[espflash]: https://github.com/esp-rs/espflash/tree/main/espflash
[runner-config]: https://doc.rust-lang.org/cargo/reference/config.html#targettriplerunner
[troubleshooting]: ../../troubleshooting/index.md
