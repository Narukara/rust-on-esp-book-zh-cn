# `espflash`

`espflash`是一个基于[esptool.py][esptool]的 Espressif SoCs 和模块的串行闪存工具。

[`espflash`][espflash]仓库包含两个 crate，`cargo-espflash`和`espflash`。有关这些 crate 的更多信息，请参见下面的各自部分。

[esptool]: https://github.com/espressif/esptool
[espflash]: https://github.com/esp-rs/espflash

> ⚠️ **注意**: 下面显示的`espflash`和`cargo-espflash`命令，假定使用版本`2.0`或更高版本。

## `cargo-espflash`

为`cargo`提供一个子命令，处理交叉编译和闪存。

要安装，请运行：

```shell
cargo install cargo-espflash
```

此命令必须在 Cargo 项目中运行，即包含`Cargo.toml`文件的目录。例如，要构建名为“blinky”的示例，将生成的二进制文件闪存到设备中，然后随后启动串行监视器：

```shell
cargo espflash flash --example=blinky --monitor
```

有关更多信息，请参见[`cargo-espflash`][cargo-espflash] README。

[cargo-espflash]: https://github.com/esp-rs/espflash/blob/master/cargo-espflash/README.md

## `espflash`

提供一个独立的命令行应用程序，将 ELF 文件闪存到设备中。

要安装，请运行：

```shell
cargo install espflash
```

假设您已经通过其他方式构建了 ELF 二进制文件，`espflash`可以用于将其下载到设备并监视串行端口。例如，如果您已经使用`idf.py`从[ESP-IDF][esp-idf]构建了名为“getting-started/blinky”的示例，您可以运行类似以下的命令：

```shell
espflash flash build/blinky --monitor
```

有关更多信息，请参见[`espflash` README][espflash-readme]。

通过将以下内容添加到项目的`.cargo/config.toml`文件中，可以将`espflash`用作 Cargo 运行程序：

```toml
[target.'cfg(any(target_arch = "riscv32", target_arch = "xtensa"))']
runner = "espflash flash --monitor"
```

使用此配置，您可以使用`cargo run`下载和监视您的应用程序。

[esp-idf]: https://github.com/espressif/esp-idf
[espflash-readme]: https://github.com/esp-rs/espflash/blob/master/espflash/README.md
