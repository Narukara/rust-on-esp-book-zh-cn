# 针对 `RISC-V` 和 `Xtensa` 目标

为 `Xtensa` 和 `RISC-V` 架构开发 Rust 应用程序，需要安装和维护一些组件。[`espup`][espup-github] 是一款能够简化这一过程的工具。

### 1. 安装 `espup`

要安装 `espup`，执行：
```shell
cargo install espup --locked
```

也可以直接下载预编译好的[发行二进制文件][release-binaries]或使用[`cargo-binstall`][cargo-binstall]。

[espup-github]: https://github.com/esp-rs/espup
[release-binaries]: https://github.com/esp-rs/espup/releases
[cargo-binstall]: https://github.com/cargo-bins/cargo-binstall

### 2. 安装必要的工具链

要为所有支持 Rust 开发的乐鑫目标，安装所有必要的工具，执行：
```shell
espup install
```

> ⚠️ **注意**：`std` 应用需要安装一些额外的软件，参见 [`std` 开发依赖项][rust-esp-book-std-requirements]

[rust-esp-book-std-requirements]: ./std-requirements.md

### 3. 配置环境变量
`espup` 会创建一个 export 文件，其中包含构建项目所需的一些环境变量。

在 Windows 系统上（`%USERPROFILE%\export-esp.ps1`）
  - 对于 Windows 用户，**不需要** 执行这个文件。这个文件只是用来展示哪些环境变量被修改了的。

在基于 Unix 的系统上（`$HOME/export-esp.sh`），有几种不同的方法来 source 这个文件：
- 在每个终端里 source 这个文件：
   1. source 这个 export 文件： `. $HOME/export-esp.sh`

   这种方法需要在每个新的 shell 里运行这个命令。
- 创建用于执行 `export-esp.sh` 的别名（alias）：
   1. 将以下命令复制粘贴到 shell 的配置文件中（`.profile`、`.bashrc`、`.zprofile` 等）：`alias get_esprs='. $HOME/export-esp.sh'`
   2. 通过重启终端，或执行 `source [配置文件的路径]`，例如 `source ~/.bashrc`，来刷新配置。

   这种方法需要在每个新的 shell 里运行别名（alias）。
- 直接将环境变量添加到 shell 配置文件中：
   1. 把 `$HOME/export-esp.sh` 的内容添加到 shell 的配置文件中：`cat $HOME/export-esp.sh >> [配置文件的路径]`，例如 `cat $HOME/export-esp.sh >> ~/.bashrc`。
   2. 通过重启终端，或执行 `source [配置文件的路径]`，例如 `source ~/.bashrc`，来刷新配置。

   这种方法 **不需要** 任何 source。`export-esp.sh` 脚本会在每个 shell 里自动 source。

### `espup` 安装了什么

为了启用对乐鑫目标的支持，`espup` 安装了以下工具：

- 乐鑫 Rust 分支，支持乐鑫目标
- `nightly` 工具链，支持 `RISC-V` 目标
- `LLVM` [分支][llvm-github-fork]，支持 `Xtensa` 目标
- [GCC 工具链][gcc-toolchain-github-fork]，用于链接最终的二进制文件

分支编译器能与标准 Rust 编译器共存，允许在一个系统上同时安装两者。可以用任意一种 [override 方法][rustup-overrides]来调用分支编译器。

> ⚠️ **注意**：我们正在努力将分支的代码合并入上游仓库
> 1. `LLVM` 分支中的修改。合并正在进行中，详见这个[跟踪 issue][llvm-github-fork-upstream issue]。
> 2. Rust 编译器分支。如果 `LLVM` 中的修改被接受，我们将继续推进 Rust 编译器的修改。

如果你遇到了错误，请查看 [Troubleshooting][troubleshooting] 章节。

[llvm-github-fork]: https://github.com/espressif/llvm-project
[gcc-toolchain-github-fork]: https://github.com/espressif/crosstool-NG/
[rustup-overrides]: https://rust-lang.github.io/rustup/overrides.html
[llvm-github-fork-upstream issue]: https://github.com/espressif/llvm-project/issues/4
[troubleshooting]: ../troubleshooting/index.md

### `Xtensa` 目标的其他安装方法

- 使用 [`rust-build`][rust-build] 安装脚本。这是过去推荐的方式，但现在安装脚本已”功能冻结“，所有新功能将仅包含在 `espup` 中。请参阅仓库 README 文件以获取说明。
- 从源代码构建具有 `Xtensa` 支持的 Rust 编译器。此过程的运算成本很高，可能需要一个或多个小时才能完成，具体取决于系统配置。除非有重大理由要求采用这种方法，否则不建议这样做。这是从源代码构建它的仓库：[`esp-rs/rust` 仓库][esp-rs-rust]。

[rust-build]: https://github.com/esp-rs/rust-build#download-installer-in-bash
[esp-rs-rust]: https://github.com/esp-rs/rust
