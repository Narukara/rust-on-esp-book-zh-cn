# `espflash`

[`espflash`][espflash] 是为乐鑫 SoC 和模块设计的串口烧录工具，原生支持所有与 `esp-hal` 兼容的芯片。

## 安装

要安装 [`espflash`][espflash]，执行以下命令：

```shell
cargo install espflash --locked
```

也可以使用 [`cargo-binstall`][cargo-binstall] 从[发行版本][releases]下载预编译的程序并使用：

```bash
cargo binstall espflash
```

> [!NOTE]
> [`espflash`][espflash] 默认使用的波特率是 115200，你可以提高波特率来加快烧录速度。
> 最简单的方法是设置 `ESPFLASH_BAUD` 环境变量。

[cargo-binstall]: https://github.com/cargo-bins/cargo-binstall
[releases]: https://github.com/esp-rs/espflash/releases
[espflash]: https://github.com/esp-rs/espflash/tree/main/espflash/
