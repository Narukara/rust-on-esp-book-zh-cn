## 工具链安装

### Rust 安装

确保你已经安装了 [Rust][rust-lang-org]。如果没有，请参阅 [rustup][rustup.rs-website] 网站上的说明。

> [!WARNING]
> 使用基于 Unix 的系统时，通过系统的包管理器（例如 `brew`、`apt`、`dnf` 等）安装 Rust 可能导致各种[问题和兼容性冲突][rustup-note]，因此最好使用 [rustup][rustup.rs-website]。

使用 Windows 时，请确保你已安装下面列出的 ABI 之一。有关更多详细信息，请参阅 The rustup book 中的 [Windows][rustup-book-windows] 章节。

- **MSVC**：推荐的 ABI，包含在 `rustup` 的默认依赖项列表中。使用此 ABI 可以与 Visual Studio 生成的软件实现互操作。

    如果不确定该选哪个，就使用它。

- **GNU**：GCC 工具链使用的 ABI。你可以自行安装它，以便与使用 MinGW/MSYS2 工具链构建的软件实现互操作。

另请参阅[其他安装方案][rust-alt-installation]。

[rustup-note]: https://rust-lang.github.io/rustup/installation/other.html#using-a-package-manager
[rustup.rs-website]: https://rustup.rs/
[rust-alt-installation]: https://rust-lang.github.io/rustup/installation/other.html
[rustup-book-windows]: https://rust-lang.github.io/rustup/installation/windows.html
[rust-lang-org]: https://www.rust-lang.org/

### RISC-V 设备

要为基于 RISC-V 架构的乐鑫芯片构建 Rust 应用程序（如果不确定设备采用哪种架构，请参阅[硬件概览](../introduction/hardware-overview.md)），请执行以下步骤：

1. 安装适当的工具链以及 `rust-src` [组件][rustup-book-components]：

   - 既可以使用 `stable`，也可以使用 [`nightly`][rustup-book-channel-nightly]：
     ```shell
     rustup toolchain install stable --component rust-src
      ```
      或
      ```shell
     rustup toolchain install nightly --component rust-src
     ```

   > [!NOTE]
   > `rustfmt`、`clippy` 和 `rust-analyzer` 等其他组件并非必需，但强烈推荐安装。

2. 安装目标：

   ```shell
   rustup target add riscv32imc-unknown-none-elf # For ESP32-C2 and ESP32-C3
   rustup target add riscv32imac-unknown-none-elf # For ESP32-C6 and ESP32-H2
      ```

      这些目标目前属于 [Tier 2][rust-lang-book--platform-support-tier2]。注意 Rust 中不同的 `riscv32` 目标包含了不同的 [RISC-V 扩展][wiki-riscv-standard-extensions]。

如果你_不打算_使用 ESP32、ESP32-S2 或 ESP32-S3，工具链安装就已经完成，可以跳到[工具安装](tooling/index.md)章节。

[rustup-book-channel-nightly]: https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust
[rustup-book-components]: https://rust-lang.github.io/rustup/concepts/components.html
[rust-lang-book--platform-support-tier2]: https://doc.rust-lang.org/nightly/rustc/platform-support.html#tier-2
[wiki-riscv-standard-extensions]: https://en.wikichip.org/wiki/risc-v/standard_extensions

### Xtensa 设备

如[硬件概览](../introduction/hardware-overview.md)所述，ESP32、ESP32-S2 和 ESP32-S3 采用 Xtensa 架构。如果要为这些芯片开发，目前需要使用 Rust 编译器的分支版本。

[`espup`][espup-github] 是一款工具，用于简化为这些目标开发 Rust 应用程序所需的工具链安装和维护过程。

1. 安装 `espup`：
    ```shell
    cargo install espup --locked
    ```
   也可以直接下载预编译好的[发行二进制文件][release-binaries]，或使用 [`cargo-binstall`][cargo-binstall]。
2. 运行以下命令，为所有受支持的乐鑫目标安装全部必需的工具链：
    ```shell
    espup install
    ```
3. 在 Unix 系统上配置环境变量：请参阅 [`espup` README][source-file-espup] 中介绍的不同方法。Windows 用户无需进行其他操作。

[espup-github]: https://github.com/esp-rs/espup
[release-binaries]: https://github.com/esp-rs/espup/releases
[cargo-binstall]: https://github.com/cargo-bins/cargo-binstall
[source-file-espup]: https://github.com/esp-rs/espup?tab=readme-ov-file#environment-variables-setup

#### `espup` 安装了什么

为了启用对乐鑫目标的支持，`espup` 安装了以下工具：

- [乐鑫 Rust 分支][esp-rs/rust]，支持乐鑫目标。
- `stable` 工具链，支持 RISC-V 目标。
- LLVM [分支][llvm-github-fork]，支持 Xtensa 目标。
- [GCC 工具链][gcc-toolchain-github-fork]，用于链接最终的二进制文件。

分支编译器能与标准 Rust 编译器共存，允许在一个系统上同时安装两者。可以使用任意一种 [override 方法][rustup-overrides]来调用分支编译器。

[esp-rs/rust]: https://github.com/esp-rs/rust
[llvm-github-fork]: https://github.com/espressif/llvm-project
[gcc-toolchain-github-fork]: https://github.com/espressif/crosstool-NG/
[rustup-overrides]: https://rust-lang.github.io/rustup/overrides.html
