# 配置开发环境

目前，乐鑫的 SoC 基于两种不同的架构：`RISC-V` 和 `Xtensa`。两种架构都支持 `std` 和 `no_std` 开发方式。

为了配置开发环境，需要执行以下步骤：

1. [安装 Rust][install-rust]
2. 根据目标架构，安装相应的依赖项
    - [仅针对 `RISC-V` 目标][risc-v-targets]
    - [针对 `RISC-V` 和 `Xtensa` 目标][rics-v-xtensa-targets]

不论是哪种目标架构，对于 `std` 开发，还需要安装 [`std` 开发依赖项][rust-esp-book-std-requirements]。

另外，还可以选择在[容器][use-containers]中托管开发环境。

[install-rust]: ./rust.md
[risc-v-targets]: ./riscv.md
[rics-v-xtensa-targets]: ./riscv-and-xtensa.md
[rust-esp-book-std-requirements]: ./std-requirements.md
[use-containers]: ./using-containers.md
