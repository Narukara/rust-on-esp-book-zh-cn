# 从模板生成项目

我们目前维护了两个模板仓库：
- [`esp-template`][esp-template] - `no_std` 模板。
- [`esp-idf-template`][esp-idf-template] - `std` 模板。

这两个模板都是基于 [`cargo-generate`][cargo-generate]，这是一个用于按照现成模板创建新项目的工具。这里的 [`esp-idf-template`][esp-idf-template] 和 [`esp-template`][esp-template] 可用于生成应用程序，附带所有必需的配置和依赖项。

1. 安装 `cargo generate`：
    ```shell
    cargo install cargo-generate
    ```
2. 基于以上模板之一生成项目：
    - `esp-template`：
        ```shell
        cargo generate esp-rs/esp-template
        ```
        关于模板项目的更多信息，请参阅 [`esp-template` 简介][understanding-esp-template]。
    - `esp-idf-template`：
        ```shell
        cargo generate esp-rs/esp-idf-template cargo
        ```
        关于模板项目的更多信息，请参阅 [`esp-idf-template` 简介][understanding-esp-idf-template]。

    调用 `cargo generate` 子命令时，它会询问几个关于应用程序目标的问题。完成这些问题后，就会生成一个配置好的项目，可以直接构建。

3. 构建/运行生成的项目：
   - 用 `cargo build` 编译项目（自动使用合适的工具链和目标）。
   - 用 `cargo run` 编译项目、向目标设备烧写程序、并开启一个串口监视器。

[cargo-generate]: https://github.com/cargo-generate/cargo-generate
[esp-idf-template]: https://github.com/esp-rs/esp-idf-template
[esp-template]: https://github.com/esp-rs/esp-template
[understanding-esp-template]: ./esp-template.md
[understanding-esp-idf-template]: ./esp-idf-template.md

## 在模板中使用开发容器（Dev Container）

两个模板仓库都带有开发容器支持，详见模板 README 的 [Dev Containers][dev-container] 章节。

开发容器使用 [`idf-rust`][idf-rust] 镜像，[配置开发环境][setting-env]中的[使用容器][using-container]一节对此进行了解释。这个镜像提供了一个无需安装即可为乐鑫芯片开发 Rust 应用程序的环境。开发容器还可以与 [Wokwi 模拟器][wokwi]协作，以模拟项目，并允许使用 [`web-flash`][web-flash] 从容器中进行烧写。

[dev-container]: https://github.com/esp-rs/esp-template/tree/main/docs#dev-containers
[idf-rust]: https://hub.docker.com/r/espressif/idf-rust/tags
[using-container]: ../../installation/using-containers.md
[wokwi]: https://wokwi.com/
[web-flash]: https://github.com/bjoernQ/esp-web-flash-server
[setting-env]: ../../installation/index.md
