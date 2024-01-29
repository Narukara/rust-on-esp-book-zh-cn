# `std` 开发依赖项

不论是哪种目标架构，对于 [`std`][rust-esp-book-overview-std] 应用开发，还需要安装以下工具：

- ESP-IDF 依赖项:
  - Windows：[`python`][python-website-download] 和 [`git`][git-website-download]
  - Linux：查看 [Linux ESP-IDF prerequisites][esp-idf-linux]。
  - macOS：查看 [macOS ESP-IDF prerequisites][esp-idf-macos]。
- [`ldproxy`][embuild-github-ldproxy] 二进制项 crate：一个将链接参数转发给实际链接器的工具，实际链接器本身也是通过参数指定的。执行以下命令来安装：
    ```shell
    cargo install ldproxy
    ```

> ⚠️ **注意**：`std` 运行时将 [ESP-IDF][esp-idf-github]（Espressif IoT Development Framework）作为宿主环境，不过用户不需要安装它。[esp-idf-sys][esp-idf-sys-github] 会自动下载安装 ESP-IDF，这是一个所有 `std` 项目都需要使用的 crate。

[rust-esp-book-overview-std]: ../overview/using-the-standard-library.md
[python-website-download]: https://www.python.org/downloads/windows/
[git-website-download]: https://git-scm.com/downloads
[embuild-github-ldproxy]: https://github.com/esp-rs/embuild/tree/master/ldproxy
[esp-idf-sys-github]: https://github.com/esp-rs/esp-idf-sys
[esp-idf-github]: https://github.com/espressif/esp-idf
[esp-idf-linux]: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/linux-macos-setup.html#for-linux-users
[esp-idf-macos]: https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/linux-macos-setup.html#for-macos-users

