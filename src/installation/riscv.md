# 仅针对 `RISC-V` 目标

要为基于 `RISC-V` 架构的乐鑫芯片构建 Rust 应用程序，请执行以下步骤：

1. 安装适当的工具链以及 `rust-src` [组件][rustup-book-components]：
    - 对于 `no_std`（裸机）应用，既可以使用 `stable`，也可以使用 [`nightly`][rustup-book-channel-nightly]：
    ```shell
    rustup toolchain install stable --component rust-src
    ```
    或
    ```shell
    rustup toolchain install nightly --component rust-src
    ```
    - 对于 `std` 应用，只能使用 `nightly`：
    ```shell
    rustup toolchain install nightly --component rust-src
    ```

    上面的命令下载了 rust 源码。`rust-src` 包含了 std 库、core 库和构建配置文件等。
    下载 `rust-src` 的原因在于：
    - **确定性** - 你可以查看 core 和 std 库的内部结构。如果你正在编写需要较高确定性的软件，你可能需要检查正在使用的库。
    - **构建自定义目标** - `rustc` 使用 `rust-src` 创建新的自定义目标的组件。如果你的目标是 rust 尚不支持的 triple-target，则必须下载 `rust-src`。

   关于自定义目标的更多信息，参见 [Embedonomicon][embedonomicon-official-book] 的[此章节][embedonomicon-creating-a-custom-target]。

2. 设置目标：
    - 对于 `no_std`（裸机）应用，运行：

      ```shell
      rustup target add riscv32imc-unknown-none-elf # 针对 ESP32-C2 和 ESP32-C3
      rustup target add riscv32imac-unknown-none-elf # 针对 ESP32-C6 和 ESP32-H2
      ```

      这些目标目前属于 [Tier 2][rust-lang-book--platform-support-tier2]。注意 Rust 中不同的 `riscv32` 目标包含了不同的 [`RISC-V` 扩展][wiki-riscv-standard-extensions]。

    - 对于 `std` 应用：

      由于这些目标目前属于 [Tier 3][rust-lang-book--platform-support-tier3]，所以不存在通过 `rustup` 分发的预构建对象，并且与 `no_std` 目标不同，**不需要安装任何东西**。请参阅 rustc book 一书的 [*-esp-idf][rust-lang-book--platform-support--esp-idf] 章节以找到适配具体设备的目标。

      - `riscv32imc-esp-espidf` 针对不支持原子指令（A）扩展的 SoC，例如 ESP32-C2 和 ESP32-C3
      - `riscv32imac-esp-espidf` 针对支持原子指令（A）扩展的 SoC，例如 ESP32-C6、ESP32-H2 和 ESP32-P4
3. 为了构建 `std` 项目，还需要安装：
    - [`LLVM`][llvm-website] 编译器基础设施
    - 其他 [`std` 开发依赖项][rust-esp-book-std-requirements]
    - 在项目的 `.cargo/config.toml` 文件中添加 Cargo 的不稳定[特性][cargo-book-unstable-features] `-Z build-std`。我们的[模板项目][rust-esp-book-write-app-generate-project]（将在后面章节讨论）已经包含了这一项。

现在你应该就能在乐鑫的 `RISC-V` 芯片上构建和运行一个项目了。

[rustup-book-channel-nightly]: https://rust-lang.github.io/rustup/concepts/channels.html#working-with-nightly-rust
[rustup-book-components]: https://rust-lang.github.io/rustup/concepts/components.html
[rust-lang-book--platform-support-tier2]: https://doc.rust-lang.org/nightly/rustc/platform-support.html#tier-2
[wiki-riscv-standard-extensions]: https://en.wikichip.org/wiki/risc-v/standard_extensions
[rust-lang-book--platform-support-tier3]: https://doc.rust-lang.org/nightly/rustc/platform-support.html#tier-3
[rust-lang-book--platform-support--esp-idf]: https://doc.rust-lang.org/nightly/rustc/platform-support/esp-idf.html
[llvm-website]: https://llvm.org/
[cargo-book-unstable-features]: https://doc.rust-lang.org/cargo/reference/unstable.html
[rust-esp-book-write-app-generate-project]: ../writing-your-own-application/generate-project/index.md
[rust-esp-book-std-requirements]: ./std-requirements.md
[embedonomicon-creating-a-custom-target]: https://docs.rust-embedded.org/embedonomicon/custom-target.html
[embedonomicon-official-book]: https://docs.rust-embedded.org/embedonomicon/

