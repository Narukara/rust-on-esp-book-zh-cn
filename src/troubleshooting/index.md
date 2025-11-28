# Troubleshooting

本章列出了我们在长期使用过程中遇到的某些问题和常见故障，以及相应的解决方案。本页面收集了与所选 ESP 生态系统无关的常见问题。如果你在此处找不到你遇到的问题，请随时在相应的代码仓库中提出 issue，或在我们的 [Matrix 聊天室][matrix]中提问。

[matrix]: https://matrix.to/#/#esp-rs:matrix.org

## 使用了错误的 Rust 工具链

```text
$ cargo build
error: failed to run `rustc` to learn about target-specific information

Caused by:
  process didn't exit successfully: `rustc - --crate-name ___ --print=file-names --target xtensa-esp32-espidf --crate-type bin --crate-type rlib --crate-type dylib --crate-type cdylib --crate-type staticlib --crate-type proc-macro --print=sysroot --print=cfg` (exit status: 1)
  --- stderr
  error: Error loading target specification: Could not find specification for target "xtensa-esp32-espidf". Run `rustc --print target-list` for a list of built-in targets
```

如果你遇到了上述错误或类似错误，那么你可能没有使用正确的 Rust 工具链。请记住，对于 `Xtensa` 目标，你需要使用 Espressif Rust 分支工具链，有以下几种方法：
- 在命令行中使用[工具链 override][toolchain-override]，即：`cargo +esp`。
- 将 `RUSTUP_TOOLCHAIN` 环境变量设置为 `esp`。
- 设置[目录 override][directory-override]：`rustup override set esp`
- 在你的项目中添加 [`rust-toolchain.toml`][rust-toolchain-toml] 文件：
  ```toml
  [toolchain]
  channel = "esp"
  ```
- 将 `esp` 设置为[默认工具链][default-toolchain]。

有关工具链 override 的更多信息，请参阅 The rustup book 的 [Overrides 章节][overrides-rust-book]。

[toolchain-override]: https://rust-lang.github.io/rustup/overrides.html#toolchain-override-shorthand
[directory-override]: https://rust-lang.github.io/rustup/overrides.html#directory-overrides
[rust-toolchain-toml]: https://rust-lang.github.io/rustup/overrides.html#the-toolchain-file
[default-toolchain]: https://rust-lang.github.io/rustup/overrides.html#default-toolchain
[overrides-rust-book]: https://rust-lang.github.io/rustup/overrides.html#overrides

## Windows

### 长路径名

在使用 Windows 时，如果路径名过长，你可能会在构建新项目时遇到问题。
此外，构建 `std` 应用程序时，如果你的项目路径长度超过约 10 个字符，构建将失败并出现错误。

要解决此问题，你需要缩短你的项目名称，并将其移动到驱动器根目录，例如 `C:\myproj`。
还要注意，虽然使用 Windows `subst` 命令（例如 `subst r: <pathToYourProject>`）可能看起来像是在构建期间使用短路径的简单解决方案，同时仍保持项目位置不变，
但它*根本不起作用*，因为短的、替代的路径会被 Windows API 扩展为它们的实际（长）位置。

另一种替代方案是安装 Windows Subsystem for Linux (WSL)，将你的项目移动到本机 Linux 文件分区内，
在 WSL 内构建，并且只从 WSL 外部烧录编译的 MCU ELF 文件。

### 缺少 ABI

```powershell
  Compiling cc v1.0.69
error: linker `link.exe` not found
  |
  = note: The system cannot find the file specified. (os error 2)

note: the msvc targets depend on the msvc linker but `link.exe` was not found

note: please ensure that VS 2013, VS 2015, VS 2017 or VS 2019 was installed with the Visual C++ option

error: could not compile `compiler_builtins` due to previous error
warning: build failed, waiting for other jobs to finish...
error: build failed
```

此错误的原因是我们缺少 MSVC C++，因此我们没有满足[编译时要求][Compile-time Requirements]。请安装 [Visual Studio 2013（或更高版本）或 Visual C++ Build Tools 2019][Visual Studio 2013 (or later) or the Visual C++ Build Tools 2019]。对于 Visual Studio，请确保选中"C++ 工具"和"Windows 10 SDK"选项。
如果使用 GNU ABI，请安装 [MinGW/MSYS2 工具链][MinGW/MSYS2 toolchain]。

[Compile-time Requirements]: https://github.com/rust-lang/cc-rs#compile-time-requirements
[Visual Studio 2013 (or later) or the Visual C++ Build Tools 2019]: https://rust-lang.github.io/rustup/installation/windows.html
[MinGW/MSYS2 toolchain]: https://www.msys2.org/
