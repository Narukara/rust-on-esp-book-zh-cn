# 常见问题

本章介绍在 ESP 芯片上使用 Rust 时，开发者可能遇到的常见问题和挑战。无论你是在配置开发环境、优化代码，还是希望仿真项目，都可以在这里找到实用的解决方案和最佳实践。

## 编辑器与 IDE

使用 [`esp-generate`][esp-generate] 时，可以在生成项目的过程中，自动为 VS Code、Helix、Neovim 和 Zed 编辑器配置推荐的设置和扩展。

[esp-generate]: ./getting-started/tooling/esp-generate.md

## 程序大小与内存优化

### 优化二进制文件大小

- Cargo 提供了一些默认 profile；我们推荐使用 [`release` profile][release-profile]，因为它会进行优化并移除调试符号。
- Cargo 支持不同的 [profile 设置][profile-settings-cargo]，这些设置会影响最终构建产物的大小。
  - 请参阅 The Embedded Rust Book 中的[优化：速度与大小的权衡][embedded-book-tradeoffs]。
- 使用外部依赖项时要谨慎，因为它们可能增大最终构建产物的大小。
- 如果某些日志消息没有用处或不会被查看，请将它们过滤掉。
- 更多建议可以在 [min-sized-rust][min-sized-rust] 仓库中找到。

此外，[Embassy 文档][embassy-documentation]中的[常见问题][frequently-asked-questions]部分也提供了一些关于二进制文件大小的建议。

[embedded-book-tradeoffs]: https://docs.rust-embedded.org/book/unsorted/speed-vs-size.html
[release-profile]: https://doc.rust-lang.org/cargo/reference/profiles.html#release
[profile-settings-cargo]: https://doc.rust-lang.org/cargo/reference/profiles.html#profile-settings
[min-sized-rust]: https://github.com/johnthagen/min-sized-rust
[embassy-documentation]: https://embassy.dev/book
[frequently-asked-questions]: https://embassy.dev/book/#_frequently_asked_questions

### 优化内存使用

这里同样推荐参阅 [Embassy 文档][embassy-documentation]，尤其是[如何测量资源使用情况（CPU、RAM 等）][measure-resources]部分。

[measure-resources]: https://embassy.dev/book/#_how_can_i_measure_resource_usage_cpu_ram_etc

## 使用 Git 仓库中的 crate

[Cargo Book][cargo-book] 和 [Embassy 文档][embassy-documentation]都介绍了如何指定来自 Git 仓库的依赖项：

- [指定来自 `git` 仓库的依赖项][dependencies-from-git]
- [`[patch]` 部分][patch-section]
- [如何切换到 `main` 分支][switch-to-main-branch]

[cargo-book]: https://doc.rust-lang.org/cargo/
[dependencies-from-git]: https://doc.rust-lang.org/cargo/reference/specifying-dependencies.html#specifying-dependencies-from-git-repositories
[patch-section]: https://doc.rust-lang.org/cargo/reference/overriding-dependencies.html#the-patch-section
[switch-to-main-branch]: https://embassy.dev/book/#_how_do_i_switch_to_the_main_branch

## 可以对驱动使用 `mem::forget` 吗？

应避免使用 `mem::forget`，因为遗忘驱动可能产生意料之外的后果。外设驱动实现了 `Drop`，会将外设恢复到默认的未配置状态，并在必要时取消正在进行的直接内存访问（DMA）传输。遗忘驱动可能导致外设配置错误，或使 DMA 传输无限运行、永远无法完成。

## 进入与退出下载模式

下载模式是一种用于固件烧录和调试的启动模式。在此模式下，芯片不会从 flash 启动应用程序，而是等待通过 UART 或 USB 等接口接收新固件数据，并将其写入 flash。

### 选择启动模式

复位时，ROM bootloader 会读取特定 strapping 引脚的状态，并根据此时的电平选择启动模式：
- 如果启动 strapping 引脚为高电平 → 芯片进入 SPI 启动模式（运行 flash 中的应用程序）。
- 如果启动 strapping 引脚为低电平 → 芯片进入下载模式（等待接收固件）。
有关启动模式选择的更多信息，请参阅 [ESP-IDF 文档][esp-idf-bootmode]。

设备处于下载模式时，串口会输出“waiting for download”。请参阅 [ESP-IDF 下载模式文档][esp-idf-downloadmode]。

烧录完成后，芯片需要回到 SPI 启动模式才能运行新固件。可以通过复位目标设备，让芯片重新采样 strapping 引脚，从而正常启动；也可以在 USB-Serial/JTAG 模式下，使用 `espflash` 和 `esptool` 的 `--after watchdog-reset` 选项。请参阅 [ESP-IDF 故障排查][esp-idf-troubleshooting]。

[esp-idf-bootmode]: https://docs.espressif.com/projects/esptool/en/latest/esp32c6/advanced-topics/boot-mode-selection.html
[esp-idf-downloadmode]: https://docs.espressif.com/projects/esp-techpedia/en/latest/esp-friends/get-started/try-firmware/try-firmware-troubleshooting.html#download-mode
[esp-idf-troubleshooting]: https://docs.espressif.com/projects/esptool/en/latest/esp32c6/troubleshooting.html#leaving-download-mode-in-usb-serial-jtag-mode
