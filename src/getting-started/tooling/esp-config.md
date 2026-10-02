# `esp-config`（可选）

[`esp-config`][esp-config] 是一个通过终端用户界面（TUI）编辑配置选项的工具。使用它完全是可选的；有关配置文件的组织方式，以及如何不借助 TUI 手动编辑配置文件，请参阅[配置章节][config-chapter]。

[config-chapter]: ../../application-development/configuration.md

## 安装

要安装 `esp-config`，执行：

```shell
cargo install esp-config --features=tui --locked
```

[esp-config]: https://github.com/esp-rs/esp-hal/tree/main/esp-config
