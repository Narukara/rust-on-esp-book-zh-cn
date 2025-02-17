# `esp-generate` 简介

既然我们已经了解了如何[生成一个 `no_std` 项目][generate-no-std]，让我们看看生成的项目里有哪些东西，
尝试理解它的各个部分，并运行它。

[generate-no-std]: ./index.md

## 检查生成的项目

When creating a project from [`esp-generate`][esp-generate] with no extra options:
```
esp-generate --chip esp32c3 your-project
```

应该会生成类似这样的文件结构：

```text
├── build.rs
├── .cargo
│   └── config.toml
├── Cargo.toml
├── .gitignore
├── rust-toolchain.toml
├── src
│   ├── bin
│   │   └── main.rs
│   └── lib.rs
└── .vscode
    └── settings.json
```

在进一步讨论之前，让我们看看这些文件的用途。
- [`build.rs`][build.rs]
    - Sets the linker script arguments based on the template options.
- [`.cargo/config.toml`][config-toml]
    - Cargo 的配置
    - 定义了一些用于正确构建项目的选项
    - Contains the custom runner command for `espflash` or `probe-rs`. For example, `runner = "espflash flash --monitor"` - this means you can just use `cargo run` to flash and monitor your code
- [`Cargo.toml`][cargo-toml]
    - Cargo 清单（manifest），通常声明了一些元数据和项目的依赖项
- [`.gitignore`][gitignore]
    - 指示 `git` 要忽略哪些目录和文件
- [`rust-toolchain.toml`][rust-toolchain-toml]
    - 定义要使用的 Rust 工具链的种类
      - 根据目标设备，工具链可以是 `nightly` 或 `esp`
- `src/bin/main.rs`
    - 项目的主要源文件
    - 关于它的详细信息，请参阅下面的 [`main.rs` 简介][main-rs]一节
- `src/lib.rs`
    - This tells the Rust compiler that this code doesn't use `libstd`
- `.vscode/settings.json`
    - Defines a set of settings for Visual Studio Code to make Rust Analyzer work.

[esp-generate]: https://github.com/esp-rs/esp-generate
[build.rs]: https://doc.rust-lang.org/cargo/reference/build-scripts.html
[main-rs]: #mainrs-简介
[cargo-toml]: https://doc.rust-lang.org/cargo/reference/manifest.html
[gitignore]: https://git-scm.com/docs/gitignore
[config-toml]: https://doc.rust-lang.org/cargo/reference/config.html
[rust-toolchain-toml]: https://rust-lang.github.io/rustup/overrides.html#the-toolchain-file

### `main.rs` 简介

```rust,ignore
 1 #![no_std]
 2 #![no_main]
```

- `#![no_std]`
  - 用于告知 Rust 编译器这段代码不使用 `libstd`
- `#![no_main]`
  - `no_main` 属性表示该程序不使用标准的 main 接口，这通常用在有完整的操作系统的情况下。我们将使用 `esp-riscv-rt` crate 中的入口（entry）属性来创建一个自定义入口点（entry point），而不是使用标准的 main。在此程序中，我们将入口点命名为 `main`，但也可以使用任何其他名称。入口点函数必须是[发散函数][diverging-function]，即具有签名 `fn foo() -> !`，这种类型表明该函数永远不会返回——这意味着程序永远不会终止。

```rust,ignore
4 use esp_backtrace as _;
5 use esp_hal::delay::Delay;
6 use esp_hal::prelude::*;
7 use log::info;
```
- `use esp_backtrace as _;`
  - 由于我们处于裸机环境中，因此需要一个 panic 处理程序，该处理程序在代码发生 panic 时运行
  - 有多种不同的 crate 可选（例如 `panic-halt`），但是 `esp-backtrace` 提供了一个打印回溯地址的实现——与 `espflash` 配合，这些地址可以被解析为源代码中的位置
- `use esp_hal::delay::Delay;`
  - Provides `Delay` driver implementation.
- `use esp_hal::prelude::*;`
  - Imports the `esp-hal` [prelude][prelude].

```rust,ignore
 8 #[entry]
 9 fn main() -> ! {
10    esp_println::logger::init_logger_from_env();
11
12    let delay = Delay::new();
13    loop {
14      info!("Hello world!");
15      delay.delay(500.millis());
16    }
17 }
```

`main` 函数中包含：
- `esp_println::logger::init_logger_from_env();`
  - Initializes the logger, if `ESP_LOG` environment variable is defined, it will use that log level.
- `let delay = Delay::new();`
  - Creates a delay instance.
- `loop {}`
  - Since our function is supposed to never return, we use a loop
- `info!("Hello world!");`
  - Creates a log message with `info` level that prints "Hello world!".
- `delay.delay(500.millis());`
  - Waits for 500 milliseconds.

[diverging-function]: https://doc.rust-lang.org/beta/rust-by-example/fn/diverging.html

## 运行代码

构建和运行这段代码只需：

```shell
cargo run --release
```

这会根据配置构建代码，并执行 [`espflash`][espflash] 将其烧写到板子上。

由于 [`runner` 配置][runner-config]还会将 `--monitor` 参数传递给 [`espflash`][espflash]，屏幕上将显示打印的内容。

确保已经安装了 [`espflash`][espflash]，否则此步骤会失败。执行此命令以安装 [`espflash`][espflash]：
`cargo install espflash`

屏幕上应该会显示类似这样的内容：

```text
...
[2024-11-14T09:29:32Z INFO ] Serial port: '/dev/ttyUSB0'
[2024-11-14T09:29:32Z INFO ] Connecting...
[2024-11-14T09:29:32Z INFO ] Using flash stub
[2024-11-14T09:29:33Z WARN ] Setting baud rate higher than 115,200 can cause issues
Chip type:         esp32c3 (revision v0.3)
Crystal frequency: 40 MHz
Flash size:        4MB
Features:          WiFi, BLE
MAC address:       a0:76:4e:5a:d2:c8
App/part. size:    76,064/4,128,768 bytes, 1.84%
[00:00:00] [========================================]      13/13      0x0
[00:00:00] [========================================]       1/1       0x8000
[00:00:00] [========================================]      11/11      0x10000
[2024-11-14T09:29:35Z INFO ] Flashing has completed!
Commands:
    CTRL+R    Reset chip
    CTRL+C    Exit
...
INFO - Hello world!
```

这些是第一和第二阶段 bootloader 产生的信息，然后是我们的 “Hello world” 信息！

这就是这段代码做的事情。

可以按 `CTRL+R` 重启，或按 `CTRL+C` 退出。

如果在构建项目时遇到了什么问题，请查看 [Troubleshooting][troubleshooting] 章节。


[prelude]: https://doc.rust-lang.org/reference/names/preludes.html
[espflash]: https://github.com/esp-rs/espflash/tree/main/espflash
[runner-config]: https://doc.rust-lang.org/cargo/reference/config.html#targettriplerunner
[troubleshooting]: ../../troubleshooting/index.md
