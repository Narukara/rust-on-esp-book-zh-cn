# `esp-template` 简介

既然我们已经了解了如何[生成一个 `no_std` 项目][generate-no-std]，让我们看看生成的项目里有哪些东西，
尝试理解它的各个部分，并运行它。

[generate-no-std]: ./index.md

## 检查生成的项目

从 [`esp-template`][esp-template] 创建项目，使用以下配置：
-  Which MCU to target? · `esp32c3`
- Configure advanced template options? · `false`

在本节中，我们使用默认配置。如果需要进一步修改，请参阅 [additional prompts][prompts]。

应该会生成类似这样的文件结构：

```text
├── .cargo
│   └── config.toml
├── src
│   └── main.rs
├── .gitignore
├── Cargo.toml
├── LICENSE-APACHE
├── LICENSE-MIT
└── rust-toolchain.toml
```

在进一步讨论之前，让我们看看这些文件的用途。

- [`.cargo/config.toml`][config-toml]
    - Cargo 的配置
    - 定义了一些用于正确构建项目的选项
    - 包含 `runner = "espflash flash --monitor"` - 这意味着你可以用 `cargo run` 来烧写并监视代码
- `src/main.rs`
    - 项目的主要源文件
    - 关于它的详细信息，请参阅下面的 [`main.rs` 简介][main-rs]一节
- [`.gitignore`][gitignore]
    - 指示 `git` 要忽略哪些目录和文件
- [`Cargo.toml`][cargo-toml]
    - Cargo 清单（manifest），通常声明了一些元数据和项目的依赖项
- `LICENSE-APACHE`, `LICENSE_MIT`
    - 这些是 Rust 生态中最常用的许可证
    - 如果想使用其他许可证，可以删除这些文件，并修改 `Cargo.toml` 中的许可证
- [`rust-toolchain.toml`][rust-toolchain-toml]
    - 定义要使用的 Rust 工具链的种类
      - 根据目标设备，工具链可以是 `nightly` 或 `esp`

[esp-template]: https://github.com/esp-rs/esp-template
[prompts]: https://github.com/esp-rs/esp-template#esp-template
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
  - `no_main` 属性表示该程序不使用标准的 main 接口，该接口是为会接收参数的命令行应用设计的。我们将使用 `riscv-rt` crate 中的入口（entry）属性来创建一个自定义入口点（entry point），而不是使用标准的 main。在此程序中，我们将入口点命名为 `main`，但也可以使用任何其他名称。入口点函数必须是[发散函数][diverging-function]，即具有签名 `fn foo() -> !`，这种类型表明该函数永远不会返回——这意味着程序永远不会终止。

```rust,ignore
 4 use esp_backtrace as _;
 5 use esp_println::println;
 6 use hal::{clock::ClockControl, peripherals::Peripherals, prelude::*, timer::TimerGroup, Rtc};
```
- `use esp_backtrace as _;`
  - 由于我们处于裸机环境中，因此需要一个 panic 处理程序，该处理程序在代码发生 panic 时运行
  - 有多种不同的 crate 可选（例如 `panic-halt`），但是 `esp-backtrace` 提供了一个打印回溯地址的实现——与 `espflash`/`espmonitor` 配合，这些地址可以被解析为源代码中的位置
- `use esp_println::println;`
  - 提供了 `println!` 的实现
- `use hal:{...}`
  - 我们需要导入一些类型，以待后续使用
  - 这些都是来自于 `esp-hal`

```rust,ignore
 8 #[entry]
 9 fn main() -> ! {
10    let peripherals = Peripherals::take();
11    let mut system = peripherals.SYSTEM.split();
12    let clocks = ClockControl::boot_defaults(system.clock_control).freeze();
13
14    // 禁用 RTC 和 TIMG 看门狗定时器
15    let mut rtc = Rtc::new(peripherals.RTC_CNTL);
16    let timer_group0 = TimerGroup::new(
17        peripherals.TIMG0,
18        &clocks,
19        &mut system.peripheral_clock_control,
20    );
21    let mut wdt0 = timer_group0.wdt;
22    let timer_group1 = TimerGroup::new(
23        peripherals.TIMG1,
24        &clocks,
25        &mut system.peripheral_clock_control,
26    );
27    rtc.swd.disable();
28    rtc.rwdt.disable();
29    wdt0.disable();
30    wdt1.disable();
31
32    println!("Hello world!");
33
34    loop {}
35 }
```
`main` 函数中包含：
- `let peripherals = Peripherals::take().unwrap();`
  - HAL 驱动通常会通过 PAC（Peripheral Access Crate，外设访问 crate）获取到外设的所有权
  - 这里我们从 PAC 中取出所有外设，之后将他们传递给 HAL 驱动
- `let mut system = peripherals.SYSTEM.split();`
  - 有时，外设（此处为 System 外设）是粗粒度的，并不完全适合 HAL 驱动——因此这里我们将 System 外设分割成更小的部分，然后传递给驱动程序
- `let clocks = ClockControl::boot_defaults(system.clock_control).freeze();`
  - 这里配置了系统时钟——本例中，使用默认值即可
  - 然后我们冻结了时钟，之后就不能再次修改它了
  - 某些驱动需要一个时钟的引用，以便知道如何计算速率和时长
- 下一块代码实例化了一些外设（即 RTC 和两个定时器组）以禁用看门狗，看门狗是在上电时启用的
  - 没有这段代码的话，SoC 会在一段时间后重启
  - 还有一种防止重启的方法：[喂][wtd-feeding]看门狗
- `println!("Hello world!");`
  - 打印 “Hello world!”
- `loop {}`
  - 因为这个函数不应该返回，我们在一个死循环中不执行任何操作

[diverging-function]: https://doc.rust-lang.org/beta/rust-by-example/fn/diverging.html
[wtd-feeding]: https://docs.rs/esp32c3-hal/0.10.0/esp32c3_hal/prelude/trait._embedded_hal_watchdog_Watchdog.html#tymethod.feed

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
[2023-04-17T14:17:08Z INFO ] Serial port: '/dev/ttyACM0'
[2023-04-17T14:17:08Z INFO ] Connecting...
[2023-04-17T14:17:09Z INFO ] Using flash stub
[2023-04-17T14:17:09Z WARN ] Setting baud rate higher than 115,200 can cause issues
Chip type:         esp32c3 (revision v0.3)
Crystal frequency: 40MHz
Flash size:        4MB
Features:          WiFi, BLE
MAC address:       60:55:f9:c0:39:7c
App/part. size:    203,920/4,128,768 bytes, 4.94%
[00:00:00] [========================================]      13/13      0x0
[00:00:00] [========================================]       1/1       0x8000
[00:00:01] [========================================]      64/64      0x10000
[2023-04-17T14:17:11Z INFO ] Flashing has completed!
Commands:
    CTRL+R    Reset chip
    CTRL+C    Exit

...
Hello world!
```

这些是第一和第二阶段 bootloader 产生的信息，然后是我们的 “Hello world” 信息！

这就是这段代码做的事情。

可以按 `CTRL+R` 重启，或按 `CTRL+C` 退出。

如果在构建项目时遇到了什么问题，请查看 [Troubleshooting][troubleshooting] 章节。

[espflash]: https://github.com/esp-rs/espflash/tree/main/espflash
[runner-config]: https://doc.rust-lang.org/cargo/reference/config.html#targettriplerunner
[troubleshooting]: ../../misc/troubleshooting.md
