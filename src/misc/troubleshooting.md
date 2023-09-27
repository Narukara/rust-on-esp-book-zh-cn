# Troubleshooting

在这里，我们将列出构建项目时常见的错误，及其原因和解决方案。

## 未设置 `LIBCLANG_PATH` 环境变量

```text
thread 'main' panicked at 'Unable to find libclang: "couldn't find any valid shared libraries matching: ['libclang.so', 'libclang-*.so', 'libclang.so.*', 'libclang-*.so.*'], set the `LIBCLANG_PATH` environment variable to a path where one of these files can be found (invalid: [])"', /home/esp/.cargo/registry/src/github.com-1ecc6299db9ec823/bindgen-0.60.1/src/lib.rs:2172:31
```

我们需要 `libclang` 来让 [`bindgen`] 生成 ESP-IDF C 头文件到 Rust 的绑定。
确保你已经 source 了 `espup` 生成的 export 文件，请参阅[配置环境变量][set-up-the-environment-variables]。

[`bindgen`]: https://github.com/rust-lang/rust-bindgen
[set-up-the-environment-variables]: ./../installation/riscv-and-xtensa.md#3-配置环境变量

## 缺少 `ldproxy`

```shell
error: linker `ldproxy` not found
  |
  = note: No such file or directory (os error 2)
```

要构建 `std` 应用，必须安装 [`ldproxy`][ldproxy]。请参阅 [`std` 开发依赖项][rust-esp-book-std-requirements]

```shell
cargo install ldproxy
```

[ldproxy]: https://github.com/esp-rs/embuild/tree/master/ldproxy
[rust-esp-book-std-requirements]: ./../installation/std-requirements.md

## 使用了错误的 Rust 工具链

```text
$ cargo build
error: failed to run `rustc` to learn about target-specific information

Caused by:
  process didn't exit successfully: `rustc - --crate-name ___ --print=file-names --target xtensa-esp32-espidf --crate-type bin --crate-type rlib --crate-type dylib --crate-type cdylib --crate-type staticlib --crate-type proc-macro --print=sysroot --print=cfg` (exit status: 1)
  --- stderr
  error: Error loading target specification: Could not find specification for target "xtensa-esp32-espidf". Run `rustc --print target-list` for a list of built-in targets
```

如果遇到了上面的错误，或类似的错误，可能是因为没有使用合适的 Rust 工具链。注意：对于 `Xtensa` 目标，需要使用乐鑫分支的 Rust 工具链，有这几种方法：
- 在命令行中使用[工具链 override][toolchain-override] 简写： `cargo +esp`。
- 将 `RUSTUP_TOOLCHAIN` 环境变量设置为 `esp`。
- 设置[目录 override][directory-override]：`rustup override set esp`
- 在项目中添加 [`rust-toolchain.toml`][rust-toolchain-toml] 文件：
  ```toml
  [toolchain]
  channel = "esp"
  ```
- 将 `esp` 设置为[默认工具链][default-toolchain]。

关于工具链 override 的更多信息，请参阅 The rustup book 的 [Overrides chapter][overrides-rust-book] 章节。

[toolchain-override]: https://rust-lang.github.io/rustup/overrides.html#toolchain-override-shorthand
[directory-override]: https://rust-lang.github.io/rustup/overrides.html#directory-overrides
[rust-toolchain-toml]: https://rust-lang.github.io/rustup/overrides.html#the-toolchain-file
[default-toolchain]: https://rust-lang.github.io/rustup/overrides.html#default-toolchain
[overrides-rust-book]: https://rust-lang.github.io/rustup/overrides.html#overrides

## Windows

### 长路径名

使用 Windows 时，如果使用了长路径名，你可能会在构建新项目时遇到问题。请按照以下步骤替换项目的路径：
```powershell
subst r: <你的项目的路径>
cd r:\
```

### 缺失 ABI

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

出现此错误的原因是我们缺少 MSVC C++，因此不满足[编译时要求][Compile-time Requirements]。请安装 [Visual Studio 2013（或更高版本）或 Visual C++ Build Tools 2019][Visual Studio 2013 (or later) or the Visual C++ Build Tools 2019]。对于 Visual Studio，确保选择了 “C++ tools” 和 “Windows 10 SDK” 选项。
如果使用 GNU ABI，请安装 [MinGW/MSYS2 工具链][MinGW/MSYS2 toolchain]。

[Compile-time Requirements]: https://github.com/rust-lang/cc-rs#compile-time-requirements
[Visual Studio 2013 (or later) or the Visual C++ Build Tools 2019]: https://rust-lang.github.io/rustup/installation/windows.html
[MinGW/MSYS2 toolchain]: https://www.msys2.org/

## FAQ

### 更新了 `sdkconfig.defaults` 文件，但没有任何效果

必须清理并重新构建项目，才能使 `sdkconfig.defaults` 中的修改生效：

```shell
cargo clean
cargo build
```

### 本页提到的 crate 的文档已过时或丢失

由于 [docs.rs] 施加的[资源限制][resource limits]，构建文档时不允许访问互联网。因此，我们无法构建 `esp-idf-sys` 或任何依赖于它的 crate 的文档。

作为替代，我们构建了文档，并将其托管在 GitHub Pages 上：

- [`esp-idf-hal` 文档][`esp-idf-hal` documentation]
- [`esp-idf-svc` 文档][`esp-idf-svc` documentation]
- [`esp-idf-sys` 文档][`esp-idf-sys` documentation]

[resource limits]: https://docs.rs/about/builds#hitting-resource-limits
[docs.rs]: https://docs.rs
[`esp-idf-hal` documentation]: https://esp-rs.github.io/esp-idf-hal/esp_idf_hal/
[`esp-idf-svc` documentation]: https://esp-rs.github.io/esp-idf-svc/esp_idf_svc/
[`esp-idf-sys` documentation]: https://esp-rs.github.io/esp-idf-sys/esp_idf_sys/

### A Stack Overflow in Task `main` has Been Detected（`main` 任务栈溢出）

如果第二阶段 bootloader 报告了这个错误，你可能需要增加 main 任务的栈大小。可以通过将以下内容添加到 `sdkconfig.defaults` 文件来实现：

```text
CONFIG_ESP_MAIN_TASK_STACK_SIZE=7000
```

在本例中，我们为 main 任务的栈分配了 7 kB。

### 如何关闭看门狗定时器？

向 `sdkconfig.defaults` 文件添加：

```text
CONFIG_INT_WDT=n
CONFIG_ESP_TASK_WDT=n
```

请记住，修改了这些配置文件后，必须在重新构建之前清理项目。
